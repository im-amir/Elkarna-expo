import React, { Component } from "react";
import { View, Body, Title, Header } from "native-base";
import { StyleSheet, StatusBar } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontIcon from "react-native-vector-icons/FontAwesome";
import Ripple from "react-native-material-ripple";

class MainHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          style={[
            styles.header,
            {
              backgroundColor: "#3F51B5",
              height: 75,
              paddingTop: StatusBar.currentHeight
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
            <Title>{this.props.title}</Title>
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
        </Header>
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
  }
});
export default MainHeader;
