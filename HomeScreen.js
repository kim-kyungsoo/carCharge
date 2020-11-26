import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { Text, View, Modal, TouchableHighlight, TextInput, Alert} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
// import Box from 'react-native-box-component'
import {HeaderMenu, CurrentDate} from './HeaderMenu';
import {sendChargeMqttCom} from './MqttCom'
const url='mqtt://broker.hivemq.com:1883';//const url='mqtt://test.mosquitto.org:1883';
const topic='server965';

export default function HomeScreen({route, navigation}){
  const [chargeState, setChargeState]= useState({chargeRate:0, power:0, current:0,voltage:0});
  let currentDate = CurrentDate();
  let chargePercent='20%';

  useEffect(() => {
    sendMsg=[];
    sendChargeMqttCom(url, topic, sendMsg, chargeState, setChargeState);
  },[]);

  return (

    <View style={{ flex: 1}}>
      
      <View style={{flex:2}}>
      <HeaderMenu navigation={navigation}  />
        <Text >현재시간: {currentDate}</Text>
      </View >
      <View style={{flex:8,flexDirection:'row'}} >
        <View style={{flex:2}}>
          <View style={{flexDirection:'row'}}>
            <View   style = {{marginLeft:10, paddingBottom:3, width:80,height:30,  backgroundColor:'#8BED4F', borderWidth:1}} >
              <Text style={{marginLeft:10, marginTop:5, fontSize:13}}>충전율</Text> 
            </View>
            <View   style = {{marginLeft:0, paddingBottom:3, width:80,height:30,  backgroundColor:'white',shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },shadowOpacity: 0.5}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>{chargeState.chargeRate}%</Text> 
            </View>
   
          </View>
          <View style={{flexDirection:'row', marginTop:20}}>
            <View   style = {{marginLeft:10, paddingBottom:3, width:80,height:30,  backgroundColor:'#8BED4F', borderWidth:1}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>전력</Text> 
            </View>
            <View   style = {{marginLeft:0, paddingBottom:3, width:80,height:30,  backgroundColor:'white',shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },shadowOpacity: 0.5}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>{chargeState.power}W</Text> 
            </View>
          </View>
          
          <View style={{flexDirection:'row', marginTop:20}}>
            <View   style = {{marginLeft:10, paddingBottom:3, width:80,height:30,  backgroundColor:'#8BED4F', borderWidth:1}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>충전전압</Text> 
            </View>
            <View   style = {{marginLeft:0, paddingBottom:3, width:80,height:30,  backgroundColor:'white',shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },shadowOpacity: 0.5}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>{chargeState.voltage}V</Text> 
            </View>
          </View>
 
          <View style={{flexDirection:'row', marginTop:20}}>
            <View   style = {{marginLeft:10, paddingBottom:3, width:80,height:30,  backgroundColor:'#8BED4F', borderWidth:1}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>충전전류</Text> 
            </View>
            <View   style = {{marginLeft:0, paddingBottom:3, width:80,height:30,  backgroundColor:'white',shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },shadowOpacity: 0.5}} >
              <Text style={{marginLeft:10,marginTop:5, fontSize:13}}>{chargeState.current}A</Text> 
            </View>
          </View>
        </View>
        <View style={{flex:3}}>
          <View   style = {{marginLeft:80, paddingBottom:3, width:100,height:30,borderWidth:1}} >
            <View style = {{marginLeft:0, width:chargeState.chargeRate, height:30,  backgroundColor:'greeng'}}>
            </View>
          
          </View>
           <Text style={{marginLeft:90, marginTop:5, fontSize:13}}>{chargeState.chargeRate}% 충전중...  </Text>  
          
          <TouchableHighlight style = {{marginTop:50, marginLeft:80, width:150,height:30, backgroundColor:'blue', borderWidth:1}}  
            onPress={() => {
              const sendMsg ={msgId:0};
              sendChargeMqttCom(url, topic, sendMsg, chargeState, setChargeState)  
              }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:13, paddingTop:5, color:'white'}}>충전시작</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style = {{marginTop:20, marginLeft:80, width:150,height:30, backgroundColor:'red',  borderWidth:1}} 
                onPress={() => {
                  const sendMsg ={msgId:1};
                  sendChargeMqttCom(url, topic, sendMsg, chargeState, setChargeState)  
              }}>
                <View  style={{alignItems:'center'}}>
                  <Text style={{fontSize:13, paddingTop:5}}>충전중지</Text>
                </View>
              </TouchableHighlight>
          
        </View>
        <View style={{flex:1}}>

        </View>

      </View>
      
    </View>
     
    );
};

