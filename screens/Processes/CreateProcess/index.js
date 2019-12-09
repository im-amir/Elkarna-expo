import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  Text,
  Picker,
  Icon,
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

class CreateProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOperation: new Date(),
      type: null,
      compte: null,
      montant: null,
      montantWidth: 180,
      remarque: null,
      remarqueWidth: 180,
      accounts: null,
      numCompte: null,
      dateWidth: 180,
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
  onChangeAccountType = value => {
    this.setState({
      type: value
    });
  };
  handleChangeAccount = value => {
    this.setState({ numCompte: value });
  };
  handleCreateProcess = () => {
    this.setState({ loading: true });
    const {
      numAccount,
      compte,
      type,
      montant,
      remarque,
      numCompte
    } = this.state;
    const data = {
      type,
      compte,
      montant,
      remarque,
      numCompte,
      numAccount,
      name: "",
      dateCreation: Date.now()
    };
    AsyncStorage.getItem("token").then(res => {
      axios
        .post(
          base_url + "/operation/addMvtTodayOperationAn",
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
          if (res.message) {
            Toast.show(res.message, {
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
      type,
      compte,
      montant,
      remarque,
      accounts,
      numCompte,
      remarqueWidth,
      montantWidth,
      dateWidth
    } = this.state;
    const { navigation } = this.props;
    const rtlText = {
      textAlign: "right",
      writingDirection: "rtl"
    };
    console.log("Hello", type, numCompte, remarque, montant);
    return (
      <Container fluid>
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View>
              <Text style={styles.title}>إنشاء عملية</Text>
            </View>
            <View
              style={styles.datePicker}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                this.setState({ dateWidth: width });
              }}
            >
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
                  width: dateWidth + 5
                }}
                textStyle={{ color: "darkgrey" }}
                onDateChange={date => this.setState({ dateOperation: date })}
              />
            </View>
            <Item picker last style={{ margin: 0, padding: 0 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="نوعية الحساب"
                placeholderIconColor="red"
                selectedValue={type}
                onValueChange={this.onChangeAccountType}
              >
                <Picker.Item label="تحديد" />
                <Picker.Item label="داخل" value={"داخل"} />
                <Picker.Item label="خارج" value="خارج" />
                <Picker.Item label="دين من بضاعة" value="دين من بضاعة" />
              </Picker>
            </Item>
            <View
              style={styles.textField}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                this.setState({ montantWidth: width });
              }}
            >
              <TextField
                label="المبلغ"
                type="number"
                value={montant}
                nputLabelProps={{
                  shrink: true
                }}
                onChangeText={value => this.setState({ montant: value })}
                style={[rtlText]}
                labelOffset={{ x0: montantWidth - 50, x1: montantWidth + 20 }}
              />
            </View>
            <View style={styles.textField}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  selectedValue={numCompte}
                  onValueChange={this.handleChangeAccount}
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
            <View
              style={styles.textField}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                this.setState({ remarqueWidth: width });
              }}
            >
              <TextField
                label="ملاحظة"
                value={remarque}
                onChangeText={value => this.setState({ remarque: value })}
                style={[rtlText]}
                labelOffset={{ x0: remarqueWidth - 50, x1: remarque + 20 }}
              />
            </View>
            <Button
              style={[styles.btnWrapper, { marginTop: 30 }]}
              disabled={!(type && numCompte && remarque && montant)}
              onPress={this.handleCreateProcess}
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

export default CreateProcess;
