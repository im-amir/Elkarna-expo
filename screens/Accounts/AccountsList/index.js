import React, { Component } from "react";
import { Container, Content, View, Text } from "native-base";
import { DataTable } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { StyleSheet, AsyncStorage } from "react-native";
import { TextField } from "react-native-material-textfield";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";

class AccountsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      page: 1
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
      .get(base_url + "/account/listAllAccounts", {
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
    const { data } = this.state;
    console.log(data);
    const { navigation } = this.props;
    const rtlText = {
      textAlign: "right",
      writingDirection: "rtl"
    };
    return (
      <Container>
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View>
                <Text style={styles.title}>لائحة الحسابات</Text>
              </View>
              <View style={[styles.textField, { width: "50%" }]}>
                <TextField
                  label="إسم الحساب  للبحث...*"
                  style={[rtlText]}
                  labelOffset={{ x0: 40, x1: 100 }}
                />
              </View>
            </View>
            <DataTable>
              <DataTable.Header
                style={{
                  paddingHorizontal: 0
                }}
              >
                <DataTable.Title style={styles.tableItem}>
                  التفاصيل
                </DataTable.Title>
                <DataTable.Title style={styles.tableItem}>
                  تاريخ الإنشاء
                </DataTable.Title>
                <DataTable.Title style={styles.tableItem}>
                  الهاتف
                </DataTable.Title>
                <DataTable.Title style={styles.tableItem}>
                  الإسم
                </DataTable.Title>
                <DataTable.Title style={styles.tableItem}>
                  رقم الحساب
                </DataTable.Title>
              </DataTable.Header>

              {data &&
                data.map((tableItem, index) => {
                  return (
                    <DataTable.Row style={{ paddingHorizontal: 0 }}>
                      <DataTable.Cell style={styles.tableItem}>
                        <Entypo name="edit" />
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        <Text style={{ fontSize: 10 }}>
                          {tableItem.dateCreation}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        <Text style={{ fontSize: 10 }}>{tableItem.tel}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        <Text style={{ fontSize: 10 }}>
                          {tableItem.libelle}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        <Text style={{ fontSize: 10 }}>
                          {tableItem.numAccount}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}

              <DataTable.Pagination
                page={this.state.page}
                numberOfPages={data ? Math.round(data.length / 6) : 1}
                onPageChange={page => {
                  console.log(page);
                  this.setState({ page });
                }}
                label={`1-6 of ${data ? data.length : 1}`}
              />
            </DataTable>
          </View>
          {this.state.loading && <Loading />}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    width: "100%"
  },
  contentWrapper: {
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 10
  },
  title: {
    fontSize: 20
  },
  text: { flex: 1, textAlign: "center" },
  btnWrapper: {
    width: "100%",
    borderRadius: 5
  },
  tableItem: {
    justifyContent: "center"
  }
});

export default AccountsList;
