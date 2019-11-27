import React from "react";
import { Body, Card, CardItem, Left, Right, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const SmallCard = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate(props.route)}
      style={styles.card}
    >
      <Card>
        <CardItem>
          <Body>
            <View style={styles.smallCardWrapper}>
              <Left style={styles.left}>
                <View>
                  <Text>{props.number}</Text>
                </View>
                <View>
                  <Text style={styles.title}>{props.title}</Text>
                </View>
              </Left>
              <Right style={styles.right}>
                <View>
                  <Entypo name={props.icon} size={16} />
                </View>
              </Right>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "46%",
    paddingVertical: 10,
    marginTop: 15
  },
  smallCardWrapper: {
    flexDirection: "row"
  },
  left: {
    flex: 1.5
  },
  right: {
    flex: 1
  },
  title: {
    fontSize: 12
  }
});

export default SmallCard;
