import React, { Component } from "react";
import { Container, Content, View, Text } from "native-base";
import MainHeader from "../../../components/Header";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { TextField } from "react-native-materialui-textfield";
import { AsyncStorage } from "react-native";

class CreateExternalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: ""
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
    });
  }
  render() {
    const { accountNumber } = this.state;
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
              <Text style={styles.title}>إنشاء مستخدم خارجي</Text>
            </View>
            <View style={styles.textField}>
              <TextField
                label="رقم الحساب"
                value={accountNumber}
                onChangeText={value => this.setState({ accountNumber: value })}
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

export default CreateExternalUser;
