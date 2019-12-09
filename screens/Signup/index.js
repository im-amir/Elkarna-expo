import React, { Component } from "react";
import { Container, View, Text, Content, Button } from "native-base";

import { Image, StyleSheet, AsyncStorage } from "react-native";
import { TextField } from "react-native-material-textfield";
import Header from "../../components/Header";
import Logo from "../../assets/logo-dark.png";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      accountNumber: null,
      tel: null,
      username: null,
      password: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (res) {
        this.props.navigation.navigate("Signup");
      }
    });
  }

  handleSignup = () => {
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
      .get(base_url + "/account/listAllAccounts", {
        headers: {
          Authorization:
            "eyJ1c2VyTG9naW4iOiJ0ZXN0MSIsInBhc3N3b3JkIjoidGVzdDEiLCJjb2RlIjoib2siLCJ2YWx1ZSI6IiIsInN0YW1wIjoxNTc0NjAwMDA2MDkzfQ==",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("Res : \n\n\n", res);
      })
      .catch(err => console.log("Error is", err.response));
  };

  render() {
    const { navigation } = this.props;
    const { name, accountNumber, tel, username, password } = this.state;
    const rtlText = {
      textAlign: "right",
      writingDirection: "rtl"
    };
    return (
      <Container fluid>
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
                style={[rtlText]}
                labelOffset={{ x0: 200, x1: 300 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="رقم حساب"
                value={accountNumber}
                onChangeText={value => this.setState({ accountNumber: value })}
                style={[rtlText]}
                labelOffset={{ x0: 200, x1: 300 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="هاتف"
                value={tel}
                onChangeText={value => this.setState({ tel: value })}
                style={[rtlText]}
                labelOffset={{ x0: 200, x1: 300 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="المستخدم"
                value={username}
                onChangeText={value => this.setState({ username: value })}
                style={[rtlText]}
                labelOffset={{ x0: 200, x1: 300 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السر"
                secureTextEntry
                onChangeText={value => this.setState({ password: value })}
                style={[rtlText]}
                labelOffset={{ x0: 200, x1: 300 }}
              />
            </View>
            <Button
              style={styles.btnWrapper}
              onPress={this.handleSignup}
              // disabled={!(name && accountNumber && tel && username && password)}
            >
              <Text style={styles.text}>تقديم</Text>
            </Button>
            <View>
              <Text>
                Already a member?{" "}
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={{ textDecorationLine: "underline" }}
                >
                  Login
                </Text>
              </Text>
            </View>
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
},
  text: { flex: 1, textAlign: "center"}
});
export default Signup;
