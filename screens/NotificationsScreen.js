import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'

import db from '../config.js';
import SwipeableFlatlist from '../components/SwipeableFlatlist'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default class NotificationScreen extends Component{
  constructor(props){
    super(props);
    this.state ={
        userId: firebase.auth().currentUser.email,
        allNotification: [],
    }
  }

 keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, index} ) =>{
    return (
     

  
    <ListItem bottomDivider> 
    <Icon name="book" type="font-awesome" color ='#696969'/> 
       <ListItem.Content>
         <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}> {item.ItemName}
         </ListItem.Title>
         <ListItem.Subtitle> {item.Reqeuster} </ListItem.Subtitle>
     </ListItem.Content>
   </ListItem>

    )
  }

  getNotification = () =>{
    this.requestRef = db.collection('AllNotifications')
    .where("Status", "==", "unread")
    .where("TargetedUserId", '==', this.state.userId)

    .onSnapshot((snapshot) => {
      var allNotification = []
      snapshot.docs.map((doc)=>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotification.push(notification)
      })
      this.setState({
        allNotification: allNotification
      })


    })
  }

  componentDidMount(){
    this.getNotification();
  }

  render(){
    return(
<SafeAreaProvider>
        <View style={styles.container}>
         
          <View style={{ flex: 0.1 }}>

          </View>
      
          <View style = {{flex: 0.9}}>
          {
            this.state.allNotification.length === 0
            ?(
              <View style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
              <Text style = {{fontSize: 25}}>You Have No Notifications</Text>
              </View>
            ):(     <SwipeableFlatlist allNotifications={this.state.allNotification} />)
          }
          </View>
        </View>

</SafeAreaProvider>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});