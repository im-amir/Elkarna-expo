import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  Text,
  Picker,
  Icon,
  Item
} from "native-base";
import { Button } from "react-native-paper";
import MainHeader from "../../../components/Header";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { TextField } from "react-native-materialui-textfield";
import { AsyncStorage } from "react-native";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      accountType: undefined,
      accountNumber: "",
      phone: "",
      title: ""
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
  render() {
    const { name, accountType, accountNumber, phone, title } = this.state;
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
              <Text style={styles.title}>إنشاء حساب</Text>
            </View>
            <View style={styles.textField}>
              <TextField
                label="المستخدم"
                value={name}
                onChangeText={value => this.setState({ name: value })}
              />
            </View>
            <Item picker last style={{ margin: 0, padding: 0 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="نوعية الحساب"
                placeholderIconColor="red"
                selectedValue={accountType}
                onValueChange={this.onChangeAccountType}
              >
                <Picker.Item label="زبون" value="key0" />
                <Picker.Item label="مصاريف" value="key1" />
              </Picker>
            </Item>
            <View style={styles.textField}>
              <TextField
                label="رقم الحساب"
                value={accountNumber}
                onChangeText={value => this.setState({ accountNumber: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="الهاتف"
                value={phone}
                onChangeText={value => this.setState({ phone: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="العنوان"
                value={title}
                onChangeText={value => this.setState({ title: value })}
              />
            </View>
            <Button style={[styles.btnWrapper, { marginTop: 30 }]}>
              <Text style={styles.text}>حفظ</Text>
            </Button>
            <Button
              style={[
                styles.btnWrapper,
                { marginTop: 10, backgroundColor: "#F44336" }
              ]}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.text}>إلغاء</Text>
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
  }
});

export default CreateAccount;
