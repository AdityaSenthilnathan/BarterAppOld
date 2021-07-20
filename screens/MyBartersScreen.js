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

  static navigationOptions = { header: null };

  getDonorDetails = (donorId) => {
    db.collection("User").where("Email", "==", donorId).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            "donorName": doc.data().FirstName + " " + doc.data().LastName
          })
        });
      })
  }

  getAllDonations = () => {
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

  sendBook = (bookDetails) => {
    if (bookDetails.Status === "Book Sent") {
      var requestStatus = "Donor Interested"
      db.collection("AllDonations").doc(bookDetails.doc_id).update({
        "Status": "Donor Interested"
      })
      this.sendNotification(bookDetails, requestStatus)
    }
    else {
      var requestStatus = "Book Sent"
      db.collection("AllDonations").doc(bookDetails.doc_id).update({
        "Status": "Book Sent"
      })
      this.sendNotification(bookDetails, requestStatus)
    }
  }

  sendNotification=(bookDetails,requestStatus)=>{
    var RequestId = bookDetails.ReqeustId
    var donorId = bookDetails.DonorId
    db.collection("AllNotifications")
    .where("ReqeustId","==", RequestId)
    .where("Reqeuster","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Book Sent"){
          message = this.state.donorName + " sent you book"
        }else{
           message =  this.state.donorName  + " has shown interest in donating the book"
        }
        db.collection("AllNotifications").doc(doc.id).update({
          "message": message,
          "NotificationStatus" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
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
       <TouchableOpacity style={styles.button} onPress = {()=>{
                this.sendBook(item)
           }}>
       </TouchableOpacity>
       
   </ListItem.Content>
 </ListItem>
 


   )


   componentDidMount(){
     this.getDonorDetails(this.state.donorId)
     this.getAllDonations()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>

         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all book Donations</Text>
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