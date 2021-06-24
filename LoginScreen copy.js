import * as React from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import db from '../config'
import firebase from 'firebase'
export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      modalEmail: '',
      modalPassword: '',
      ModelIsVisible: false,
      FirstName: '',
      LastName: '',
      Contact: '',
      Age: '',
      Address: '',
      ConfirmPassword: '',

    }
  }

  showModel = () => {

    return (
      <Modal visible={this.state.ModelIsVisible} transparent={true} animationtype='fade'  >
        <View style={styles.model}><ScrollView><KeyboardAvoidingView>
          <Text>Sign Up Form.</Text>

          <TextInput onChangeText={(text) => { this.setState({ FirstName: text }) }} value={this.state.FirstName} placeholder= "First Name" ></TextInput>
          <TextInput value={this.state.LastName} placeholder= "Last Name" onChangeText={(text) => { this.setState({ LastName: text }) }}></TextInput>
          <TextInput keyboardType='numeric' value={this.state.Contact} placeholder= "Contact Number" onChangeText={(text) => { this.setState({ Contact: text }) }}></TextInput>
          <TextInput value={this.state.Age} placeholder= "Age" onChangeText={(text) => { this.setState({ Age: text }) }}></TextInput>
          <TextInput multiline={true} value={this.state.Address} placeholder= "Address" onChangeText={(text) => { this.setState({ Address: text }) }}></TextInput>
          <TextInput value={this.state.modalEmail} placeholder= "Email" onChangeText={(text) => { this.setState({ modalEmail: text }) }}></TextInput>
          <TextInput secureTextEntry={true} value={this.state.modalPassword} placeholder="Password" onChangeText={(text) => { this.setState({ modalPassword: text }) }}></TextInput>
          <TextInput secureTextEntry={true} value={this.state.ConfirmPassword} placeholder= "Confirm Password" onChangeText={(text) => { this.setState({ ConfirmPassword: text }) }}></TextInput>
          <TouchableOpacity onPress={() => { this.SignUp(this.state.modalEmail, this.state.modalPassword, this.state.ConfirmPassword) }} ><Text>Register</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { this.setState({ ModelIsVisible: false })}}><Text>Cancel</Text></TouchableOpacity>

        </KeyboardAvoidingView></ScrollView></View>
      </Modal>


    )
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)

        if (response) {

          //  this.props.navigation.navigate('ReqeustScreen')
        }
      }
      catch (error) {
        alert(error.code);
        switch (error.code) {
          case "auth/user-not-found":
            alert("User does not exist.");
            break;
          case "auth/invailid-email":
            alert("Incorrect email or password")
            break;

        }
      }
    }

  }



  render() {
    return (
      <View>
        {this.showModel()}
        <TextInput onChangeText={(text) => { this.setState({ Password: text }) }} value={this.state.Password} placeholder="Password"></TextInput>
        <TextInput onChangeText={(text) => { this.setState({ Email: text }) }} value={this.state.Email} placeholder="Email"></TextInput>
        <TouchableOpacity onPress={() => { this.login(this.state.Email, this.state.Password) }}><Text>Login</Text></TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => { this.setState({ ModelIsVisible: true }) }}><Text>Sign Up</Text></TouchableOpacity>    </View>
      </View>);
  }
  SignUp = (Email, Password, ConfirmPassword) => {
    if (Password != ConfirmPassword) {
      alert("Password does not match")
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(Email, Password)
        .then((response) => {
          db.collection('User').add({
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Contact: this.state.Contact,
            Age: this.state.Age,
            Address: this.state.Address,
          })
          //return( Alert.alert('User was added succsesfuly!'))\
          //   return Alert.alert('User Added Successfully', '', [{ text: 'OK', onPress: () => this.setState({ ModelIsVisible: false }) },]);
        })
        .catch(() => {
          alert("not added succsesfuly");
        })
    }
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
