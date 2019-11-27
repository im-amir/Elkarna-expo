import React, { Component } from "react";
import { Container, View, Text, Content } from "native-base";
import { Image, Platform, StatusBar, StyleSheet } from "react-native";
import { TextField } from "react-native-materialui-textfield";
import Header from "../../../components/Header";
import Logo from "../../../assets/logo-dark.png";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { Button } from "react-native-paper";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      passwordConfirm: null,
      existingPass: null,
      userType: null,
      user: null,
      password: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
    });
  }
  handleChangePassword = () => {
    // this.props.navigation.navigate("Main");
    const base_url = "http://www.elkarna.com/Elkarna";
    const data = {
      libelle: "Account libelle",
      numCompte: "",
      numPersonne: "",
      adresse: "",
      tel: "",
      type: "CCHARGE",
      message: ""
    };
    axios
      .post(base_url + "/account/saveAccount", data, {
        method: "verb",
        headers: {
          "X-Auth-Token": "",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("Res : \n\n\n", res);
      })
      .catch(err => console.log("Error is", err));
  };

  render() {
    const { navigation } = this.props;
    const {
      name,
      user,
      userType,
      existingPass,
      passwordConfirm,
      password
    } = this.state;
    return (
      <Container
        fluid
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
        <Header navigation={navigation} backPath="Home" />
        <Content style={styles.content}>
          <View style={styles.loginCard}>
            <Image source={Logo} />
            <Text style={{ fontSize: 24 }}>تسجيل</Text>
            <View style={styles.textField}>
              <TextField
                label="اسم"
                value={name}
                onChangeText={value => this.setState({ name: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="المستخدم"
                value={user}
                onChangeText={value => this.setState({ user: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="نوعية المستخدم"
                value={userType}
                onChangeText={value => this.setState({ userType: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السرالحالية"
                value={existingPass}
                onChangeText={value => this.setState({ existingPass: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السر"
                secureTextEntry
                value={password}
                onChangeText={value => this.setState({ password: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="تأكيد كلمة السر"
                secureTextEntry
                value={passwordConfirm}
                onChangeText={value =>
                  this.setState({ passwordConfirm: value })
                }
              />
            </View>
            <Button
              style={styles.btnWrapper}
              onPress={() => navigation.navigate("Home")}
              // onPress={this.handleChangePassword}
            >
              <Text style={styles.text}>إلغاء</Text>
            </Button>
            <Button
              style={styles.btnWrapper}
              onPress={() => navigation.navigate("Home")}
              disabled={
                !(
                  name &&
                  user &&
                  userType &&
                  existingPass &&
                  password &&
                  passwordConfirm
                )
              }
            >
              <Text style={{ textDecorationLine: "underline" }}>حفظ</Text>
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
  content: {
    backgroundColor: "#3F51B5"
  },

  loginCard: {
    marginVertical: 80,
    marginHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  btnWrapper: {
    width: "100%",
    borderRadius: 5,
    marginTop: 60,
    backgroundColor: "#3F51B5"
  },
  text: { flex: 1, textAlign: "center" }
});
export default ChangePassword;
