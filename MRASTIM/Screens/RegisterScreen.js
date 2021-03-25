import * as React from 'react';
import {Image, SafeAreaView, Text, ImageBackground, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from "../Components/styles";
import AppButton from '../Components/Buttons/AppButton';
import { useState } from 'react';
import NButton from '../Components/NButton';
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";

const Register = ({navigation}) => {

    const [userName,setUsername] = useState("userName");
    const [userPassword,setuserPassword] = useState("userPassword");
    const [userPasswordConf,setuserPasswordConf] = useState("userPasswordConf");

    const user={
      userName: userName,
      userPassword: userPassword,
      passwordConfirmation: userPasswordConf
    }


    return(
      <View style={styles.container}>
        <View style={{marginTop: 64}}>
        <SafeAreaView style={styles.container}>

        <View style={{alignSelf: "flex-start"}}>    
          <NButton elev={5} size={40} props={navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
        </View>

        <Text style={styles.frontpageheading}>Register</Text>
        <Text style={styles.frontpageheading}>Multiroom Audio Setup</Text>
        <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>

        <TextInput style={styles.textInput} placeholder="Username" onChangeText={text=>setUsername(text)}/>
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password" onChangeText={text=>setuserPassword(text)}/>  
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Confirm Password" onChangeText={text=>setuserPasswordConf(text)}/>
        <View style={{marginTop: 20}}></View>
        <AppButton title="Register" onPress={() => tryToRegister(navigation, user)}/>
        <View style={{paddingTop: 12}}/>
        <AppButton title="Login instead" onPress={() => navigation.goBack()}/>
        
      </SafeAreaView>
    </View>
    </View>
    );
    
  
}

export default Register;

const tryToRegister = (navigation, user) =>{
  if(user.userName==null||user.userName==""||user.userPassword==null||user.userPassword==""||user.passwordConfirmation==null||user.passwordConfirmation==""){
    alert("Please make sure all required fields are filled!")
    console.log(user)
  }else if(user.userPassword!=user.passwordConfirmation){
    alert("Passwords do not match!");
  }else{
    navigation.navigate("ApiRegister", {UserDetail: user});
  }

  //Check if username already exists!!!
}
