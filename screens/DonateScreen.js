import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'


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
   
      <ListItem bottomDivider> 
      
      <ListItem.Content>
        <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}> {item.NameOfItem} 
        </ListItem.Title>
        <ListItem.Subtitle> {item.Description} </ListItem.Subtitle> 
        <TouchableOpacity style={styles.button} onPress = {()=>{
              this.props.navigation.navigate('RecieverDetails', {"details": item})
            }}>
        </TouchableOpacity>
        
    </ListItem.Content>
  </ListItem>
  
      
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
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
