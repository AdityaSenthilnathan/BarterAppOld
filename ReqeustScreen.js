import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import 'firebase/firestore';


export default class WelcomeScreen extends Component {

  getDbData = async () => {
   
    var DBReqeusts = await db.collection("BarterReqeusts").get();
   
    var Reqeusts = [];

    DBReqeusts.forEach((doc) => {
      
        Reqeusts.push(doc.data());
    });

this.setState({Reqeusts: Reqeusts})
  }

  constructor() {
    super();
    this.state = {
      Reqeusts: [],
    }
  }
  componentDidMount() {
    this.getDbData()
  }
  render() {
    if (this.state.Reqeusts.length > 0) {
      
      return (
        <View>
          <ScrollView>

            <View>
              {
                this.state.Reqeusts.map((BarterReqeust) => {
                  return (
                    <View>
                    <Text> Item:{BarterReqeust.NameOfItem}        Description {BarterReqeust.Description}        User: {BarterReqeust.User} </Text>
   
                    </View>
                  )
                })}
            </View>

          </ScrollView>

        </View>
      )
    }
    else { return (<Text>Loading</Text>) }
  }
}