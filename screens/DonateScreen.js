import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import SafeAreaView from 'react-native-safe-area-view';
import MyHeader from '../components/MyHeader.js'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class DonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      BarterReqeusts : []
    }
  this.requestRef= null
  }

  getBarterReqeusts =()=>{
    this.requestRef = db.collection("BarterReqeusts")

    .onSnapshot((snapshot)=>{
      var BarterReqeusts = snapshot.docs.map(document => document.data());
      this.setState({
        BarterReqeusts : BarterReqeusts
      });
      console.log(this.state.BarterReqeusts);
    })
  }

  componentDidMount(){
    this.getBarterReqeusts()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
   
     
      <ListItem
      key={i}
      title={item.NameOfItem}
      subtitle={item.Description}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      bottomDivider
    />
    
      
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
          <SafeAreaProvider style={{ flex: 1 }}>
      
        <MyHeader navigation={this.props.navigation} title="Donate"/>
        <View style={{flex:1}}>
          {
            this.state.BarterReqeusts.length != 0
            ?(
              <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.BarterReqeusts}
              renderItem={this.renderItem}
            />
            
              
            )
            :(
              <View style={styles.subContainer}>
              <Text style={{ fontSize: 20}}>List Of All Requested things</Text>
            </View>
            )
          }
        </View>
        </SafeAreaProvider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
