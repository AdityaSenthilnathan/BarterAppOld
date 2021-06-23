import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import LoginScreen from './screens/LoginScreen'

import PostScreen from './screens/PostScreen'
import ReqeustScreen from './screens/ReqeustScreen'


export default function App() {
  return (
    <AppContainer></AppContainer>
  );
}


  var TabNavigator = createBottomTabNavigator({
    PostScreen: PostScreen,
    ReqeustScreen: ReqeustScreen
    })
  var SwitchNavigator = createSwitchNavigator({
    LoginScreen: LoginScreen,
    TabNavigator: TabNavigator
    })
    
const AppContainer  = createAppContainer(SwitchNavigator);