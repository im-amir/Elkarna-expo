import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  Text,
  Picker,
  Item,
  DatePicker,
  Button
} from "native-base";
import MainHeader from "../../../components/Header";
import { TextField } from "react-native-material-textfield";
import { StyleSheet, AsyncStorage } from "react-native";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";

class RecordingSporadicOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      montant: null,
      numCompteFrom: null,
      numCompteTo: null,
      name: "",
      remarque: null,
      accounts: null,
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
      .get(base_url + "/account/listAllAccountsLigth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: res
        }
      })
      .then(res => {
        this.setState({ accounts: res.data });
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

  handleCreateRecordingOperation = () => {
    this.setState({ loading: true });
    const {
      date,
      montant,
      numCompteFrom,
      numCompteTo,
      name,
      remarque
    } = this.state;
    const data = {
      date,
      montant,
      numCompteFrom,
      numCompteTo,
      name,
      remarque
    };
    AsyncStorage.getItem("token").then(res => {
      axios
        .post(
          base_url + "/operation/saveOperationDiverAn",
          JSON.stringify(data),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: res
            }
          }
        )
        .then(res => {
          this.setState({ loading: false });
          console.log(res);
          if (res.data.message) {
            Toast.show(res.data.message, {
              containerStyle: {
                backgroundColor: "#F4F4F2",
                borderRadius: 30,
                paddingVertical: 15,
                paddingHorizontal: 20
              },
              textStyle: { color: "black" }
            });
          } else {
            Toast.showSuccess("Successfully created operation");
          }
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
    });
  };

  render() {
    const {
      montant,
      accounts,
      numCompteFrom,
      numCompteTo,
      remarque
    } = this.state;
    const { navigation } = this.props;
    const rtlText = {
      textAlign: "right",
      writingDirection: "rtl"
    };
    return (
      <Container fluid>
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View>
              <Text style={styles.title}>إنشاء عملية</Text>
            </View>
            <View style={styles.datePicker}>
              <DatePicker
                defaultDate={Date.now()}
                locale={"ar"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="التاريخ"
                placeHolderTextStyle={{
                  color: "darkgrey",
                  width: 250
                }}
                textStyle={{ color: "darkgrey" }}
                onDateChange={date => this.setState({ date })}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text>من</Text>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.textField}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  selectedValue={numCompteFrom}
                  onValueChange={value =>
                    this.setState({ numCompteFrom: value })
                  }
                >
                  {accounts &&
                    accounts.map((accountObj, index) => {
                      if (index === 0) {
                        return <Picker.Item label="تحديد" />;
                      }
                      return (
                        <Picker.Item
                          label={`${accountObj.libelle}  (${accountObj.numAccount})`}
                          value={accountObj.numAccount}
                        />
                      );
                    })}
                </Picker>
              </Item>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.5, marginHorizontal: 5 }}>
                <TextField
                  label="ملاحظة"
                  value={remarque}
                  onChangeText={value => this.setState({ remarque: value })}
                  style={[rtlText]}
                  labelOffset={{ x0: 90, x1: 140 }}
                />
              </View>
              <View style={{ flex: 0.5, marginHorizontal: 5 }}>
                <TextField
                  label="المبلغ"
                  value={montant}
                  onChangeText={value => this.setState({ montant: value })}
                  style={[rtlText]}
                  labelOffset={{ x0: 100, x1: 150 }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text>إلي</Text>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.textField}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  selectedValue={numCompteTo}
                  onValueChange={value => this.setState({ numCompteTo: value })}
                >
                  {accounts &&
                    accounts.map((accountObj, index) => {
                      if (index === 0) {
                        return <Picker.Item label="تحديد" />;
                      }
                      return (
                        <Picker.Item
                          label={`${accountObj.libelle}  (${accountObj.numAccount})`}
                          value={accountObj.numAccount}
                        />
                      );
                    })}
                </Picker>
              </Item>
            </View>
            <Button
              style={[styles.btnWrapper, { marginTop: 30 }]}
              disabled={!(remarque && numCompteFrom && numCompteTo && montant)}
              onPress={this.handleCreateRecordingOperation}
            >
              <Text style={styles.text}>حفظ</Text>
            </Button>
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
    marginHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20
  },
  text: { flex: 1, textAlign: "center" },
  btnWrapper: {
    width: "100%",
    borderRadius: 5
  },
  datePicker: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "darkgrey",
    flex: 1,
    alignItems: "flex-start"
  }
});

export default RecordingSporadicOperation;
