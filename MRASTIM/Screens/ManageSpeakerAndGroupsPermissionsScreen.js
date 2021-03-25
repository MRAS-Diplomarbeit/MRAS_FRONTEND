import React from 'react';
import {Text, View, Image, SafeAreaView, Picker} from 'react-native';
import AppButton from '../Components/Buttons/AppButton';
import styles from "../Components/styles";
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Components/colors';
import NButton from '../Components/NButton';



function ManageSpeakerAndGroupsPermissionsScreen(props) {

    const [speaker, setSpeaker] = useState("speaker");
    const [group, setGroup] = useState("group");
    const [room, setRoom] = useState("room");

    const adata = require("../services/apiconnection.json");

    const [speakerArray, setSpeakerArray] = useState([]);
    const [groupsArray, setGroupsArray] = useState([]);
    const [roomsArray, setRoomsArray] = useState([]);

    const speakerPermissions = [];
    const groupsPermissions = [];
    const roomsPermissions = [];

    const [isAdmin, setAdmin] = useState(false);
    const [message, setMessage] = useState("");

    const [speakerisLoading, speakersetLoading] = useState(true);
    const [roomisLoading, roomsetLoading] = useState(true);
    const [groupisLoading, groupsetLoading] = useState(true);

    useEffect(()=>getGroupsRoomsSpeakers(),[]);

    function getGroupsRoomsSpeakers(){
      getSpeakers();
      getGroups();
      getRooms();
      getPermissions();
   //   console.log(props);
  }

  function getPermissions(){
    fetch(adata.apiBaseUrl+'/user/'+props.route.params.userID+'/permissions', {
      method: 'GET',
      headers: {
        'Authorization': "Bearer "+props.route.params.userInfo.access_token
      }
    })
    .then((response)=>response.json())
    .then((json)=>savePermissions(json))
  }

  function savePermissions(jsonObject){

    jsonObject.perms.room_ids.map((item)=>roomsPermissions.push(item))
    jsonObject.perms.speaker_ids.map((item)=>speakerPermissions.push(item))
    jsonObject.perms.speakergroup_ids.map((item)=>groupsPermissions.push(item))
    setAdmin(jsonObject.perms.admin)
  }

  function addSpeakerPermission(){
    speakerPermissions.push(speaker)
    console.log(props)
    updatePermissions();
  }

  function addGroupPermission(){
    groupsPermissions.push(group)
    updatePermissions();
  }

  function addRoomPermission(){
    roomsPermissions.push(room)
    updatePermissions();
  }

  function updatePermissions(){
    fetch(adata.apiBaseUrl+'/user/'+props.route.params.userID+'/permissions', {
      method: 'PATCH',
      headers: {
        'Authorization': "Bearer "+props.route.params.userInfo.access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "user_id": props.route.params.userID,
          "perms": {
              "admin": isAdmin,
              "canedit": false,
              "speaker_ids": speakerPermissions,
              "room_ids": roomsPermissions,
              "speakergroup_ids": groupsPermissions
        }
      })
    })
    .then((response) => response.json())
    .then((json)=>checkResponse(json))
    .catch((error) => console.error(error))
  }

  function checkResponse(jsonObject){
    if(jsonObject.code==null){
      setMessage("Permissions successfully updated!")
    }else{
      setMessage("Something went wront, please try again")
    }
  }

  function getGroups(){
    fetch(adata.apiBaseUrl+'/group/speaker', {
      method: 'GET',
      headers: {
        'Authorization': "Bearer "+props.route.params.userInfo.access_token
      }
    })
    .then((response) => response.json())
    .then((json) => setGroupsArray(json.groups))
    .catch((error) => console.error(error))
    .finally(groupsetLoading(false))
  }

  function getRooms(){
    fetch(adata.apiBaseUrl+'/room', {
      method: 'GET',
      headers: {
        'Authorization': "Bearer "+props.route.params.userInfo.access_token
      }
    })
    .then((response) => response.json())
    .then((json) => setRoomsArray(json.rooms))
    .catch((error) => console.error(error))
    .finally(roomsetLoading(false))
  }

  function getSpeakers(){
    fetch(adata.apiBaseUrl+'/speaker', {
      method: 'GET',
      headers: {
        'Authorization': "Bearer "+props.route.params.userInfo.access_token
      }
    })
    .then((response) => response.json())
    .then((json) => setSpeakerArray(json.speakers))
    .catch((error) => console.error(error))
    .finally(speakersetLoading(false))
}
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 40}}>
      <View style={{alignSelf: "flex-start", paddingLeft: 2, marginBottom: 12}}>    
          <NButton elev={5} size={40} props={props}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.frontpageheadinggray}>Multiroom Audio Software</Text>
          <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
          <Text style={styles.frontpageheadinggray}>MAS</Text>
        </View>
        <View style={{alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: 18}}>{message}</Text></View>
        <View style={{}}>
        <View style={{alignItems: 'center', paddingTop: 12}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Select Speaker</Text>
            {speakerisLoading ? <Text>loading</Text> : (
            <Picker selectedValue={speaker} style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex)=>setSpeaker(itemValue)}>
                {speakerArray.map((item)=>(
                    <Picker.Item label={item.name} value={item.id}/>
                ))}
            </Picker>
            )}
            <View>
              <AppButton title="Add Permission" onPress={()=>addSpeakerPermission()}/>
            </View>
        </View>
        <View style={{alignItems: 'center', paddingTop: 12}}>

            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Select Group</Text>

            {groupisLoading ? <Text>loading</Text> : (
            <Picker selectedValue={group} style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex)=>setGroup(itemValue)}>

              {groupsArray.map((item)=>(
                <Picker.Item label={item.name} value={item.id}/>
              ))}

            </Picker>
            )}
            <View>
              <AppButton title="Add Permission" onPress={()=> addGroupPermission()}/>
            </View>
        </View>
        <View style={{alignItems: 'center', paddingTop: 12}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Select Room</Text>

            {roomisLoading ? <Text>loading</Text> : (
            <Picker selectedValue={room} style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex)=>setRoom(itemValue)}>
                  {roomsArray.map((item)=>(
                    <Picker.Item label={item.name} value={item.id}/>
                ))}
            </Picker>
            )}
            <View>
              <AppButton title="Add Permission" onPress={()=> addRoomPermission()}/>
            </View>
        </View>
        </View>
      </View>
    </SafeAreaView>


  );
}

export default ManageSpeakerAndGroupsPermissionsScreen;