import React, {useState, useEffect} from 'react';
import {Text, View, Image, SafeAreaView,Picker} from 'react-native';
import styles from "../Components/styles";
import { AntDesign } from '@expo/vector-icons';
import colors from '../Components/colors';
import NButton from '../Components/NButton';
import SearchByNameOrListButton from '../Components/SearchByNameOrListButton';


function SelectUserFromListScreen(props) {

    const [userID, setUserID] = useState("userID");
    const [isLoading, setLoading] = useState(true);
    const [isNotOk, setNotOk] = useState(true);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [isValid, setValid] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Please select an entry");


    useEffect(() => initialize(),[]);

    function initialize(){
      setValid(false);
      getUsers();
    }

    const getUsers=()=>{

      const adata = require("../services/apiconnection.json")

      fetch(adata.apiBaseUrl+'/user', {
        method: 'GET',

        headers: {
          'Authorization': "Bearer "+props.route.params.userInfo.access_token
        }})
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
          setUsers(jsonObject.users);
          console.log(users);
        }
      }catch(e){
        console.log(e);
      }
    }

    const handleSelection = (itemValue) => {
      setUserID(itemValue);
      setValid(true);
    }

  
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
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Please select an entry:</Text>
        {isLoading ? <Text>Loading...</Text>: (
          <View>
          <Picker
          selectedValue={userID} style={{height: 50, width: 150}} mode="dialog"
          onValueChange={(itemValue, itemIndex)=>handleSelection(itemValue)}>
            {users.map((item, key) => (
              <Picker.Item label={item.username} value={item.id} key={item.id}/>
            ))}
          </Picker>
          {isValid ?(
            <SearchByNameOrListButton nameOrList={"confirm"} props={props} ID={userID}><Text>Confirm</Text></SearchByNameOrListButton>
            ):<Text/>}
            </View>
            )}
        </View>


      </View>
    </SafeAreaView>


  );
}

export default SelectUserFromListScreen;

const tryToSearch = (username) =>{
    console.log("Search User");
}