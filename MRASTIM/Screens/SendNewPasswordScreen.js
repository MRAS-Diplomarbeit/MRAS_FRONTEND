import * as React from 'react';
import { useState } from 'react';
import {View, Text,TextInput,Image,SafeAreaView} from 'react-native';
import AppButton from '../Components/Buttons/AppButton';
import styles from "../Components/styles";


    const SendNewPasswordScreen = (props) => {

    const [userPassword,setuserPassword] = useState("");

    const user={
        newuserpassword: userPassword,
        username: props.route.params.username
    }
    
    return( 
      <View style={styles.container}>
        <View style={{marginTop: 64}}>
            <SafeAreaView style={styles.container}>
              <View style={{marginTop: 20}}></View>
              <Text style={styles.frontpageheading}>Send New Password</Text>
              <Text style={styles.frontpageheadinggray}>Multiroom Audio Setup</Text>
              <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
              <Text style={styles.frontpageheadinggray}>MRAS</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} placeholder="New Password" onChangeText={text=>setuserPassword(text)} /*ref={(input) => {this.PasswordInput = input;}} returnKeyType="next" onSubmitEditing={()=> tryToLogin(navigation,userName,userPassword)}*//>  
              <View style={{marginTop: 20}}></View>

              <AppButton title="Confirm" onPress={() => forgotPassword(props.navigation, user)}/>
              <View style={{marginTop: 10}}></View>
              <AppButton title="Login" onPress={() => props.navigation.navigate("Login")}/>
              <View style={{marginTop: 10}}></View>
              <AppButton title="Register" onPress={() => props.navigation.navigate("Register")}/>
              
            </SafeAreaView>
            </View>
            
          </View>
   );
  }



export default SendNewPasswordScreen;

const forgotPassword = (navigation, user) =>{
    navigation.navigate("ApiSendNewPassword",{UserDetail: user});
}












