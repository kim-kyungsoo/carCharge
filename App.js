/**
 * npm install @react-navigation/native  --save
 * npm install react-native-reanimated  --save
 * npm install react-native-gesture-handler  --save
 * npm install react-native-screens --save
 * npm install react-native-safe-area-context --save
 * npm install @react-native-community/masked-view --save
 * npm install @react-navigation/material-top-tabs --save
 * npm install react-native-tab-view --save
 * npm install @react-navigation/bottom-tabs  --save
 * npm install react-native-simple-radio-button --save
 * npm install sp-react-native-mqtt --save  
 * npm install react-native-table-component  --save 
 * npm install react-native-chart-kit  --save 
 * npm install react-native-svg --save
 * npm install react-native-check-box --save 
 * build.gradle file =>  minSdkVersion = 22  ==> When occur to compile error
 * android/gradlew clean 
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HeaderMenu} from './HeaderMenu';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
// import ParamScreen from './ParamScreen';
// import DataScreen from './DataScreen';
// import ChartScreen from './ChartScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
        
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} options={{tabBarVisible: false}}/>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarVisible: false}}/>
      {/* <Tab.Screen name="Param" component={ParamScreen} />
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} /> */}
    </Tab.Navigator>
  </NavigationContainer>


  );
}
const styles = StyleSheet.create({
  menuButton: {
    marginBottom: 30,
    width: 50,
    alignItems: 'center',
  },
  menuText:{
    textDecorationLine: 'underline',
    fontSize:10,
  },
  homeText:{
    textDecorationLine: 'underline',
    marginLeft:70, 
    marginTop:80, 
    fontSize:18,
  },
    radio: {
    marginTop: 30,
    marginLeft:70
  }
});