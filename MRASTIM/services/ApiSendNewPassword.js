import React, { useEffect, useState } from 'react';
import {Text, View } from 'react-native';


export const ApiSendNewPassword = (props) => {

  const [isLoading, setLoading] = useState(true);
  const [isNotOk, setNotOk] = useState(true);
  const [data, setData] = useState([]);

  const apidata = require("./apiconnection.json");
   
  useEffect(()=>forgotPassword())

  function forgotPassword(){
    sendNewPassword()
  }

    function sendNewPassword(){
        fetch(apidata.apiBaseUrl+'/user/password/new/'+props.route.params.UserDetail.username, {
            method: 'POST',
    
            body: JSON.stringify({
                "password": props.route.params.UserDetail.newuserpassword
            })
          })
          .then((response) => response.json())
          .then((json) => console.log("send new password"+json))
          .finally(setLoading(false))
        }

    function checkData  (jsonObject){

    console.log("checkData: " +jsonObject);
        
    if(jsonObject.code != null) {
        setNotOk(true);
        setData(jsonObject);
    }else{
        setNotOk(false);
        setData(jsonObject);
    // storeUserData(jsonObject);
        }
    }


  return (

    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : (isNotOk ? (props.navigation.navigate("Login")) : (props.navigation.navigate("Login")))} 
    </View>
  );

};

export default ApiSendNewPassword;

