import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  Text,
  Picker,
  Item,
  DatePicker
} from "native-base";
import { Button } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { TextField } from "react-native-materialui-textfield";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";

class RecordingSporadicOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      accountType: null,
      from: null,
      to: null,
      amount: null,
      account: null,
      notice: null,
      accountMenuVisible: false
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
    });
  }
  onChangeAccountType = value => {
    this.setState({
      accountType: value
    });
  };
  handleChangeAccount = value => {
    console.log("Value", value);
    this.setState({ account: value });
  };
  render() {
    const { date, accountType, amount, account, notice } = this.state;
    const { navigation } = this.props;

    return (
      <Container
        fluid
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
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
                  selectedValue={account}
                  onValueChange={this.handleChangeAccount}
                >
                  {accounts.map((accountObj, index) => (
                    <Picker.Item
                      label={`${accountObj.name}  (${accountObj.accountNumber})`}
                      value={accountObj.name}
                    />
                  ))}
                </Picker>
              </Item>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.5, marginHorizontal: 5 }}>
                <TextField
                  label="ملاحظة"
                  value={amount}
                  onChangeText={value =>
                    this.setState({ accountNumber: value })
                  }
                />
              </View>
              <View style={{ flex: 0.5, marginHorizontal: 5 }}>
                <TextField
                  label="المبلغ"
                  value={amount}
                  onChangeText={value =>
                    this.setState({ accountNumber: value })
                  }
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
                  selectedValue={account}
                  onValueChange={this.handleChangeAccount}
                >
                  {accounts.map((accountObj, index) => (
                    <Picker.Item
                      label={`${accountObj.name}  (${accountObj.accountNumber})`}
                      value={accountObj.name}
                    />
                  ))}
                </Picker>
              </Item>
            </View>
            <Button
              style={[styles.btnWrapper, { marginTop: 30 }]}
              disabled={!(accountType && account && notice && amount)}
            >
              <Text style={styles.text}>حفظ</Text>
            </Button>
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
    borderRadius: 5,
    backgroundColor: "#3F51B5"
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

const accounts = [
  { name: "Muhammad Amir0", accountNumber: 12312423 },
  { name: "Muhammad Amir1", accountNumber: 12312423 },
  { name: "Muhammad Amir2", accountNumber: 12312423 },
  { name: "Muhammad Amir3", accountNumber: 12312423 },
  { name: "Muhammad Amir4", accountNumber: 12312423 },
  { name: "Muhammad Amir5", accountNumber: 12312423 },
  { name: "Muhammad Amir6", accountNumber: 12312423 }
];
