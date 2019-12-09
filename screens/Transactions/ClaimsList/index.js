import React, { Component } from "react";
import { Container, Content, View, Text, Button } from "native-base";
import { DataTable } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { StyleSheet, AsyncStorage } from "react-native";
import Ripple from "react-native-material-ripple";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";

class ClaimsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrint: false,
      data: null,
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
      this.loadData(res);
    });
  }
  loadData = res => {
    axios
      .get(base_url + "/account/listAllAccountDebit?credit=c", {
        headers: {
          "Content-Type": "application/json",
          Authorization: res
        }
      })
      .then(res => {
        this.setState({ data: res.data });
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        if (err.response.status === 401) {
          Toast.show("Session expired. Please login again", {
            containerStyle: {
              backgroundColor: "#F4F4F2",
              borderRadius: 30,
              paddingVertical: 15,
              paddingHorizontal: 20
            },
            textStyle: { color: "black" }
          });
          this.props.navigation.navigate("Login");
        } else {
          Toast.show("An error occurred loading data. Click ok to retry", {
            containerStyle: {
              backgroundColor: "#F4F4F2",
              borderRadius: 30,
              paddingVertical: 15,
              paddingHorizontal: 20
            },
            textStyle: { color: "black" }
          });
        }
      });
  };

  render() {
    const { showPrint, data } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
              <View>
                <Text style={styles.title}>لائحة المطالبات</Text>
              </View>
            </View>

            {showPrint ? (
              <View style={styles.doubleButtonWrapper}>
                <Ripple
                  style={[styles.rippleButton, styles.doubleButton]}
                  rippleColor={"white"}
                >
                  <Text style={styles.text}>سحب</Text>
                </Ripple>
                <Ripple
                  style={[styles.rippleButton, styles.doubleButton]}
                  rippleColor={"white"}
                  onPress={() => this.setState({ showPrint: false })}
                >
                  <Text style={[styles.text, { fontSize: 12 }]}> رجوع</Text>
                </Ripple>
              </View>
            ) : (
              <Button
                onPress={() => this.setState({ showPrint: true })}
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  width: "80%"
                }}
              >
                <Text style={styles.text}> افتح الطابعة</Text>
              </Button>
            )}

            <View>{this.renderTable(data)}</View>
          </View>
          {this.state.loading && <Loading />}
        </Content>
      </Container>
    );
  }

  renderTable = tableData => {
    return (
      <DataTable>
        <DataTable.Header
          style={{
            paddingHorizontal: 0
          }}
        >
          <DataTable.Title style={styles.tableItem}>عليه</DataTable.Title>
          <DataTable.Title style={styles.tableItem}>الإسم</DataTable.Title>
          <DataTable.Title style={styles.tableItem}>رقم الحساب</DataTable.Title>
        </DataTable.Header>

        {tableData &&
          (tableData.length ? (
            tableData.map((tableItem, index) => {
              return (
                <DataTable.Row style={{ paddingHorizontal: 0 }}>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.balance}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.libelle}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.numAccount}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })
          ) : (
            <DataTable.Row>
              <DataTable.Cell>
                <Text
                  style={{
                    color: "lightgrey"
                  }}
                >
                  No Data to show
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.log(page);
          }}
          label={`1-6 of ${tableData && tableData.length}`}
        />
      </DataTable>
    );
  };
}

const styles = StyleSheet.create({
  contentWrapper: {
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 10
  },
  title: {
    fontSize: 20
  },
  text: { flex: 1, textAlign: "center", color: "white" },
  tableItem: {
    justifyContent: "center"
  }
});

export default ClaimsList;
