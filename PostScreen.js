import * as React from 'react'
import db from '../config';
import firebase from 'firebase'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
export default class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Description: '',
          Name: '',
          userId: firebase.auth().currentUser.email,
          
        }
      }

  AddBarterReqeust = (Name, ItemDescription)=>{
    
    var userId = this.state.userId
        db.collection('BarterReqeusts').add({
            "NameOfItem" : Name,
            "Description" : ItemDescription,
            "User" : userId,
          })
          this.setState({
            Name :'',
            Description : ''
        })
        alert("end")
    }
  
  
    
render(){
    return(
        <View style = {styles.container}>
        <TextInput value={this.state.Name} placeholder= "Name of your item" onChangeText={(text) => { this.setState({ Name: text }) }}></TextInput>
       <TextInput value={this.state.Description} placeholder= "Description of your item" onChangeText={(text) => { this.setState({ Description: text }) }}></TextInput>
        <TouchableOpacity onPress={()=>{this.AddBarterReqeust(this.state.Name,this.state.Description)}}><Text>Add Item</Text></TouchableOpacity>
     
        </View>
    )
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});