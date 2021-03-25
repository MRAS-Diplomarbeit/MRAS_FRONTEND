import React from 'react';
import {Text, View, Image, SafeAreaView,TextInput} from 'react-native';

import styles from "../Components/styles";
import { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
import colors from '../Components/colors';
import NButton from '../Components/NButton';
import SearchByNameOrListButton from '../Components/SearchByNameOrListButton';


function SearchByNameScreen(props) {

    const [username, setUsername] = useState("username");
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 40}}>
      <View style={{alignSelf: "flex-start", paddingLeft: 2, marginBottom: 12}}>    
          <NButton elev={5} size={40} props={props.navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.frontpageheadinggray}>Multiroom Audio Software</Text>
          <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
          <Text style={styles.frontpageheadinggray}>MAS</Text>
        </View>
        <View style={{alignItems: 'center'}}>  
            <Text style={{alignSelf: "center", fontSize: 24, paddingTop: 10, fontWeight: 'bold'}}>Search user by ID</Text>
            <TextInput style={styles.textInput} placeholder="Username" onChangeText={text=>setUsername(text)}/>
            <SearchByNameOrListButton nameOrList={"name"} name={username} props={props}><Text style={{fontWeight: 'bold'}}>Search</Text></SearchByNameOrListButton>
        </View>
      </View>
    </SafeAreaView>


  );
}

export default SearchByNameScreen;

const tryToSearch = (username) =>{
    console.log("Search User");
}