import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { Text, View, Modal, StyleSheet, TouchableHighlight, TextInput, Alert} from 'react-native';
// import { useSelector,useDispatch } from "react-redux";
import CheckBox from 'react-native-check-box'
import {sendLoginMqttCom, sendChargeMqttCom} from './MqttCom'

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const url='mqtt://broker.hivemq.com:1883';
//const url='mqtt://test.mosquitto.org:1883';
const topic='server965';

const loginTextInput=React.createRef();
const passwdTextInput=React.createRef();
const newPasswdTextInput=React.createRef();
const nameTextInput=React.createRef();
const phoneNumberTextInput=React.createRef();

export default function LoginScreen({route, navigation}) {

    const [loginState, setLoginState]= useState({login:'', passwd:'', newPasswd:'',
        loginOk:false, loginError:'',  loginCheckResult:'', loginModal:false,
        passwdModal:false, memberModal:false, result:'', isChecked:false})
    const [chargeState, setChargeState]=useState({chargeRate:0, power:0, voltage:0, current:0});
    let resultString;

    useEffect(() => {
      sendMsg=[];
      sendChargeMqttCom(url, topic, sendMsg, chargeState, setChargeState);
    },[]);

    function checkLoginOk() {
      if(loginState.loginOk ===true) {
        loginTextInput.current.clear();passwdTextInput.current.clear();
        setLoginState({...loginState, loginOk:false, loginError:''});
        navigation.navigate('Home');
      } else {
        return (
          <View >
            <Text style={{marginLeft:55, marginTop:0,fontSize:13, color:'red'}}>{loginState.loginError}</Text>
          </View>
        )
      }
    }
    
    function loginModal() {
      return (
      <Modal animationType = "slide" transparent = {false} visible = {loginState.loginModal}>
        <View style={{flex:1}} >
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20}}>Login ID 찾기</Text>
            </View>
           
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:1, marginTop:-40, marginLeft:20}}>
              <Text style={{marginTop:-10, fontSize:13}}> 이름:  </Text> 
              <TextInput ref={nameTextInput} style = {{marginTop:-22, marginLeft:80, paddingBottom:3, width:200, height:30, borderWidth:1}}  
                onChangeText= {text => {  
                setLoginState({...loginState, name:text,loginCheckResult:''})
                console.log('Login', loginState.name);

              }}>
              </TextInput>
              <Text style={{marginTop:20, fontSize:13}}> 휴대폰번호:  </Text> 
              <TextInput ref={phoneNumberTextInput}  style = {{marginTop:-22, marginLeft:80, paddingBottom:3, width:200,height:30,  borderWidth:1}} 
                onChangeText= {text => {
                setLoginState({...loginState, phoneNumber:text,loginCheckResult:''});
                console.log('Login', loginState.phoneNumber);
              }}>
              </TextInput>
              <View style={{flexDirection:'row'}}>
              <TouchableHighlight style={{marginLeft:80,marginTop:10, width:90, height:30, backgroundColor:'blue'}}
                onPress={() => {
                  setLoginState({...loginState, name:'', phoneNumber:'',loginModal:false})
                }}>
                <View >
                  <Text style={{fontSize:13, marginTop:5, marginLeft:10, color:'white'}}>처음으로 </Text>
                </View>
              </TouchableHighlight>
                <TouchableHighlight style={{marginTop:10, marginLeft:20, width:90, height:30, backgroundColor:'blue'}}
                  onPress={() => {
                    if(loginState.name==='') {
                        Alert.alert('이름을 입력해 주세요!');
                        return;
                      } else if(loginState.phoneNumber===''){
                        Alert.alert('휴대폰번호를 입력해 주세요!')
                        return;
                      }
                    const sendMsg ={msgId:1, name:loginState.name, phoneNumber:loginState.phoneNumber};
                    sendLoginMqttCom(url,topic,sendMsg,loginState, setLoginState);
                   
                    if(loginState.login!==''){
                      nameTextInput.current.clear();  phoneNumberTextInput.current.clear();
                    } else {
                      setLoginState({...loginState, name:'', phoneNumber:''})
                    }

                  }}>
                  <View  style={{alignItems:'center'}}>
                    <Text style={{fontSize:13, marginTop:5,  color:'white'}}>찾기</Text>
                  </View>
                </TouchableHighlight>
             </View>
              <View >
                <Text style={{marginLeft:80, marginTop:10,fontSize:13, color:'blue'}}>{loginState.loginCheckResult}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      )
    }

    function passwdModal() {
      return (
      <Modal animationType = "slide" transparent = {false} visible = {loginState.passwdModal}>
        <View style={{flex:1}} >
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20}}>Passwd 수정</Text>
            </View>
            
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:1, marginTop:-40, marginLeft:20}}>
              <Text style={{marginTop:-10, fontSize:13}}> Login:  </Text> 
              <TextInput ref={loginTextInput} style = {{marginTop:-22, marginLeft:90, paddingBottom:3, width:180, height:30, borderWidth:1}}  
                onChangeText= {text => {  
                setLoginState({...loginState, login:text,loginCheckResult:''})
                console.log('Login', loginState.login);

              }}>
              </TextInput>
              
              <Text style={{marginTop:20, fontSize:13}}> Passwd:  </Text> 
              <TextInput ref={passwdTextInput} secureTextEntry={true}  style = {{marginTop:-22, marginLeft:90, paddingBottom:3, width:180,height:30,  borderWidth:1}} 
                onChangeText= {text => {
                setLoginState({...loginState, passwd:text,loginCheckResult:''});
                console.log('passwd', text);
              }}>
              </TextInput>
              <Text style={{marginTop:20, fontSize:13}}> New Passwd:  </Text> 
              <TextInput ref={newPasswdTextInput} secureTextEntry={true}  style = {{marginTop:-22, marginLeft:90, paddingBottom:3, width:180,height:30,  borderWidth:1}} 
                onChangeText= {text => {
               setLoginState({...loginState, newPasswd:text,loginCheckResult:''});
                
              }}>
              </TextInput>
              <View style={{marginLeft:20, flexDirection:'row', alignItems:'center'}}>
                <TouchableHighlight style={{marginLeft:70,marginTop:10, width:90, height:30, backgroundColor:'blue'}}
                  onPress={() => {
                    setLoginState({...loginState, passwdModal:false,login:'',passwd:'', name:'', phoneName:'',loginCheckResult:''});
                  }}>
                  <View >
                    <Text style={{fontSize:13, marginTop:5, marginLeft:20, color:'white'}}>처음으로</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={{marginTop:10, marginLeft:10, width:80, height:30, backgroundColor:'blue'}}
                  onPress={() => {
                    if(loginState.login==='') {
                      Alert.alert('login ID를 입력하세요.');
                      return;
                    } else if(loginState.passwd==='' || loginState.newPasswd===''){
                      Alert.alert('Passwd를 입력하세요.')
                      return;
                    }

                    if(loginState.passwd === loginState.newPasswd) {
                      const sendMsg ={msgId:2, login:loginState.login, passwd:loginState.passwd};
                      sendLoginMqttCom(url,topic,sendMsg,loginState, setLoginState);
                      setLoginState({...loginState, login:'',passwd:'', newPasswd:'', phoneNumber:''});
                    } else {
                     Alert.alert('Passwd가 일치하지 않습니다.')
                    }
                    console.log('passwd', loginState.setLoginState);

                  }}>
                  <View >
                    <Text style={{fontSize:13, marginTop:5, marginLeft:25,color:'white'}}>변경</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View >
                <Text style={{marginLeft:80, marginTop:10,fontSize:13, color:'blue'}}>{loginState.loginCheckResult}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      )
    }
    
    function memberModal() {
      return (
      <Modal animationType = "slide" transparent = {false} visible = {loginState.memberModal}>
      <View style={{flex:1}}>
        <View style={{ flex:2, flexDirection:'row', alignItems: 'center',justifyContent:'center' }}>
          <Text style={{fontSize:20}}>회원가입</Text>
          
        </View>
        <View style={{ flex:6, marginLeft:20}}>
          <View style={{flexDirection:'row' }}>
            <Text style={{fontSize:13, marginTop:10}}> Login:  </Text> 
            <TextInput ref={loginTextInput} style = {{ marginLeft:39, paddingBottom:3, width:150, height:30, borderWidth:1}} placeholder='사용할 LoginID'
              onChangeText= {text => {  
                setLoginState({...loginState, login:text,loginCheckResult:''})
              }}/>
              <CheckBox  style={{flex: 1, marginLeft:5}}  onClick={()=>{
                  setLoginState({...loginState, isChecked:true})
                  const sendMsg ={msgId:4, login:loginState.login};
                  console.log('msg:', sendMsg)
                  sendLoginMqttCom(url,topic,sendMsg, loginState, setLoginState);
                    }}
                  isChecked={loginState.isChecked}
                  rightText={"중복체크"}
                />
          </View>
 
          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize:13, marginTop:15}}> 비밀번호:  </Text> 
            <TextInput ref={passwdTextInput} secureTextEntry={true}  style = {{marginTop:5, marginLeft:25, paddingBottom:3, width:150,height:30,  borderWidth:1}} 
              onChangeText= {text => {
                setLoginState({...loginState, passwd:text,loginCheckResult:''});
               }}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:15, fontSize:13}}> 비밀번호확인:  </Text> 
            <TextInput ref={passwdTextInput} secureTextEntry={true}  style = {{marginTop:5, marginLeft:2, paddingBottom:3, width:150,height:30,  borderWidth:1}} 
                onChangeText= {text => {
              setLoginState({...loginState, newPasswd:text,loginCheckResult:''});
              }}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:15, fontSize:13}}> 이름:  </Text> 
            <TextInput  ref={nameTextInput} style = {{marginTop:5, marginLeft:48, paddingBottom:3, width:150,height:30,  borderWidth:1}} 
                onChangeText= {text => {
              setLoginState({...loginState, name:text,loginCheckResult:''});
             }}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:10, fontSize:13}}>휴대폰번호:  </Text> 
            <TextInput ref={phoneNumberTextInput} style =  {{marginTop:5, marginLeft:17, paddingBottom:3, width:150,height:30,  borderWidth:1}} 
                onChangeText= {text => {
              setLoginState({...loginState, phoneNumber:text,loginCheckResult:''});
             }}/>
          </View>
          <View style={{flexDirection:'row', marginLeft:85 }}>
            <TouchableHighlight style={{marginTop:10,  width:80, height:30, backgroundColor:'blue'}}
              onPress={() => {
                setLoginState({...loginState, memberModal:false,login:'',passwd:'', name:'', phoneNumber:'',loginCheckResult:''});
             }}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white'}}>처음으로</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={{marginTop:10, marginLeft:10, width:60, height:30, backgroundColor:'blue'}}
              onPress={() => {
                if(loginState.login==='') {
                  Alert.alert('login ID를 입력하세요.');
                  return;
                } else if(loginState.passwd==='' || loginState.newPasswd===''){
                  Alert.alert('Passwd를 입력하세요.')
                  return;
                } else if(loginState.name==='') {
                  Alert.alert('이름을 입력하세요.')
                  return;
                } else if(loginState.phoneNumber==='') {
                  Alert.alert('휴대폰번호를 입력하세요.')
                  return;
                } else if(loginState.passwd!== loginState.newPasswd) {
                  Alert.alert('passwd가 서로 다릅니다.')
                  return;
                } else if(loginState.isChecked===false) {
                  Alert.alert('Login 중복체크해야 합니다.');
                  return;
                }
              loginTextInput.current.clear();passwdTextInput.current.clear();nameTextInput.current.clear();phoneNumberTextInput.current.clear();
              const sendMsg ={msgId:3, login:loginState.login, passwd:loginState.passwd, name:loginState.name, phoneNumber:loginState.phoneNumber};
              sendLoginMqttCom(url,topic,sendMsg, loginState, setLoginState);
              setLoginState({...loginState, login:'',passwd:'', newPasswd:'',name:'', phoneNumber:''});
             }}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white'}}>확인</Text>
              </View>
            </TouchableHighlight>
         </View>
         <View >
            <Text style={{marginLeft:80, marginTop:10,fontSize:13, color:'blue'}}>{loginState.loginCheckResult}</Text>
          </View>
        </View>
     </View>

      </Modal>
    );

  }
    
    return (
      
      <View style={{flex:1}}>
        {/* { navigation.navigate('Home')} */}
        {loginModal()}
        {passwdModal()}
        {memberModal()}
        <View style={{flex:2, alignItems:'center', justifyContent:'center', marginLeft:-70}}>
          <Text style={{fontSize:20}}>전기차 충전앱</Text>
        </View>
        <View style={{flex:4, flexDirection:'row'}}>
          <View style={{flex:1, marginLeft:20}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{marginTop:5, fontSize:13}}> Login:  </Text> 
              <TextInput ref={loginTextInput} style = {{marginLeft:14, paddingBottom:3, width:150, height:30, borderWidth:1}}  
                onChangeText= {text => {  
                setLoginState({...loginState, login:text, loginError:''})
                console.log('Login', loginState.login);
                }}>
              </TextInput>
            </View>
            <View style={{flexDirection:'row', marginTop:10}}>
              <Text style={{marginTop:5,fontSize:13}}> Passwd:  </Text> 
              <TextInput ref={passwdTextInput} secureTextEntry={true}  style = {{marginLeft:0, paddingBottom:3, width:150,height:30,  borderWidth:1}} 
                onChangeText= {text => {
                setLoginState({...loginState, passwd:text,loginError:''});
                console.log('passwd', loginState.passwd);
                }}>
              </TextInput>
            </View>
            <View style={{flexDirection:'row', marginLeft:60, marginTop:10}}>
              <TouchableHighlight onPress={() => {
                setLoginState({...loginState, loginModal:true, loginError:''});      
                console.log('loginModal', loginState.loginModal)          
              }}>
                <View >
                  <Text style={{fontSize:13}}>Login 찾기</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                 setLoginState({...loginState, passwdModal:true, loginError:''}); 
              }}>
                <View >
                  <Text style={{fontSize:13}}>| Passwd 찾기</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                setLoginState({...loginState, memberModal:true, isChecked:false, loginError:''}); 
              }}>
                <View >
                  <Text style={{fontSize:13}}>| 회원가입</Text>
                </View>
              </TouchableHighlight>
            </View>
            {checkLoginOk()}
          </View>
          <View>
            <TouchableHighlight style={{marginTop:-5, marginRight:20,width:100, height:75, backgroundColor:'blue'}}
              onPress={() => {
                if(loginState.login==='') {
                  Alert.alert('login ID를 입력하세요.');
                  return;
                } else if(loginState.passwd===''){
                  Alert.alert('Passwd를 입력하세요.')
                  return;
                }
              loginTextInput.current.clear();passwdTextInput.current.clear();
              const sendMsg ={msgId:0, login:loginState.login, passwd:loginState.passwd};
              // console.log('login msg:', sendMsg)
              sendLoginMqttCom(url,topic,sendMsg,loginState, setLoginState);
             }}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white'}}>Login</Text>
              </View>
            </TouchableHighlight>
            
          </View>
        </View>
      </View>
    );
  }

  