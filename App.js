import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import SignupLoginScreen from './screens/SignupLoginScreen'

import PostScreen from './screens/PostScreen'
import HomeScreen from './screens/HomeScreen'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SettingScreen from './screens/SettingScreen';


export default function App() {
  return (
    <AppContainer></AppContainer>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: SignupLoginScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer  = createAppContainer(switchNavigator);