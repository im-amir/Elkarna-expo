const React = require("react-native");
const { Platform } = React;

export default {
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 12 : 10,
    fontWeight: "400",
    textAlign: "center",
  }
};
