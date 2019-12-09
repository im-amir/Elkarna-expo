import React, { Component } from "react";
import { Container, Content, View, Text, Tab, Tabs } from "native-base";
import MainHeader from "../../../components/Header";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";

class DiaryArchive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: new Date(),
      to: new Date(),
      accountNumber: null,
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
      .get(base_url + "/operation/listArchiveDailyOpJeson", {
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
          if (err.response.status === 500) {
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
            console.log(err);
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
        }
      });
  };
  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      <Container>
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
              <View>
                <Text style={styles.title}>أرشيف اليوميات</Text>
              </View>
            </View>

            <Tabs>
              <Tab heading="داخل">{this.renderTable(data && data.inLista)}</Tab>
              <Tab heading="خارج">
                {this.renderTable(data && data.outLista)}
              </Tab>
              <Tab heading="بيع بالدين">
                {this.renderTable(data && data.crLista)}
              </Tab>
            </Tabs>
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
          <DataTable.Title style={styles.tableItem}>التفاصيل</DataTable.Title>
          <DataTable.Title style={styles.tableItem}>المبلغ</DataTable.Title>
          <DataTable.Title style={styles.tableItem}>
            نوعية الحساب
          </DataTable.Title>
          <DataTable.Title style={styles.tableItem}>الإسم</DataTable.Title>
          <DataTable.Title style={styles.tableItem}>التاريخ</DataTable.Title>
        </DataTable.Header>

        {tableData &&
          (tableData.length ? (
            tableData.map((tableItem, index) => {
              return (
                <DataTable.Row style={{ paddingHorizontal: 0 }}>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.type}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.montantCredit}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.remarque}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.dateOperation}
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
  btnWrapper: {
    width: "100%",
    borderRadius: 5
  },
  tableItem: {
    justifyContent: "center"
  }
});

export default DiaryArchive;
