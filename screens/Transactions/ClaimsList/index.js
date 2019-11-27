import React, { Component } from "react";
import { Container, Content, View, Text } from "native-base";
import { DataTable } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { Platform, StatusBar, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { AsyncStorage } from "react-native";
import { Button } from "react-native-paper";

class ClaimsList extends Component {
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
                  width: "80%",
                  backgroundColor: "#3F51B5"
                }}
              >
                <Text style={styles.text}> افتح الطابعة</Text>
              </Button>
            )}

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

export default ClaimsList;

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
