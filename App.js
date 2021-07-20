import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import LoginScreen from './screens/LoginScreen'

import PostScreen from './screens/PostScreen'
import DonateScreen from './screens/DonateScreen'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SettingScreen from './screens/SettingScreen';


export default function App() {
  return (
    <AppContainer></AppContainer>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: LoginScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer  = createAppContainer(switchNavigator);