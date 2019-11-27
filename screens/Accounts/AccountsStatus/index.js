import React, { Component } from "react";
import { Container, Content, View, Text, DatePicker, Card } from "native-base";
import { DataTable, Button } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { TextField } from "react-native-materialui-textfield";
import { AsyncStorage } from "react-native";

class AccountsStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
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
  setToDate(newDate) {
    this.setState({ to: newDate });
  }
  setFromDate(newDate) {
    this.setState({ from: newDate });
  }
  render() {
    const { data, showPrint } = this.state;
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
            <View style={{ flex: 1, alignItems: "center" }}>
              <View>
                <Text style={styles.title}>لائحة الحسابات</Text>
              </View>
              <View style={[styles.textField, { width: "80%" }]}>
                <TextField label="رقم الحساب" />
              </View>
              <View style={styles.datePicker}>
                <DatePicker
                  defaultDate={Date.now()}
                  locale={"ar"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="من"
                  placeHolderTextStyle={{ color: "darkgrey", width: 250 }}
                  onDateChange={this.setFromDate}
                  disabled={false}
                />
              </View>
              <View style={styles.datePicker}>
                <DatePicker
                  defaultDate={Date.now()}
                  locale={"ar"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="إلى"
                  placeHolderTextStyle={{
                    color: "darkgrey",
                    width: 250
                  }}
                  onDateChange={this.setToDate}
                  disabled={false}
                />
              </View>
            </View>
            {showPrint ? (
              <View style={styles.doubleButtonWrapper}>
                <Button style={styles.doubleButton}>
                  <Text style={[styles.text, { fontSize: 12 }]}> سحب</Text>
                </Button>
                <Button
                  style={styles.doubleButton}
                  onPress={() => this.setState({ showPrint: false })}
                >
                  <Text style={[styles.text, { fontSize: 12 }]}> رجوع</Text>
                </Button>
              </View>
            ) : (
              <Button
                style={styles.button}
                onPress={() => this.setState({ showPrint: true })}
              >
                <Text style={[styles.text, { fontSize: 12 }]}>
                  {" "}
                  افتح الطابعة
                </Text>
              </Button>
            )}
            <DataTable>
              <DataTable.Header
                style={{
                  paddingHorizontal: 0
                }}
              >
                <DataTable.Title style={styles.tableItem}>
                  التاريخ
                </DataTable.Title>
                <DataTable.Title style={styles.tableItem}>
                  Detail View
                </DataTable.Title>
                <DataTable.Title style={styles.tableItem}>له</DataTable.Title>
                <DataTable.Title style={styles.tableItem}>عليه</DataTable.Title>
              </DataTable.Header>

              {data &&
                data.map((tableItem, index) => {
                  return (
                    <DataTable.Row style={{ paddingHorizontal: 0 }}>
                      <DataTable.Cell style={styles.tableItem}>
                        {tableItem.accountNumber}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        {tableItem.name}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        {tableItem.phone}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableItem}>
                        {tableItem.dateCreated}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}

              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                  console.log(page);
                }}
                label={`1-6 of ${data.length}`}
              />
            </DataTable>
          </View>
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
  },
  datePicker: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "darkgrey",
    flex: 1,
    alignItems: "flex-start"
  },
  button: {
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    height: 40
  },
  doubleButtonWrapper: {
    marginVertical: 20,
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  doubleButton: {
    flex: 0.8,
    marginHorizontal: 5,
    backgroundColor: "#3F51B5"
  }
});

export default AccountsStatus;
const data = [
  {
    accountNumber: 18932,
    name: "محمد دلاهى",
    phone: "32342342",
    dateCreated: "2-3-2019"
  },
  {
    accountNumber: 18932,
    name: "محمد دلاهى",
    phone: "32342342",
    dateCreated: "2-3-2019"
  },
  {
    accountNumber: 18932,
    name: "محمد دلاهى",
    phone: "32342342",
    dateCreated: "2-3-2019"
  },
  {
    accountNumber: 18932,
    name: "محمد دلاهى",
    phone: "32342342",
    dateCreated: "2-3-2019"
  }
];
