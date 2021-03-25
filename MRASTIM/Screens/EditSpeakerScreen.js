import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, TextInput, Picker } from 'react-native';
import Subheading from "../Components/Subheading";
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';

function EditSpeaker({navigation, route}) {

    const {room, title, description, ustatus, userInfo, speakerID} = route.params;

    const adata = require("../services/apiconnection.json");

    const [message, setMessage] = useState("");

    const [initroomname, setinitroomname] = useState("");

    const [roomsArray, setRoomsArray] = useState([]);
    const [getroom, setroom] = useState();

    const [status,setStatus] = useState(ustatus);
    const [roomname, setRoomname] = useState("-");
    const [getDescription, setDescription] = useState(description);
    const [speakerName, setSpeakerName] = useState(title);
    const [active, setActive] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const [isValid, setValid] = useState(false);

    useEffect(() => initialize(room),[]);

    function removeSpeaker(){
        fetch(adata.apiBaseUrl+'/speaker/'+speakerID, {
            method: 'DELETE',
            headers: {
              'Authorization': "Bearer "+userInfo.access_token
            }
          })
          .then(() => navigation.navigate("SpeakerOverview"))
          .catch((error) => console.error(error))
    }

    return (
        <SafeAreaView style={styles.overall}>
            <View style={{alignSelf: "flex-start", paddingLeft: 20, marginBottom: 24}}>    
                <NButton elev={5} size={40} props={navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
              </View>
            <View style={styles.row}>
                <MaterialIcons name = "speaker" size={105} style={styles.image}></MaterialIcons>
                <View>
                    <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
                    <Subheading>{description}</Subheading>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.desc}>
                    <Text style={styles.settingBez}>Name: </Text>
                    <Text style={styles.settingBez}>Raum: </Text>
                    <Text style={styles.settingBez}>Descr.: </Text>
                    <Text style={styles.settingBez}>Status: </Text>
                </View>

                {isLoading ? <Text>Loading...</Text> : (
                <View style={styles.desc}>
                    <View><TextInput style={styles.settingVal} placeholder={title} onChangeText={text=>setSpeakerName(text)}/></View>
                    <View>
                    <Picker selectedValue={getroom} style={{height: 40, width: 180}}onValueChange={(itemValue, itemIndex)=>setroom(itemValue)}>
                        {roomsArray.map((item)=>(<Picker.Item label={item.name} value={item}/>))}
                    </Picker>
                    </View>
                    <View><TextInput style={styles.settingVal} placeholder={description} onChangeText={text=>setDescription(text)}/></View>
                    <View><Text style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: active ? "green" : "red",
                    }}>{status}</Text></View>
                </View>   
                )}
            
            </View>
            <View style={{paddingTop: 50, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: "bold", color: colors.black, paddingBottom: 5}}>{message}</Text>
                <AppButton title="Save Settings" onPress={()=>saveSettings()}/>
                <View style={{paddingTop: 5}}/>
                <AppButton title="Remove Speaker" onPress={()=>removeSpeaker()}/>
            </View>
        </SafeAreaView>
    );

    function initialize(roomID){
        getRooms();
        getRoomByID(roomID);
        checkActive();
    }

    function checkActive(){
        if(ustatus=="In Use"||ustatus=="Inactive"){
            setActive(false);
        }else{setActive(true)}
    }

    function saveSettings(){
        fetch(adata.apiBaseUrl+'/speaker', {
            method: 'PATCH',
            headers: {
              'Authorization': "Bearer "+userInfo.access_token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": speakerID,
                "name": speakerName,
                "description": getDescription,
                "position": {
                    "x": 1,
                    "y": 1
                },
                "room_id": getroom.id
            })
          })
    
          .then((response) => response.json())
          .then((json)=>checkSave(json))
          .catch((error)=>console.log(error))  
    }

    function checkSave(jsonObject){
        console.log(room)
        if(jsonObject.description==getDescription){
            setMessage("Speaker updated successfully")
        }else{
            setMessage("Sorry, something went wrong")
        }
    }

    function getRooms(){
        fetch(adata.apiBaseUrl+'/room', {
          method: 'GET',
          headers: {
            'Authorization': "Bearer "+userInfo.access_token
          }
        })
        .then((response) => response.json())
        .then((json) => setRoomsArray(json.rooms))
        .catch((error) => console.error(error))
      }

    function getRoomByID(roomID){

        fetch(adata.apiBaseUrl+'/room/'+roomID, {
        method: 'GET',
     
        headers: {
          'Authorization': "Bearer "+userInfo.access_token
        }
      })

      .then((response) => response.json())
      .then((json)=>saveRoomName(json))
      .catch((error)=>console.log(error))
      .finally(setLoading(false))
    }

    function saveRoomName(jsonObject){
        setRoomname(jsonObject.name)
        setinitroomname(jsonObject.name);
    }

    function saveGroupName(jsonObject){
        setGroupName(jsonObject.name);
    }
}

const styles = StyleSheet.create({
    desc:{
        paddingTop: 30,
        paddingLeft: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundColor
      },
    titleText:{
        fontSize : 40,
        fontWeight : "bold",
        color: "teal"
    },

    settingBez:{
        fontSize: 30,
        fontWeight: "bold"
    },

    settingVal:{
        fontSize: 30,
        fontWeight: "bold",
        color: colors.grey
    },

    overall:{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        backgroundColor: colors.backgroundColor,
        flex: 1
    },

    row:{
        alignItems: "center",
        flexDirection: "row"
    },
    background:{
        flex: 1
    }

})

export default EditSpeaker;
