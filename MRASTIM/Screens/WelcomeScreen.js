import React from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';

import styles from "../Components/styles";


function WelcomeScreen(props) {
    //const handlePress = () => console.log("Text pressed"); <MaterialCommunityIcons name = "email" size={60} color="dodgerblue"/>
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 64}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.frontpageheadinggray}>Multiroom Audio Software</Text>
          <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
          <Text style={styles.frontpageheadinggray}>MAS</Text>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>Welcome back Username</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>

  );
}

export default WelcomeScreen;
