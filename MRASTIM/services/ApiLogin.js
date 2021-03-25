import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Crypto from 'expo-crypto';


export const ApiLogin = (props) => {

    


  const [isLoading, setLoading] = useState(true);
  const [isNotOk, setNotOk] = useState(true);
  const [data, setData] = useState([]);

   


  useEffect(() => {

    const apidata = require("./apiconnection.json");

      (async () => {
        const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,props.route.params.UserDetail.password);
        console.log('Digest: ', digest);
  
       console.log(props.route.params.UserDetail);
  
       await fetch(apidata.apiBaseUrl+'/user/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
  
      },
           body: JSON.stringify({
  
               "username": props.route.params.UserDetail.userName,
               "password": digest,
               "device_id": "<strfjfdlkjfdkjfjlkdlkjing>"
           })
       })
        .then((response) => response.json())
        .then((json) => checkData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  
  
      })();

  }, []);

  return (

   
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : (isNotOk ? ( props.navigation.navigate("Login")) : (props.navigation.navigate("Home",{userData: data})))} 
    </View>
  );

  function checkData  (jsonObject){

    //console.log(jsonObject);

    if(jsonObject.code != null) 
    {
        setNotOk(true);
        setData(jsonObject);
    }else{
        setNotOk(false);
        setData(jsonObject);
       // storeUserData(jsonObject);
    }
}

};

export default ApiLogin;

const storeUserData = async (userObject) =>{
  try {
    const jsonValue = JSON.stringify(userObject)
    await AsyncStorage.setItem('userKey', jsonValue);
  } catch (e) {
    console.log(e);
  }
} 
 