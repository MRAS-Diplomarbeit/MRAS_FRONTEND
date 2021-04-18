import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, Picker } from 'react-native';
import Subheading from "../Components/Subheading";
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';

function SpeakerDetails({navigation, route}) {

    const {room, title, description, userInfo, speakerID} = route.params;

    const adata = require("../services/apiconnection.json")

    const [methods, setMethods] = useState([]);

    const [message, setMessage] = useState("");

    const [status,setStatus] = useState("");
    const [active, setactive] = useState(false);
    const [roomname, setRoomname] = useState("roomname");
    const [groupname, setGroupName] = useState("");
    const [isValid, setValid] = useState(false);
    const [playbackMethod, setPlaybackMethod] = useState("bcm2835 Headphones");

    useEffect(() => initialize(room),[]);

    function initialize(roomID){
        getRoomByID(roomID);
        getPlaybackMethods();
        checkIfIsActive();
    }


    function getPlaybackMethods(){
        fetch(adata.apiBaseUrl+'/speaker/'+speakerID+'/playback/method', {
            method: 'GET',
         
            headers: {
              'Authorization': "Bearer "+userInfo.access_token
            }
          })
    
          .then((response) => response.json())
          .then((json) => savePlaybackMethods(json))
    }

    function savePlaybackMethods(jsonObject){
        if(jsonObject.methods!=null){
            jsonObject.methods.map((item)=>methods.push(item))
        }else{
            setMessage("Could not load methods")
        }
    }

    function checkIfIsActive(){
        fetch(adata.apiBaseUrl+'/speaker/'+speakerID+'/active', {
            method: 'GET',
         
            headers: {
              'Authorization': "Bearer "+userInfo.access_token
            }
    
          })
    
          .then((response) => response.json())
          .then((json) => saveActive(json))
    }

    function saveActive(jsonObject){
        if(jsonObject.active=="inactive"){
            setStatus("Inactive")
            setactive(false)
        }else if(jsonObject.active=="active"){
            setStatus("Active")
            setactive(true)
        }else if(jsonObject.active=="inuse"){
            setStatus("In Use")
        }else{
            setStatus("Could not load status")
            setactive(false)
        }
    }



    const changeStatus = () =>{
        
      }

      const handleSelection = (itemValue) => {
        setPlaybackMethod(itemValue);
        setValid(true);

        fetch(adata.apiBaseUrl+'/speaker/'+speakerID+'/playback/method', {
            method: 'POST',
         
            headers: {
              'Authorization': "Bearer "+userInfo.access_token,
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "method": playbackMethod
            })
    
          })
    
          .then(()=>setMessage("Playback-Method set"))
          .catch((error)=>setMessage("Sorry, something went wrong"))
      }


    function useSpeaker(){
        if(!active){


        }else{

            

        }

        setactive(!active)
        if(active){
            setStatus("Inactive")
        }else{
            setStatus("Active")
        }
        
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
    }

    function saveRoomName(jsonObject){
        setRoomname(jsonObject.name)
    }

    function saveGroupName(jsonObject){
        setGroupName(jsonObject.name);
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

            <View style={styles.desc}>
                <View style={styles.row}>
                    <Text style={styles.settingBez}>Raum: </Text>
                    <View style={{paddingLeft: 18}}><Text style={styles.settingVal}>{roomname}</Text></View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.settingBez}>Status: </Text>
                    <View style={{paddingLeft: 14}}>
                        <Text style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: active ? "green" : "red",
                        paddingLeft: 15
                    }}>{status}</Text>
                    </View>
                </View>
                <View>
                    <Picker selectedValue={playbackMethod} style={{height: 50, width: 250}} mode="dialog"
                    onValueChange={(itemValue)=>handleSelection(itemValue)}>
                        {methods.map((item) => (<Picker.Item label={item} value={item} key={item}/>))}
                    </Picker>
                </View>
            </View>
            <View style={{paddingTop: 75}}>
                <Text style={{fontWeight: 'bold'}}>{message}</Text>
                <AppButton title={active ? "Stop Speaker" : "Use Speaker"} onPress={()=>useSpeaker()}/>
            </View>
            <View style={{paddingTop: 5}}>
                <AppButton title="Edit Speaker" onPress={()=>navigation.navigate("EditSpeaker", {room: room, title: title, description: description, navigation: navigation, userInfo: userInfo, ustatus: status, speakerID: speakerID})}/>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    desc:{
        paddingTop: 30,
        paddingLeft: 25
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
        fontSize: 25,
        fontWeight: "bold",
        color: colors.grey,
        paddingLeft: 15
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

export default SpeakerDetails;
