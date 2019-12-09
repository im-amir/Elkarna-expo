import React, { Component } from "react";
import { Container, View, Text, Content, Button } from "native-base";
import { Image, StyleSheet, AsyncStorage } from "react-native";

import { TextField } from "react-native-material-textfield";
import Header from "../../../components/Header";
import Logo from "../../../assets/logo-dark.png";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";
const md5 = require("md5");

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordConfirm: null,
      existingPass: null,
      userType: null,
      user: null,
      password: null,
      currentUser: null,
      loading: false,
      width: 180
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
      .get(base_url + "/operation/currentUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: res
        }
      })
      .then(res => {
        this.setState({ currentUser: res.data });
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
  handleChangePassword = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
      const {
        password,
        existingPass,
        passwordConfirm,
        ...currentUser
      } = this.state;
      const data = {
        currentPassword: md5(existingPass),
        newPassword: md5(password),
        password: passwordConfirm,
        ...currentUser
      };
      axios
        .post(base_url + "/operation/modifyPass", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: res
          }
        })
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
            Toast.showSuccess("Successfully updated password");
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
    const { navigation } = this.props;
    const {
      existingPass,
      passwordConfirm,
      password,
      currentUser,
      width
    } = this.state;
    const rtlText = {
      textAlign: "right",
      writingDirection: "rtl"
    };
    return (
      <Container fluid>
        <Header navigation={navigation} backPath="Home" menu={true} />
        <Content style={styles.content}>
          <View style={styles.loginCard}>
            <Image source={Logo} />
            <Text style={{ fontSize: 24 }}>تسجيل</Text>
            <View
              style={styles.textField}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                this.setState({ width });
              }}
            >
              <TextField
                label="اسم"
                value={currentUser && currentUser.name}
                onChangeText={value => {
                  let currentUserCopy = { ...currentUser };
                  currentUserCopy.name = value;
                  this.setState({ currentUser: currentUserCopy });
                }}
                style={[rtlText]}
                labelOffset={{ x0: width - 30, x1: width + 40 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="المستخدم"
                value={currentUser && currentUser.userLogin}
                onChangeText={value => {
                  let currentUserCopy = { ...currentUser };
                  currentUserCopy.userLogin = value;
                  this.setState({ currentUser: currentUserCopy });
                }}
                style={[rtlText]}
                labelOffset={{ x0: width - 50, x1: width + 20 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="نوعية المستخدم"
                value={currentUser && currentUser.primaryRole}
                onChangeText={value => {
                  let currentUserCopy = { ...currentUser };
                  currentUserCopy.primaryRole = value;
                  this.setState({ currentUser: currentUserCopy });
                }}
                style={[rtlText]}
                labelOffset={{ x0: width - 70, x1: width + 10 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السرالحالية"
                value={existingPass}
                onChangeText={value => this.setState({ existingPass: value })}
                style={[rtlText]}
                labelOffset={{ x0: width - 80, x1: width }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="كلمة السر"
                secureTextEntry
                value={password}
                onChangeText={value => this.setState({ password: value })}
                style={[rtlText]}
                labelOffset={{ x0: width - 50, x1: width + 20 }}
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
                style={[rtlText]}
                labelOffset={{ x0: width - 80, x1: width }}
              />
            </View>
            <Button
              style={[styles.btnWrapper, { marginTop: 30 }]}
              onPress={this.handleChangePassword}
              disabled={
                !(
                  currentUser &&
                  currentUser.name &&
                  currentUser &&
                  currentUser.primaryRole &&
                  currentUser &&
                  currentUser.userLogin &&
                  existingPass &&
                  password &&
                  passwordConfirm
                )
              }
            >
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
export default ChangePassword;
