import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, Platform, Alert, ImageBackground, TextInput, FlatList} from 'react-native';
import styles from "../Components/styles";
import { useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Components/colors';
import NButton from '../Components/NButton';
import SearchByNameOrListButton from '../Components/SearchByNameOrListButton';


function SearchByNameOrList(props) {

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
        <View style={{alignItems: "center", paddingTop: 12, paddingRight: 90}}>
            <SearchByNameOrListButton nameOrList={"list"} len={250} props={props}><Text style={{fontWeight: 'bold', fontSize: 18}}>Select User from a List</Text></SearchByNameOrListButton>
        </View>
      </View>
    </SafeAreaView>

  );
}

export default SearchByNameOrList;