import React, { Component } from "react";
import { Container, Content, View, Text } from "native-base";
import { DataTable } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";

class DebtorsList extends Component {
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
                <Text style={styles.title}>لائحة المديونون</Text>
              </View>
            </View>

            <View>{this.renderTable(incomingOperations)}</View>
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
                    {tableItem.amount}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableItem}>
                    {tableItem.on}
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
  tableItem: {
    justifyContent: "center"
  }
});

export default DebtorsList;

const incomingOperations = {
  headers: ["رقم الحساب", "الإسم", "عليه"],
  data: [
    {
      amount: 12133,
      name: "محمد دلاهى",
      on: 32323
    },
    {
      amount: 12133,
      name: "محمد دلاهى",
      on: 32323
    }
  ]
};
