import * as React from 'react';
import {Image, SafeAreaView, Text, ImageBackground, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from "../Components/styles";
import AppButton from '../Components/Buttons/AppButton';
import { useState } from 'react';
import NButton from '../Components/NButton';
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";

 const ShowResetCode = (props) => {

    return(
        <SafeAreaView style={styles.container}>
      <View style={{marginTop: 64}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.frontpageheadinggray}>Multiroom Audio Software</Text>
          <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
          <Text style={styles.frontpageheadinggray}>MAS</Text>
          <View style={{marginTop: 8}}>
            <Text style={{fontSize: 26, fontWeight: 'bold'}}>This is your Reset-Code:</Text>
          </View>
          <View style={{margin:16,backgroundColor: '#8C8C8C',borderRadius:5}}>
            <Text style={{margin:16,fontSize: 20, fontWeight: 'bold', color:"white"}}>{props.route.params.userData.reset_code}</Text>
          </View>
          <View style={{margin:25,backgroundColor: '#CA002A',borderRadius:5}}>
            <Text style={{margin:16,fontSize: 16, fontWeight: 'bold', color:"white"}}>IMPORTANT: Please do not navigate away from this page unless you wrote your Reset-Code down. This code is essential for recovering your password! </Text>
          </View>
          <View style={{marginTop: 10}}>
            <AppButton title="Complete-Register" onPress={() => props.navigation.navigate("Login")}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
    );
}
export default ShowResetCode;