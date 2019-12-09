import React, { Component } from "react";
import { Container, View, Text, Content, Button } from "native-base";
import { Image, StyleSheet, AsyncStorage } from "react-native";
import { TextField } from "react-native-material-textfield";
import Header from "../../components/Header";
import Logo from "../../assets/logo-dark.png";
import axios from "axios";
import Loading from "../../components/Loading";
import { base_url } from "../../services";
import Toast from "react-native-tiny-toast";
const md5 = require("md5");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      loading: false,
      width: 180
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (res) {
        this.props.navigation.navigate("Home");
      }
    });
  }

  handleLogin = () => {
    this.setState({ loading: true });
    const encryptedPass = md5(this.state.password);
    const credentials = {
      userLogin: this.state.username,
      password: encryptedPass
    };
    axios
      .post(base_url + "/welcome/token", JSON.stringify(credentials), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.value) {
          console.log("res", res);
          this.setState({ loading: false });
          AsyncStorage.setItem("token", res.data.value);
          this.props.navigation.navigate("Home");
        } else {
          this.setState({ loading: false });
          Toast.show("Username or Password are invalid", {
            containerStyle: {
              backgroundColor: "#F4F4F2",
              borderRadius: 30,
              paddingVertical: 15,
              paddingHorizontal: 20
            },
            textStyle: { color: "black" }
          });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    const { navigation } = this.props;
    const { username, password } = this.state;
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
            <Text style={{ fontSize: 24 }}>الكرنة ترحب بكم</Text>
            <View
              style={styles.textField}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                console.log(width);
                this.setState({ width });
              }}
            >
              <TextField
                label="المستخدم"
                value={username}
                onChangeText={value => this.setState({ username: value })}
                style={[rtlText]}
                labelOffset={{
                  x0: this.state.width - 50,
                  x1: this.state.width + 20
                }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السر"
                secureTextEntry
                onChangeText={value => this.setState({ password: value })}
                style={[rtlText]}
                labelOffset={{
                  x0: this.state.width - 50,
                  x1: this.state.width + 20
                }}
              />
            </View>
            <Button
              style={styles.btnWrapper}
              onPress={this.handleLogin}
              disabled={!(username && password)}
            >
              <Text style={styles.text}>الدخول</Text>
            </Button>
            <View>
              <Text>
                Not a member?{" "}
                <Text
                  onPress={() => this.props.navigation.navigate("Signup")}
                  style={{ textDecorationLine: "underline" }}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
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
    marginTop: 60
  },
  text: { flex: 1, textAlign: "center" }
});

export default Login;
