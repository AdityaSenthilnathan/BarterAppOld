import * as React from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
export default class ReqeustScreen extends React.Component {
render(){
    return(
        <View style = {styles.container}>
        <Text>ReqeustScreen</Text>
        </View>
    )
}

}const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});