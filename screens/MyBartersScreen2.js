import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
  constructor() {
    super()
    this.state = {
      donorId: firebase.auth().currentUser.email,
      donorName: "",
      allDonations: []
    }
    this.requestRef = null
  }
  GetUserDetails = (user) => {
    db.collection("User").where("Email", "==", user).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            "UserName": doc.data().FirstName + " " + doc.data().LastName
          })
        });
      })
  }

  GetAllBarters(){
    this.requestRef = db.collection("AllDonations").where("DonorId", '==', this.state.donorId)
    .onSnapshot((snapshot) => {
      var allDonations = []
      snapshot.docs.map((doc) => {
        var donation = doc.data()
        donation["doc_id"] = doc.id
        allDonations.push(donation)
      });
      this.setState({
        allDonations: allDonations
      });
    })
  }
  keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(


     <ListItem bottomDivider> 
      
     <ListItem.Content>
       <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}> {item.NameOfItem} 
       </ListItem.Title>
       <ListItem.Subtitle> {"Requested By : " + item.Reqeuster +"\nStatus : " + item.Status} </ListItem.Subtitle> 
       <TouchableOpacity style={styles.button}  onPress = {()=>{
       
           }} placeholder = "Exchange">
       </TouchableOpacity>
       
   </ListItem.Content>
 </ListItem>
 
 


   )

   render(){
    return(
      <View style={{flex:1}}>

        <View style={{flex:1}}>
          {
            this.state.allDonations.length === 0
            ?(
              <View style={styles.subtitle}>
                <Text style={{ fontSize: 20}}>List of all Barters</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
  }

 
const styles = StyleSheet.create({
    button: {
      width: 100,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      elevation: 16,
      backgroundColor: "red"
    },
    subtitle: {
      flex: 1,
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })