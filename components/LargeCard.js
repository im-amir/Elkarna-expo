import React from "react";
import { Body, Card, CardItem, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const LargeCard = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate(props.route)}
      style={styles.card}
    >
      <Card style={styles.card}>
        <CardItem>
          <Body>
            <View style={styles.smallCardWrapper}>
              <View>
                <Entypo name={props.icon} size={16} />
              </View>
              <View>
                <Text style={styles.title}>{props.title}</Text>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
  },
  smallCardWrapper: {
    flexDirection: "row"
  },
  title: {
    fontSize: 14,
    marginLeft: 25
  }
});

export default LargeCard;
