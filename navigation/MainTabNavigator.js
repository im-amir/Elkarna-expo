import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import SideBar from "../components/sidebar";
import Login from "../screens/Login/";
import Signup from "../screens/Signup/";
import Home from "../screens/Home";
import CreateAccount from "../screens/Accounts/CreateAccount";
import AccountsList from "../screens/Accounts/AccountsList";
import ArchiveAccounts from "../screens/Accounts/ArchiveAccounts";
import AccountsStatus from "../screens/Accounts/AccountsStatus";
import CreateProcess from "../screens/Processes/CreateProcess";
import Daily from "../screens/Processes/Daily";
import PastOperations from "../screens/Processes/PastOperations";
import DiaryArchive from "../screens/Processes/DiaryArchive";
import DebtorsList from "../screens/Transactions/DebtorsList";
import RecordingSporadicOperation from "../screens/Processes/RecordingSporadicOperation";
import ClaimsList from "../screens/Transactions/ClaimsList";
import ChangePassword from "../screens/Users/ChangePassword";
import CreateExternalUser from "../screens/Users/CreateExternalUser";

const Drawer = createDrawerNavigator(
  {
    Home: Home,
    CreateAccount: CreateAccount,
    AccountsList: AccountsList,
    ArchiveAccounts: ArchiveAccounts,
    AccountsStatus: AccountsStatus,

    CreateProcess: CreateProcess,
    Daily: Daily,
    PastOperations: PastOperations,
    DiaryArchive: DiaryArchive,
    RecordingSporadicOperation: RecordingSporadicOperation,

    DebtorsList: DebtorsList,
    ClaimsList: ClaimsList,

    ChangePassword: ChangePassword,
    CreateExternalUser: CreateExternalUser
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default AppNavigator;
