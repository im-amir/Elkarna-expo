import React, { Component } from "react";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View
} from "native-base";
import styles from "./style";
import Ripple from "react-native-material-ripple";
import { AsyncStorage } from "react-native";

const datas = [
  {
    name: "الرئيسية",
    route: "HomeAccountsList",
    icon: "compass",
    key: 0,
    types: null
  },
  {
    name: "الحسابات",
    // route: "CreateProcess",
    icon: "md-stats",
    key: 1,
    types: [
      {
        name: "إنشاء حساب",
        route: "CreateAccount"
      },
      {
        name: "لائحة الحسابات",
        route: "AccountsList"
      },
      {
        name: "حالة حساب",
        route: "AccountsStatus"
      },
      {
        name: "أرشيف الحسابات",
        route: "ArchiveAccounts"
      }
    ]
  },
  {
    name: "العمليات",
    // route: "Processes",
    icon: "md-stats",
    key: 2,
    types: [
      {
        name: "إنشاء عملية",
        route: "CreateProcess"
      },
      {
        name: "اليومية",
        route: "Daily"
      },
      {
        name: "العمليات الماضية",
        route: "PastOperations"
      },
      {
        name: "أرشيف اليوميات",
        route: "DiaryArchive"
      },
      {
        name: "تسجيل عملية متفرقة",
        route: "RecordingSporadicOperation"
      }
    ]
  },
  {
    name: "المعاملات",
    // route: "Transactions",
    icon: "md-stats",
    key: 3,
    types: [
      {
        name: " لائحة المديونون",
        route: "DebtorsList"
      },
      {
        name: "لائحة المطالبات",
        route: "ClaimsList"
      }
    ]
  },
  {
    name: "المستخدمين",
    // route: "Users",
    icon: "md-stats",
    key: 4,
    types: [
      {
        name: "تغيير كلمة السر",
        route: "ChangePassword"
      },
      {
        name: "إنشاء مستخدم خارجي",
        route: "CreateExternalUser"
      }
    ]
  },
  {
    name: "تسجيل خروج",
    icon: "md-stats",
    logout: true,
    key: 5,
    types: null
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      open: -1
    };
  }

  handleNavClick(data) {
    if (data.route) {
      this.props.navigation.navigate(data.route);
    } else {
      if (data.logout) {
        AsyncStorage.setItem("token", "");
        this.props.navigation.navigate("Login");
      } else {
        this.setState({ open: data.key });
      }
    }
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", paddingTop: 40 }}
        >
          <View>
            {datas.map((data, index) => {
              return [
                <Ripple
                  rippleDuration={700}
                  onPress={() => this.handleNavClick(data)}
                  key={index}
                >
                  <ListItem button noBorder>
                    <Left>
                      <Icon
                        active
                        name={data.icon}
                        style={{ color: "#777", fontSize: 26, width: 30 }}
                      />
                      <Text style={styles.text}>{data.name}</Text>
                    </Left>
                    {data.types && (
                      <Right style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Badge
                            style={{
                              backgroundColor: "#9C27B0",
                              borderRadius: 50,
                              height: 25,
                              width: 25,
                              padding: 0,
                              justifyContent: "center",
                              marginRight: 10
                            }}
                          >
                            <Text style={styles.badgeText}>
                              {data.types.length}
                            </Text>
                          </Badge>
                          <Icon name="arrow-down" size={3} />
                        </View>
                      </Right>
                    )}
                  </ListItem>
                </Ripple>,
                data.types &&
                  data.key === this.state.open &&
                  data.types.map((type, index) => {
                    return (
                      <Ripple
                        rippleDuration={700}
                        onPress={() =>
                          this.props.navigation.navigate(type.route)
                        }
                        key={index}
                      >
                        <ListItem button noBorder>
                          <Left>
                            <Text style={[styles.text, { marginLeft: 20 }]}>
                              {type.name}
                            </Text>
                          </Left>
                        </ListItem>
                      </Ripple>
                    );
                  })
              ];
            })}
          </View>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
