import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, ImageBackground, FlatList } from 'react-native';
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';

function SpeakerDetails(props) {

    const adata = require('../services/apiconnection.json');

    const {groupname, groupid, speakerids, speakergroup} = props.route.params;

    const [speakers, setspeakers] = useState([])

    const [active, setactive] = useState(false);

    const [status, setStatus] = useState("");

    const [isLoading, setLoading] = useState(true);

    useEffect(()=>initialize(),[])

    function initialize(){
        if(speakergroup.speaker_ids!=null){
            speakergroup.speaker_ids.map((id)=>getSpeakersByID(id));
        }
        checkIfSpeakerIsActive();
        console.log(speakergroup)
    }

    function checkIfSpeakerIsActive(){
        

        fetch(adata.apiBaseUrl+'/group/speaker/'+groupid+'/active', {
            method: 'GET',
            headers: {
              'Authorization': "Bearer "+props.route.params.userInfo.access_token
            }
          })
          .then((response)=>response.json())
          .then((json)=>saveStatus(json))

    }

    function saveStatus(jsonObject){
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

    function getSpeakersByID(id){
        fetch(adata.apiBaseUrl+'/speaker/'+id, {
            method: 'GET',
            headers: {
              'Authorization': "Bearer "+props.route.params.userInfo.access_token
            }
          })
          .then((response)=>response.json())
          .then((json)=>saveSpeaker(json))
          .catch((error)=>console.log(error))
          .finally(setLoading(false))
    }

    function saveSpeaker(jsonObject){
        speakers.push(jsonObject);
        console.log(jsonObject)
    }

    function useGroup(){
        if(!active){
        {/*fetch(adata.apiBaseUrl+'/group/speaker/'+groupid+'/playback', {
            method: 'POST',
         
            headers: {
              'Authorization': "Bearer "+userInfo.access_token,
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "displayname": groupname,
                "method": "bluetooth"
            })
          })
    
          .then((response) => response.json())
        .then((json)=>console.log(json))*/}
        }else{

        }
    }

    return (
        <SafeAreaView style={styles.overall}>
            <View style={{alignSelf: "flex-start", paddingLeft: 20, marginBottom: 24}}>    
                <NButton elev={5} size={40} props={props.navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
              </View>
            <View style={styles.row}>
                <MaterialIcons name = "speaker" size={105} style={styles.image}></MaterialIcons>
                <View>
                    <Text numberOfLines={1} style={styles.titleText}>{groupname}</Text>
                </View>
            </View>

            <View style={styles.desc}>
                <View style={styles.row}>
                    <Text style={styles.settingBez}>Status: </Text>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: active ? "green" : "red",
                        paddingLeft: 15
                    }}>{status}</Text>
                </View>

                <View style={{paddingTop: 100, paddingRight: 10}}>
                    <AppButton title="Edit Group" onPress={()=>editSpeakers()}/>
                    <View style={{paddingBottom: 5}}/>
                    <AppButton title="Use Group" onPress={()=>useGroup()}></AppButton>
                </View>
            </View>
        </SafeAreaView>
    );

    function editSpeakers(){
        props.navigation.navigate("AddSpeakerToGroup", {groupname: groupname, speakerArray: speakers, userInfo: props.route.params.userInfo, groupid: groupid})
    }
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
        paddingLeft: 15
    },

    flatlistSpeakers:{
        fontSize: 25,
        fontWeight: "bold",
        color: colors.grey,
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
