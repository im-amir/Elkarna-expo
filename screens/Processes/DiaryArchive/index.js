import React, { Component } from "react";
import { Container, Content, View, Text, Tab, Tabs } from "native-base";
import MainHeader from "../../../components/Header";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { AsyncStorage } from "react-native";

class DiaryArchive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: new Date(),
      to: new Date(),
      accountNumber: null,
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
    const { navigation } = this.props;

    return (
      <Container
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
              <View>
                <Text style={styles.title}>أرشيف اليوميات</Text>
              </View>
            </View>

            <Tabs>
              <Tab heading="داخل">{this.renderTable(incomingOperations)}</Tab>
              <Tab heading="خارج">{this.renderTable(outgoingOperations)}</Tab>
              <Tab heading="بيع بالدين">{this.renderTable(dailyDebtSale)}</Tab>
            </Tabs>
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
