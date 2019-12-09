import React, { Component } from "react";
import { View, Container, Content } from "native-base";
import { StyleSheet, AsyncStorage } from "react-native";
import MainHeader from "../../components/Header";
import SmallCard from "../../components/SmallCard";
import LargeCard from "../../components/LargeCard";

const cards = [
  {
    title: "العمليات الماضية",
    icon: "users",
    number: 2,
    route: "PastOperations"
  },
  {
    title: "لائحة الحسابات",
    icon: "list",
    number: 607,
    route: "AccountsList"
  },
  {
    title: "حالة حساب",
    icon: "folder",
    number: 15,
    route: "AccountsStatus"
  },
  {
    title: "إنشاء عملية",
    icon: "shopping-cart",
    number: 61,
    route: "CreateProcess"
  }
];
class Home extends Component {
  componentDidMount() {
    AsyncStorage.getItem("token").then(res => {
      if (!res) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <MainHeader navigation={navigation} menu={true} />
        <Content style={{ flex: 1 }}>
          <View style={styles.cardsWrapper}>
            {cards.length &&
              cards.map((card, index) => {
                return (
                  <SmallCard
                    title={card.title}
                    icon={card.icon}
                    number={card.number}
                    route={card.route}
                    navigation={navigation}
                    key={index}
                  />
                );
              })}
          </View>
          <View style={styles.largeCardsWrapper}>
            <LargeCard
              title="لائحة المطالبات"
              icon={"shopping-cart"}
              route="ClaimsList"
              navigation={navigation}
              key={10}
            />
            <LargeCard
              title="لائحة المديونون"
              icon={"back-in-time"}
              route="DebtorsList"
              navigation={navigation}
              key={11}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  largeCardsWrapper: {
    marginHorizontal: 15
  },
  cardsWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10
  }
});

export default Home;
