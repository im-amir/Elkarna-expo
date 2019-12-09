import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  Text,
  DatePicker,
  Tabs,
  Tab,
  Button
} from "native-base";

import { DataTable } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { StyleSheet, AsyncStorage } from "react-native";
import { TextField } from "react-native-material-textfield";
import Ripple from "react-native-material-ripple";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";

class PastOperations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrint: false,
      from: new Date(),
      to: new Date(),
      accountNumber: null,
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
      .get(base_url + "/operation/listTodayAllDailyOpJeson", {
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
  setToDate(newDate) {
    this.setState({ to: newDate });
  }
  setFromDate(newDate) {
    this.setState({ from: newDate });
  }

  render() {
    const { showPrint, data } = this.state;
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
                <Text style={styles.title}>عمليات الصندوق</Text>
              </View>
              <View style={[styles.textField, { width: "80%" }]}>
                <TextField
                  label="رقم الحساب"
                  style={[rtlText]}
                  labelOffset={{ x0: 200, x1: 300 }}
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
                  placeHolderText="من"
                  placeHolderTextStyle={{
                    color: "darkgrey",
                    width: 250,
                    textAlign: "right"
                  }}
                  onDateChange={this.setFromDate}
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
                    width: 250,
                    textAlign: "right"
                  }}
                  onDateChange={this.setToDate}
                />
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
                <View>
                  <Ripple style={styles.rippleButton} rippleColor={"white"}>
                    <Text style={[styles.text, { color: "white" }]}>تأكيد</Text>
                  </Ripple>
                  <View style={[styles.textField, { width: "50%" }]}>
                    <TextField
                      label="إسم الحساب  للبحث...*"
                      style={[rtlText]}
                      labelOffset={{ x0: 200, x1: 300 }}
                    />
                  </View>
                </View>
              )}
            </View>

            <View>
              {!showPrint ? (
                <Tabs>
                  <Tab heading="داخل">
                    {this.renderTable(data && data.inList)}
                  </Tab>
                  <Tab heading="خارج">
                    {this.renderTable(data && data.outList)}
                  </Tab>
                  <Tab heading="بيع بالدين">
                    {this.renderTable(data && data.crList)}
                  </Tab>
                </Tabs>
              ) : (
                <View>
                  <View style={styles.tableWrapper}>
                    <View>
                      <Text style={styles.tableTitle}>داخل</Text>
                    </View>
                    <View>{this.renderTable(data && data.inList)}</View>
                  </View>

                  <View style={styles.tableWrapper}>
                    <View>
                      <Text style={styles.tableTitle}>خارج</Text>
                    </View>
                    <View>{this.renderTable(data && data.outList)}</View>
                  </View>

                  <View style={styles.tableWrapper}>
                    <View>
                      <Text style={styles.tableTitle}>بيع بالدين</Text>
                    </View>
                    <View>{this.renderTable(data && data.crList)}</View>
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
                }}
                >
                  <Text style={styles.text}> افتح الطابعة</Text>
                </Button>
              )}
            </View>
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
    borderRadius: 5,
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
    marginHorizontal: 5,
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

export default PastOperations;
