import * as React from 'react'
import db from '../config';
import firebase from 'firebase'
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader.js'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
export default class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Description: '',
          Name: '',
          userId: firebase.auth().currentUser.email,
          UserName: ''
          
        }
      }

      createUniqueId(){
        return Math.random().toString(36).substring(7);
      }

  AddBarterReqeust = (Name, ItemDescription)=>{
    var email = firebase.auth().currentUser.email
    db.collection('User').where('Email', '==', email).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          this.setState({
            UserName : doc.data().FirstName + " " + doc.data().LastName
          })
        });

        
      
    });
    var userId = this.state.userId
        db.collection('BarterReqeusts').add({
            "NameOfItem" : Name,
            "Description" : ItemDescription,
            "UserId" : userId,
            "ReqeustId" : this.createUniqueId(),
            "UserName" : this.state.UserName

          })
          this.setState({
            Name :'',
            Description : ''
        })  
    }

    getDonation = () => {
      db.collection('AllDonations').where()
    }
  
  getIsBookRequestActive(){
  db.collection('User')
  .where('Email','==',this.state.userId)
  .onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      this.setState({
        IsBookRequestActive:doc.data().IsBookRequestActive,
        userDocId : doc.id
      })
    })
  })
}
    
render(){ 

  if(this.state.IsBookRequestActive == true){
    <Text>h</Text>
 
  }
  else{
    return(

      <SafeAreaProvider style={{ flex: 1 }}>
      
      <MyHeader navigation={this.props.navigation} title="Post"/>
      

         <View style = {{flex: 1}}>

         <TextInput styles = {styles.input} value={this.state.Name} placeholder= "Name of your item" onChangeText={(text) => { this.setState({ Name: text }) }}></TextInput>
        <TextInput styles = {styles.input} value={this.state.Description} placeholder= "Description of your item" onChangeText={(text) => { this.setState({ Description: text }) }}></TextInput>
         <TouchableOpacity style = {styles.button} onPress={()=>{this.AddBarterReqeust(this.state.Name,this.state.Description)}}><Text>Add Item</Text></TouchableOpacity>
      
 
         </View>
  




     
         </SafeAreaProvider>
    )}
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
      backgroundColor: '#d19',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#000',
      margin: 2
    
    
    },
    button:{
      margin: 40,
      backgroundColor: '#d11',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      
      borderColor: '#000',
    
    },
});