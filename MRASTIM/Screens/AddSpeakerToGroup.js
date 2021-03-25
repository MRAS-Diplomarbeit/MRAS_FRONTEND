import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, Picker, FlatList, TextInput } from 'react-native';
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';


function AddSpeakerToGroup(props) {

    const adata = require("../services/apiconnection.json");

    const {groupname, speakerArray, groupid, userInfo} = props.route.params;
    const [speaker,setSpeaker] = useState(null);
    const [getAllSpeakers, setAllSpeakers] = useState([]);

    const [message, setMessage] = useState("");

    const [newgroupname, setGroupName] = useState(groupname);

    const [speakerWithPermission, setSpeakerWithPermission] = useState([]);
    const [speakerRemovePermission, setSpeakerRemovePermission] = useState([]);

    const [speakerisLoading, speakersetLoading] = useState(true);

    useEffect(()=>initialize(),[]);

    function initialize(){
        getSpeakers();
        setSpeakerWithPermission([]);
        speakerArray.map((item)=>speakerWithPermission.push(item.id));
    }

    function getSpeakers(){
        fetch(adata.apiBaseUrl+'/speaker', {
            method: 'GET',
            headers: {
              'Authorization': "Bearer "+userInfo.access_token
            }
          })
          .then((response) => response.json())
          .then((json) => setAllSpeakers(json.speakers))
          .catch((error) => console.error(error))
          .finally(speakersetLoading(false))

    }

    function deleteGroup(){
        console.log(groupid)
        console.log(userInfo.access_token)
        fetch(adata.apiBaseUrl+'/group/speaker/'+groupid, {
            method: 'DELETE',
            headers: {
              'Authorization': "Bearer "+userInfo.access_token
            }
          })
          .then(() => checkDeleteResponse())
          .catch((error) => console.error(error))
    }

    function checkDeleteResponse(){
        props.navigation.navigate("GroupsOverview");
    }

    function SaveNewName(){
        if(newgroupname==null||newgroupname==""){
            setMessage("Please enter a valid name")
        }else{
            fetch(adata.apiBaseUrl+'/group/speaker/'+groupid, {
                method: 'PATCH',
                headers: {
                  'Authorization': "Bearer "+userInfo.access_token,
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                       "id": groupid,
                       "name": newgroupname,
                       "speaker_ids": speakerWithPermission
                })
              })
              .then((response)=>response.json())
              .then((json)=>checkNewName(json))
        }
    }

    function checkNewName(jsonObject){
        if(newgroupname==jsonObject.name){
            setMessage("Name updated successfully")
        }else{
            setMessage("Sorry something went wrong")
        }
    }

    function AddSpeakerToGroup(){
        console.log("Add Speaker")
        if(speaker==null){
            setMessage("Please select a speaker")
        }else{
            speakerWithPermission.push(speaker);

            fetch(adata.apiBaseUrl+'/group/speaker/'+groupid, {
                method: 'PATCH',
                headers: {
                  'Authorization': "Bearer "+userInfo.access_token,
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                       "id": groupid,
                       "name": groupname,
                       "speaker_ids": speakerWithPermission
                })
              })
              .then((response)=>response.json())
              .then((json)=>setAddMessage(json))
        }
    }

    function setAddMessage(jsonObject){
        if(jsonObject.id!=null){
            setMessage("Speaker added successfully")
        }else{
            setMessage("Sorry, something went wrong")
        }
    }

    function RemoveSpeakerFromGroup(){
        if(speaker==null){
            setMessage("Please select a speaker")
        }else{

            speakerArray.map((item)=>{
                if(item.id!=speaker){
                    speakerRemovePermission.push(item.id);
                }
            })

            console.log(speakerRemovePermission)

            fetch(adata.apiBaseUrl+'/group/speaker/'+props.route.params.groupid, {
                method: 'PATCH',
                headers: {
                  'Authorization': "Bearer "+props.route.params.userInfo.access_token,
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                       "id": groupid,
                       "name": props.route.params.groupname,
                       "speaker_ids": speakerRemovePermission
                })
              })
              .then((response)=>response.json())
              .then((json)=>setRemoveMessage(json))
            
            setSpeakerRemovePermission([])
            
        }
    }

    function setRemoveMessage(jsonObject){
        if(jsonObject.id!=null){
            setMessage("Speaker removed successfully")
        }else{
            setMessage("Sorry, something went wrong")
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
                    <TextInput style={styles.titleText} placeholder={groupname} onChangeText={text=>setGroupName(text)}/>
                </View>
            </View>
            <View style={{paddingBottom: 20, paddingLeft: 20}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Speakers in Group:</Text>
             <FlatList data={speakerArray.map((item)=>({key:item.name}))}
                renderItem={({item}) => <Text style={styles.flatlistSpeakers}>{item.key}</Text>}/>
            </View>
            
            <View style={{paddingLeft: 20, paddingRight: 20}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Select Speaker:</Text>
                {speakerisLoading ? <Text>Loading...</Text> : (
                <Picker selectedValue={speaker} style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex)=>setSpeaker(itemValue)}>
                    {getAllSpeakers.map((item)=>(
                        <Picker.Item label={item.name} value={item.id}/>
                    ))}
                </Picker>
            )}
                </View>

            <View style={styles.desc}>
                
                <View style={{paddingRight: 15, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{message}</Text>
                    <View style={{paddingTop: 5}}/>
                    <AppButton title="Add Speaker" onPress={()=>AddSpeakerToGroup()}/>
                    <View style={{paddingTop: 5}}/>
                    <AppButton title="Remove Speaker" onPress={()=>RemoveSpeakerFromGroup()}/>
                    <View style={{paddingTop: 5}}/>
                    <AppButton title="Update Name" onPress={()=>SaveNewName()}/>
                    <View style={{paddingTop: 5}}/>
                    <AppButton title="Delete Group" onPress={()=>deleteGroup()}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    desc:{
        paddingTop: 10,
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

export default AddSpeakerToGroup;
