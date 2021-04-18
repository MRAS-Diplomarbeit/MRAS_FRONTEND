import * as React from 'react';
import { useState } from 'react';
import {View, Text,TextInput,Image,SafeAreaView} from 'react-native';
import AppButton from '../Components/Buttons/AppButton';
import styles from "../Components/styles";


    const ForgotPasswordScreen = ({navigation}) => {

    const [userPassword,setuserPassword] = useState("");
    const [passwordRecoveryKey, setpasswordRecoveryKey] = useState("");
    const [userName, setuserName] = useState("");

    const user={
        userName: userName, 
        passwordRecoveryKey: passwordRecoveryKey
      }
    
    return(
      <View style={styles.container}>
        <View style={{marginTop: 64}}>
            <SafeAreaView style={styles.container}>
              <View style={{marginTop: 20}}></View>
              <Text style={styles.frontpageheading}>Forgot Password?</Text>
              <Text style={styles.frontpageheadinggray}>Multiroom Audio Setup</Text>
              <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
              <Text style={styles.frontpageheadinggray}>MRAS</Text>
              <TextInput style={styles.textInput} placeholder="Username" onChangeText={text=>setuserName(text)}/*returnKeyType="next" onSubmitEditing={() => {this.PasswordInput.focus();}}*//>
              <TextInput style={styles.textInput} placeholder="Password Recovery Key" onChangeText={text=>setpasswordRecoveryKey(text)}/*returnKeyType="next" onSubmitEditing={() => {this.PasswordInput.focus();}}*//>
              <View style={{marginTop: 20}}></View>


              <AppButton title="Confirm" onPress={() => forgotPassword(navigation, user)}/>
              <View style={{marginTop: 10}}></View>
              <AppButton title="Login" onPress={() => navigation.navigate("Login")}/>
              <View style={{marginTop: 10}}></View>
              <AppButton title="Register" onPress={() => navigation.navigate("Register")}/>
              
              

            </SafeAreaView>
            </View>
            
          </View>
   );
  }



export default ForgotPasswordScreen;

const forgotPassword = (navigation, user) =>{
    navigation.navigate("ApiForgotPassword",{UserDetail: user});
}












