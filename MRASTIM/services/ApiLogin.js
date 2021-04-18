import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
//import * as Crypto from 'expo-crypto';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";


export const ApiLogin = (props) => {

  const [isLoading, setLoading] = useState(true); 
  const [isNotOk, setNotOk] = useState(true);
  const [data, setData] = useState([]);
  const [hashPW, setHashPW] = useState(" ");

   


  useEffect(() => {

    const apidata = require("./apiconnection.json");

    console.log(props.route.params.UserDetail.password);
    
    (async () => {
      
        const hpw = await JSHash(props.route.params.UserDetail.password, CONSTANTS.HashAlgorithms.sha256);
      
        setHashPW(hpw);
        console.log(hpw);

  
       const response = await fetch(apidata.apiBaseUrl+'/user/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
  
      },
           body: JSON.stringify({
  
               "username": props.route.params.UserDetail.userName,
               "password": hpw,
               "device_id": "not-Specified"
           })
       })
       const json = await response.json();
        checkData(json);
        setLoading(false);
       


      })(); 
  
      

  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Loading...</Text></View>) : (isNotOk ? ( props.navigation.navigate("Login")) : (props.navigation.navigate("Home",{userData: data})))} 
    </View>
  );

  function checkData  (jsonObject){

    //console.log(jsonObject);

    if(jsonObject.code != null) 
    {
        setNotOk(true);
        setData(jsonObject);
        console.log(jsonObject);
        Alert.alert(
          "User not Found",
          "Wrong Username or Password"
        );



    }else{
        setNotOk(false);
        setData(jsonObject);
        console.log(jsonObject);
    }
}

};

export default ApiLogin;


 