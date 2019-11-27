import React, { Component } from "react";
import { Container, View, Text, Content } from "native-base";
import { Image, Platform, StatusBar, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { TextField } from "react-native-materialui-textfield";
import Header from "../../components/Header";
import Logo from "../../assets/logo-dark.png";
import axios from "axios";
import Loading from "../../components/Loading";
import { AsyncStorage } from "react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      loading: false
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
    const base_url = "http://www.elkarna.com/Elkarna";
    this.setState({ loading: true });
    const credentials = {
      userLogin: this.state.username,
      password: this.state.password
    };
    axios
      .post(base_url + "/welcome/token", credentials, {
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
          alert("Username or Password are invalid");
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
            <Text style={{ fontSize: 24 }}>الكرنة ترحب بكم</Text>
            <View style={styles.textField}>
              <TextField
                label="المستخدم"
                value={username}
                onChangeText={value => this.setState({ username: value })}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السر"
                secureTextEntry
                onChangeText={value => this.setState({ password: value })}
              />
            </View>
            <Button
              style={styles.btnWrapper}
              onPress={this.handleLogin}
              disabled={!(username && password)}
              mode="contained"
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
    marginTop: 60,
    backgroundColor: "#3F51B5"
  },
  text: { flex: 1, textAlign: "center", color: "#fff" }
});

export default Login;
