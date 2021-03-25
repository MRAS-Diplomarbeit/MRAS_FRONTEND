import React from 'react';
import {Text, View, Image, SafeAreaView,TextInput} from 'react-native';
import AppButton from '../Components/Buttons/AppButton';
import styles from "../Components/styles";
import { useState, useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
//import * as Crypto from 'expo-crypto';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";




function ProfileScreen(props) {

  const navigation = useNavigation();

  const [newuserpassword,setnewuserpassword] = useState("");
  const [olduserpassword,setolduserpassword] = useState("");
  const [confirmuserpassword,setconfirmuserpassword] = useState("");
  
  const [username,setusername] = useState("username");
  const [isLoading, setLoading] = useState(true);
  const [isNotFilledOut, setFilledOut] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNotOk, setNotOk] = useState(true);
  const [userPermissions, setUserPermissions] = useState();
  const [data, setData] = useState([]);
  const [hashPW, setHashPW] = useState(" ");

  


  useEffect(() => getUsers(),[]);

    const getUsers=()=>{

      const adata = require("../services/apiconnection.json");

      fetch(adata.apiBaseUrl+'/user/'+props.userInfo.user.id+'/permissions', {
        method: 'GET',
        headers: {
          'Authorization': "Bearer "+props.userInfo.access_token
        }
      })
        .then((response) => response.json())
        .then((json) => checkData(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }


    function checkData(jsonObject){
      try{
        if(jsonObject.code != null){
          setNotOk(true);
          setData(jsonObject);
        }else{
          setNotOk(false);
          //console.log(jsonObject);
          setUserPermissions(jsonObject);
        }
      }catch(e){
        console.log(e);
      }
    }

    function changePasswordAPI(){

      var success = false;
      const adata = require("../services/apiconnection.json");

      (async () => {

      const hpw = await JSHash(newuserpassword, CONSTANTS.HashAlgorithms.sha256);

       const response = await fetch(adata.apiBaseUrl+'/user/'+props.userInfo.user.id+'/password', {
        method: "PATCH",
        headers: {
          'Authorization': "Bearer "+props.userInfo.access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "password": hpw
        })
      });

      try{
         const json = await response.json();
      }
      catch(error){
        success = true;

      }
     
      checkResponse(success);
      
    })();
    
    }

    function checkResponse(success){
      if(!success){
        setErrorMessage("Sorry, something went wrong")
      }else{
        setErrorMessage("Password changed successfully!")
      }
    }

    function getSpeakerNameByID(speakerID){
      const adata = require("../services/apiconnection.json");
    
          fetch(adata.apiBaseUrl+'/speaker/'+speakerID, {
            method: 'GET',
            headers: {
              'Authorization': "Bearer "+props.userInfo.access_token
            }
          })
            .then((response) => response.json())
           // .then((json) => console.log(json))
            .catch((error) => console.error(error))
            .finally(()=>setLoading(false))
    }

    const changePassword = () =>{
      if(newuserpassword==""||confirmuserpassword==""){
        setErrorMessage("Please make sure, that all fields are filled out");
      }else if(newuserpassword.length<=5){
        setErrorMessage("Your new password has to be at least 6 characters long");
      }else if (newuserpassword!=confirmuserpassword){
        setErrorMessage("Please make sure, the new Password matches");
      }else{
         
          console.log("changing password: "+ props.userInfo.access_token)

        changePasswordAPI();

      
      }
      
    }

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 64}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.frontpageheadinggray}>Multiroom Audio Software</Text>
          <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
          <Text style={styles.frontpageheadinggray}>MAS</Text>
          <View style={{marginTop: 8}}>
            <Text style={{fontSize: 26, fontWeight: 'bold'}}>Welcome back {props.userInfo.user.username}</Text>
          </View>
        </View>
        {/* <View style={{alignItems: 'flex-start', marginTop: 8}}>
          <Image style={{height: 100, width: 100}} fadeDuration={1000} source={require('../assets/yeah.png')}/>
        </View> */}

        <View style={{alignContent: 'center', alignItems: 'center'}}>
          {/* <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 12}}>
            <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Old Password" onChangeText={text=>setolduserpassword(text)}/>
          </View> */}

          <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 12}}>
            <TextInput style={styles.textInput} secureTextEntry={true} placeholder="New Password" onChangeText={text=>setnewuserpassword(text)}/>
          </View>

          <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 12}}>
            <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Confirm New Password" onChangeText={text=>setconfirmuserpassword(text)}/>
          </View>

          {isNotFilledOut ? <Text>{errorMessage}</Text> : (<Text></Text>)}

          <View style={{marginTop: 10}}>
            <AppButton title="Change Password" onPress={() => changePassword()}/>
          </View>
        </View>

        <View style={{marginTop: 48, paddingLeft: 8}}>
          <AppButton title="Manage Permissions" onPress={()=> navigation.navigate("SearchByNameOrList", {userPermissions: userPermissions, userInfo: props.userInfo})}/>
        </View>

        
        {/*
        {isLoading ? <Text>loading</Text> : (

        <View style={{marginTop: 12, paddingLeft: 8}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Permission-Groups</Text>
          {<FlatList data={userPermissions.perms.speaker_ids.map((item) => (
            {key: item}
          ))}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>}
        </View>
          

        )}
          */}
      </View>
    </SafeAreaView>


  );
}

export default ProfileScreen;


