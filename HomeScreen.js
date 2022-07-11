import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import SafeAreaView from 'react-native-safe-area-view';
import MyHeader from '../components/MyHeader.js'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      BarterReqeusts: [],
      userId: firebase.auth().currentUser.email,
      UserName: '',
      IsExchangeRequestActive: ''
    }
    this.requestRef = null
  }

  getIsExchangeRequestActive() {
    db.collection('users')
      .where('Email', '==', this.state.userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            IsExchangeRequestActive: doc.data().IsExchangeRequestActive,
            userDocId: doc.id
          })
        })
      })
  }

  getExchangeRequest = () => {
    var exchangeRequest = db.collection('AllDonations')
      .where('Email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().Status !== "received") {
            this.setState({
              exchangeId: doc.data().reqeustId,
              requestedItemName: doc.data().ItemName,
              itemStatus: doc.data().Status,
              docId: doc.id
            })
          }
        })
      })

  }


  getBarterReqeusts = () => {
    this.requestRef = db.collection("BarterReqeusts")

      .onSnapshot((snapshot) => {
        var BarterReqeusts = snapshot.docs.map(document => document.data());
        this.setState({
          BarterReqeusts: BarterReqeusts
        });
        console.log(this.state.BarterReqeusts);
      })
  }



  componentDidMount() {
    this.getBarterReqeusts()
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) => {
    return (



      <ListItem bottomDivider>

        <ListItem.Content>


          <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}> {item.NameOfItem}
          </ListItem.Title>
          <ListItem.Subtitle> {item.Description} </ListItem.Subtitle>
          <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate("RecieverDetails",{"details": item}) }}><Text>Barter</Text></TouchableOpacity>
  
        </ListItem.Content>
      </ListItem>

    )
  }

  render() {
    if (this.state.IsExchangeRequestActive === true) {
      return (
        <Text>H</Text>
      )
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1 }}>

            <MyHeader navigation={this.props.navigation} title="HomeScreen" />
            <View style={{ flex: 1 }}>
              {
                this.state.BarterReqeusts.length != 0
                  ? (
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.BarterReqeusts}
                      renderItem={this.renderItem}
                    />
                  )
                  : (
                    <View style={styles.subContainer}>
                      <Text style={{ fontSize: 20 }}>List Of All Requested things</Text>
                    </View>
                  )
              }
            </View>
          </SafeAreaProvider>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 100,
    height: 30,
    marginTop: -35,
    marginLeft: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff5722",

  },

})
