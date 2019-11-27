import React, { Component } from "react";
import { View, Header, Title, Content, Body, Text } from "native-base";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontIcon from "react-native-vector-icons/FontAwesome";
import Ripple from "react-native-material-ripple";

class MainHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Appbar
          style={[
            styles.header,
            {
              backgroundColor: "#3F51B5"
            }
          ]}
        >
          <View style={styles.left}>
            <View style={styles.LeftIconsWrapper}>
              <Ripple
                rippleColor={"white"}
                rippleCentered
                rippleContainerBorderRadius={50}
                style={styles.iconStyles}
              >
                <FontIcon name="user" color={"white"} size={24} />
              </Ripple>
              <Ripple
                rippleColor={"white"}
                rippleCentered
                rippleContainerBorderRadius={50}
                style={styles.iconStyles}
              >
                <MaterialIcon name="fullscreen" color={"white"} size={24} />
              </Ripple>
            </View>
          </View>
          <Body>
            <Text style={styles.title}>{this.props.title}</Text>
          </Body>
          <View style={styles.right}>
            <Ripple
              onPress={() =>
                this.props.menu && this.props.navigation.openDrawer()
              }
              rippleColor={"white"}
              rippleCentered
              rippleContainerBorderRadius={50}
              style={styles.iconStyles}
            >
              <MaterialIcon name="menu" color={"white"} size={24} />
            </Ripple>
          </View>
        </Appbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LeftIconsWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  left: {
    flex: 0.5
  },
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  right: {
    flex: 0.3
  },
  iconStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20
  }
});
export default MainHeader;
