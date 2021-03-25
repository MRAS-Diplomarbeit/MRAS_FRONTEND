import * as React from 'react';
import { useState } from 'react';
import {View, Text,TextInput,Image,SafeAreaView, Dimensions } from 'react-native';
import AppButton from '../Components/Buttons/AppButton';

import styles from "../Components/styles";


    const screeWidth = Math.round(Dimensions.get('window').width);
    const NMButton = ({children, size, style})=>{
      return(
        <View style={[styles.inner, {width: size || 240, height: size || 50, borderRadius: size / 2 || 80 / 2, elevation: 10}]}>{children}</View>
      );
    };

    const Login = ({navigation}) => {

    const [userName,setUsername] = useState("userName");
    const [userPassword,setuserPassword] = useState("userPassword");

    const user={
      userName: userName,
      password: userPassword
    }

    return(
      <View style={styles.container}>
        <View style={{marginTop: 64}}>
            <SafeAreaView style={styles.container}>
              <View style={{marginTop: 20}}></View>
              <Text style={styles.frontpageheading}>Login</Text>
              <Text style={styles.frontpageheadinggray}>Multiroom Audio Setup</Text>
              <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
              <Text style={styles.frontpageheadinggray}>MRAS</Text>
              <TextInput style={styles.textInput} placeholder="Username" onChangeText={text=>setUsername(text)}/*returnKeyType="next" onSubmitEditing={() => {this.PasswordInput.focus();}}*//>
              <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password" onChangeText={text=>setuserPassword(text)} /*ref={(input) => {this.PasswordInput = input;}} returnKeyType="next" onSubmitEditing={()=> tryToLogin(navigation,userName,userPassword)}*//>  
              <View style={{marginTop: 20}}></View>


              <AppButton title="Login" onPress={() => tryToLogin(navigation, user)}/>
              <View style={{marginTop: 10}}></View>
              <AppButton title="Register" onPress={() => navigation.navigate("Register")}/>
              <View style={{marginTop: 10}}></View>
              <AppButton title="Forgot Password?" onPress={() => navigation.navigate("ForgotPassword")}/>

            </SafeAreaView>
            </View>
            
          </View>
   );
  }



export default Login;

const tryToLogin = (navigation, user) =>{
  console.log(navigation)
 navigation.navigate("ApiLogin",{UserDetail: user});
}












