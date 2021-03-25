import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, Picker, FlatList, TextInput } from 'react-native';
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';


function EditRoomScreen(props) {

    const {room, userInfo} = props.route.params;

    const [roomname, setRoomname] = useState(room.name);

    const [description, setDescription] = useState(room.description);

    const adata = require("../services/apiconnection.json");

    const [message, setMessage] = useState("");


    useEffect(()=>initialize(),[]);

    function initialize(){
      console.log(props)
    }


    function updateRoom(){

        fetch(adata.apiBaseUrl+'/room/'+room.id, {
            method: 'PATCH',
            headers: {
                'Authorization': "Bearer "+userInfo.access_token,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                    "id": room.id,
                    "name": roomname,
                    "description": description,
                    "dimensions": {
                        "height": 1,
                        "width": 1
                        }
                })
            })
            .then((response)=>response.json())
            .then((json)=>setUpdateMessage(json))
        }

        function setUpdateMessage(jsonObject){
            props.navigation.navigate("RoomsOverview");
        }

        function deleteRoom(){
            fetch(adata.apiBaseUrl+'/room/'+room.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': "Bearer "+userInfo.access_token,
                    'Content-Type': "application/json"

                }
               })
            .then((response)=>response.json())
            .then((json)=>setDeleteMessage(json))
            .catch((error)=>props.navigation.navigate("RoomsOverview"))
        }

        function setDeleteMessage(jsonObject){
            props.navigation.goBack();
        }
    
    return (
        <SafeAreaView style={styles.overall}>
            <View style={{alignSelf: "flex-start", paddingLeft: 20, marginBottom: 24}}>    
                <NButton elev={5} size={40} props={props.navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
              </View>
            <View style={styles.row}>
                <MaterialIcons name = "speaker" size={105} style={styles.image}></MaterialIcons>
                <View>
                    <TextInput style={styles.titleText} placeholder={room.name} onChangeText={text=>setRoomname(text)}/>
                    <TextInput style={styles.titleText} placeholder={room.description} onChangeText={text=>setDescription(text)}/>
                </View>
            </View>
            
            <View style={styles.desc}>
                
                <View style={{paddingRight: 15, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{message}</Text>
                    <View style={{paddingTop: 50}}/>
                    <AppButton title="Update Room" onPress={()=>updateRoom()}/>
                    <View style={{paddingTop: 5}}/>
                    <AppButton title="Delete Room" onPress={()=>deleteRoom()}/>
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

export default EditRoomScreen;
