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
import axios from "axios";
import { base_url } from "../../../services";
import Loading from "../../../components/Loading";
import Toast from "react-native-tiny-toast";

class CreateExternalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCompte: "",
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

  handleCreateExternalUser = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
      const data = {
        numCompte: this.state.numCompte
      };
      axios
        .post(base_url + "/account/createOnlineAccount", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: res
          }
        })
        .then(res => {
          this.setState({ loading: false });
          if (res.message) {
          } else {
            Toast.showSuccess("Successfully created external user");
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
    const { numCompte, accounts } = this.state;
    const { navigation } = this.props;

    return (
      <Container fluid>
        <MainHeader navigation={navigation} menu={true} />
        <Content>
          <View style={styles.contentWrapper}>
            <View>
              <Text style={styles.title}>إنشاء مستخدم خارجي</Text>
            </View>
            <Item picker last style={{ margin: 0, padding: 0, width: "80%" }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="رقم الحساب"
                placeholderIconColor="red"
                selectedValue={numCompte}
                onValueChange={value => this.setState({ numCompte: value })}
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
            <Button
              style={[styles.btnWrapper, { marginTop: 30 }]}
              onPress={this.handleCreateExternalUser}
              disabled={!numCompte}
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

export default CreateExternalUser;
