import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import PostScreen from '../screens/PostScreen';
import DonateScreen from '../screens/DonateScreen'

export const AppTabNavigator = createBottomTabNavigator({
  Post : {
    screen: PostScreen,
    navigationOptions :{
      tabBarLabel : "Donate ",
    }
  },
  Donate: {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarLabel : " Request",
    }
  }
});