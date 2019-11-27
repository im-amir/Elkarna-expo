import React, { Component } from "react";
import { Container, Content, View, Text, Tabs, Tab} from "native-base";
import { DataTable, Button } from "react-native-paper";
import MainHeader from "../../../components/Header";
import {Platform, StatusBar, StyleSheet} from "react-native";
import Ripple from "react-native-material-ripple";
import { AsyncStorage } from "react-native";

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrint: false
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
    });
  }
  render() {
    const { showPrint } = this.state;
    const {navigation} = this.props

    return (
      <Container
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
          }}
      >
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View>
                <Text style={styles.title}>عمليات الصندوق</Text>
              </View>
              <View>
                <Text style={styles.data}>
                  مجموع الداخل 0 مجموع الخارج 0 الرصيد 0 مجموع البيع بالدين 0
                </Text>
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
                <Ripple style={styles.rippleButton} rippleColor={"white"}>
                  <Text style={{ color: "white" }}>تأكيد</Text>
                </Ripple>
              )}
            </View>

            {!showPrint ? (
              <Tabs>
                <Tab heading="داخل">{this.renderTable(incomingOperations)}</Tab>
                <Tab heading="خارج">{this.renderTable(outgoingOperations)}</Tab>
                <Tab heading="بيع بالدين">
                  {this.renderTable(dailyDebtSale)}
                </Tab>
              </Tabs>
            ) : (
              <View>
                <View style={styles.tableWrapper}>
                  <View>
                    <Text style={styles.tableTitle}>داخل</Text>
                  </View>
                  <View>{this.renderTable(incomingOperations)}</View>
                </View>

                <View style={styles.tableWrapper}>
                  <View>
                    <Text style={styles.tableTitle}>خارج</Text>
                  </View>
                  <View>{this.renderTable(outgoingOperations)}</View>
                </View>

                <View style={styles.tableWrapper}>
                  <View>
                    <Text style={styles.tableTitle}>بيع بالدين</Text>
                  </View>
                  <View>{this.renderTable(dailyDebtSale)}</View>
                </View>
              </View>
            )}

            {!showPrint && (
              <Button
                onPress={() => this.setState({ showPrint: true })}
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  width: "80%",
                  backgroundColor: "#3F51B5"
                }}
              >
                <Text style={styles.text}> افتح الطابعة</Text>
              </Button>
            )}
          </View>
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
          {tableData.headers.map(header => (
            <DataTable.Title style={styles.tableItem}>{header}</DataTable.Title>
          ))}
        </DataTable.Header>

        {tableData.data &&
          (tableData.data.length ? (
            tableData.data.map((tableItem, index) => {
              return (
                <DataTable.Row style={{ paddingHorizontal: 0 }}>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.date}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.detail}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.amount}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.accountType}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.name}
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
          label={`1-6 of ${tableData.data.length}`}
        />
      </DataTable>
    );
  };
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
  text: { flex: 1, textAlign: "center", color: "white" },
  btnWrapper: {
    width: "100%",
    borderRadius: 5
  },
  tableItem: {
    justifyContent: "center"
  },
  data: {
    fontSize: 12,
    marginBottom: 20
  },
  rippleButton: {
    backgroundColor: "#3F51B5",
    alignItems: "center",
    height: 40,
    flexDirection: "row",
    borderRadius: 3,
    width: "80%",
    justifyContent: "center",
    marginBottom: 20
  },
  doubleButtonWrapper: {
    marginVertical: 20,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  doubleButton: {
    flex: 0.8,
    marginHorizontal: 5
  },
  tableWrapper: {
    marginVertical: 20
  },
  tableTitle: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: "center"
  }
});

export default Daily;

const incomingOperations = {
  headers: ["التاريخ", "الإسم", "نوعية الحساب", "المبلغ", "التفاصيل"],
  data: [
    {
      date: "2-3-2019",
      detail: "Hello",
      amount: 12133,
      accountType: "Hello",
      name: "محمد دلاهى"
    },
    {
      date: "2-3-2019",
      detail: "Hello",
      amount: 12133,
      accountType: "Hello",
      name: "محمد دلاهى"
    }
  ]
};
const outgoingOperations = {
  headers: ["التاريخ", "الإسم", "نوعية الحساب", "المبلغ", "التفاصيل"],
  data: []
};
const dailyDebtSale = {
  headers: ["التاريخ", "الحساب", "المبلغ", "التفاصيل"],
  data: []
};
