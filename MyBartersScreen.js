import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet, Button } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config.js'
import { TouchableHighlightBase } from 'react-native';
import MyHeader from '../components/MyHeader.js'
import { SafeAreaProvider } from 'react-native-safe-area-context';


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
    db.collection("User").where("Email", "==", this.state.donorId).get()
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

  sendItem = (Details) => {
    if (Details.Status === "Item Sent") {
      var requestStatus = "Donor Interested"
      db.collection("AllDonations").doc(Details.doc_id).update({
        "Status": "Donor Interested"
      })
      this.sendNotification(Details, requestStatus)
    }
    else {
      var requestStatus = "Item Sent"
      db.collection("AllDonations").doc(Details.doc_id).update({
        "Status": "Item Sent"
      })
      this.sendNotification(Details, requestStatus)
    }
  }

  sendNotification = (Details, requestStatus) => {
    var RequestId = Details.RequestId
    var donorId = Details.DonorId

    db.collection("AllNotifications")
      .where("ReqeustId", "==", RequestId)
      .where("DonorId", "==", donorId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = ""
          if (requestStatus === "Item Sent") {
            message = this.state.donorName + " sent you Item"
          } else {
            message = this.state.donorName + " has shown interest in donating the item"
          }
          db.collection("AllNotifications").doc(doc.id).update({
            "message": message,
            "NotificationStatus": "unread",
            "date": firebase.firestore.FieldValue.serverTimestamp()
          })
        });
      })
  }





  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) => (



    <ListItem
      bottomDivider
    >

      <Icon name="book" type="font-awesome" color='#696969' />
      <ListItem.Content>
        <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}> {item.ItemName}
        </ListItem.Title>
        <ListItem.Subtitle> {item.Reqeuster} </ListItem.Subtitle>
        <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor : item.Status === "Item Sent" ? "green" : "#ff5722"
              }
            ]}
            onPress = {()=>{
              this.sendItem(item)
            }}
           >
             <Text style={{color:'#ffff'}}>{
               item.Status === "Item Sent" ? "Item Sent" : "Send Item"
             }</Text>
           </TouchableOpacity>
      </ListItem.Content>
    </ListItem>


  )


  componentDidMount() {
    this.getDonorDetails(this.state.donorId)
    this.getAllDonations()
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
      
      <MyHeader navigation={this.props.navigation} title="MyBarters"/>
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1 }}>
          {
            this.state.allDonations.length === 0
              ? (
                <View style={styles.subtitle}>
                  <Text style={{ fontSize: 20 }}>List of all Donations</Text>
                </View>
              )
              : (
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.allDonations}
                  renderItem={this.renderItem}
                />
              )
          }
        </View>
      </View></SafeAreaProvider>
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