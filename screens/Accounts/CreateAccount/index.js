import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  Text,
  Picker,
  Icon,
  Item,
  Button
} from "native-base";

import MainHeader from "../../../components/Header";
import { StyleSheet, AsyncStorage } from "react-native";
import { TextField } from "react-native-material-textfield";
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libelle: "",
      type: undefined,
      numAccount: "",
      tel: "",
      adresse: "",
      loading: false,
      width: 180
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
      type: value
    });
  };
  handleCreateAccount = () => {
    this.setState({ loading: true });
    const { numAccount, libelle, type, tel, adresse } = this.state;
    const data = {
      numAccount,
      libelle,
      type,
      dateCreation: Date.now(),
      tel,
      adresse
    };
    AsyncStorage.getItem("token").then(res => {
      axios
        .post(base_url + "/account/saveAccount", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: res
          }
        })
        .then(res => {
          this.setState({ loading: false });
          Toast.showSuccess("Successfully saved account");
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
    const { numAccount, libelle, type, tel, adresse, width } = this.state;
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
              <Text style={styles.title}>إنشاء حساب</Text>
            </View>
            <View
              style={styles.textField}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                this.setState({ width });
              }}
            >
              <TextField
                label="المستخدم"
                value={libelle}
                onChangeText={value => this.setState({ libelle: value })}
                style={[rtlText]}
                labelOffset={{ x0: width - 50, x1: width + 20 }}
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
                <Picker.Item label="زبون" value="key0" />
                <Picker.Item label="مصاريف" value="key1" />
              </Picker>
            </Item>
            <View style={styles.textField}>
              <TextField
                label="رقم الحساب"
                value={numAccount}
                onChangeText={value => this.setState({ numAccount: value })}
                style={[rtlText]}
                labelOffset={{ x0: width - 50, x1: width + 20 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="الهاتف"
                value={tel}
                onChangeText={value => this.setState({ tel: value })}
                style={[rtlText]}
                labelOffset={{ x0: width - 40, x1: width + 30 }}
              />
            </View>
            <View style={styles.textField}>
              <TextField
                label="العنوان"
                value={adresse}
                onChangeText={value => this.setState({ adresse: value })}
                style={[rtlText]}
                labelOffset={{ x0: width - 40, x1: width + 30 }}
              />
            </View>
            <Button
              style={[styles.btnWrapper, { marginTop: 30 }]}
              disabled={!(numAccount || libelle || type || tel || adresse)}
              onPress={this.handleCreateAccount}
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
  }
});

export default CreateAccount;
