import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Button, StyleSheet,TouchableOpacity,TouchableHighlight  } from 'react-native';


export function CurrentDate () {
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var hours = Number(new Date().getHours()+9); //To get the Current Hours
  if( hours >=24){
    hours =  hours-24;
  }
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds
  return  (year+'.'+month+'.'+date+'. '+hours+':'+min+':'+sec);
}


export  function HeaderMenu(props) {
  
  //console.log('headerMenu props,', props);
  return (

    <View style={{flexDirection: 'row', marginTop:10, justifyContent:'center'}}>
      {/* <TouchableHighlight
        style={styles.button}
        onPress= {() => props.navigation.navigate('Chart', {chNum:props.chNum})}>
        <Text style={styles.text}>Chart</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress= {() => props.navigation.navigate('Data', {chNum:props.chNum})}>
        <Text style={styles.text}>Data</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress= {() => props.navigation.navigate('Param', {chNum:props.chNum})}>
        <Text style={styles.text}>Param</Text>
      </TouchableHighlight>

      <TouchableHighlight 
        style={styles.button}
        onPress= {() => props.navigation.navigate('Home', {chNum:props.chNum})}>
        <Text style={styles.text}>Home</Text>
      </TouchableHighlight> */}

      <TouchableHighlight 
        style={styles.button}
        onPress= {() => props.navigation.navigate('Login', {chNum:props.chNum})}>
        <Text style={styles.text}>Login</Text>
      </TouchableHighlight>
    </View >

  );
}
const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    marginLeft:200,
    width: 50,
    // alignItems: 'center',
   
  //backgroundColor: '#DDDDDD',
  },
  text:{
    textDecorationLine: 'underline',
    // textDecorationStyle: 'solid',
    // fontWeight:'900',
    textDecorationColor:'blue',

  }
});