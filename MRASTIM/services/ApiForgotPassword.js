import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


export const ApiForgotPassword = (props) => { 

  const [isLoading, setLoading] = useState(true);
  const [isNotOk, setNotOk] = useState(true);
  const [data, setData] = useState([]);

  const apidata = require("./apiconnection.json");
   
  useEffect(()=>forgotPassword(),[])

  function forgotPassword(){
    sendForgotRequest();
  }

  function sendForgotRequest(){
    
    fetch(apidata.apiBaseUrl+'/user/password/reset/'+props.route.params.UserDetail.userName, {
        method: 'POST',

        body: JSON.stringify({
            
            "reset_code": props.route.params.UserDetail.passwordRecoveryKey
        })
      })
      .then((response) => response.json())
      .then((json) => checkData(json))
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
      {isLoading ? <Text>Loading...</Text> : (isNotOk ? (props.navigation.navigate("SendNewPassword", {username: props.route.params.UserDetail.userName})) : (props.navigation.navigate("Login")))} 
    </View>
  );

};

export default ApiForgotPassword;

