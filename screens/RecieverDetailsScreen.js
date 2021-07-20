import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import db from '../config.js';
import firebase from 'firebase';

export default class RecieverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      Item: this.props.navigation.getParam('details')['NameOfItem'],
      recieverId: this.props.navigation.getParam('details')['User'],
      requestId: this.props.navigation.getParam('details')['ReqeustId'],
      Name: this.props.navigation.getParam('details')["UserName"],
      Description: this.props.navigation.getParam('details')[
        'Description'
      ],
      recieverName: '',
      recieverContact: '',
      recieverAddress: '',
      recieverRequestDocId: '',
    };
  }

  getRecieverDetails() {
    db.collection('User').where('Email', '==', this.state.userId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            recieverName: doc.data().FirstName,
            recieverContact: doc.data().Contact,
            recieverAddress: doc.data().Address,
          })
        })
      });

    db.collection('BarterReqeusts').where('ReqeustId', '==', this.state.requestId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ recieverRequestDocId: doc.id })
        })
      })
  }

  updateBookStatus = () => {
    db.collection('AllDonations').add({
      "ItemName": this.state.Name,
      "RequestId": this.state.requestId,
      "Reqeuster": this.state.recieverName,
      "DonorId": this.state.userId,
      "Status": "Donor Interested"
    })
  }




  componentDidMount() {
    this.getRecieverDetails()
  }




  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()} />}
            centerComponent={{ text: "Donate Books", style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
            backgroundColor="#eaf8fe"
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Card
            title={"Book Information"}
            titleStyle={{ fontSize: 20 }}
          >
            <Card >
              <Text style={{ fontWeight: 'bold' }}>Name : {this.state.Item}</Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Description : {this.state.Description}</Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card
            title={"Reciever Information"}
            titleStyle={{ fontSize: 20 }}
          >
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
              ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateBookStatus()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
              )
              : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 16
  }
})

