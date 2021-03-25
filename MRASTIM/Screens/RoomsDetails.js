import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, ImageBackground } from 'react-native';
import Subheading from "../Components/Subheading";
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';

function RoomsDetails(props) {

    const {roomname, description, userInfo, roomid, room} = props.route.params;

    const [status,setStatus] = useState("");

    const [active, setactive] = useState(false)

    const adata = require("../services/apiconnection.json");

    useEffect(()=>initialize(),[]);

    function initialize(){
        checkIfActive();
        console.log(room);

    }

    function checkIfActive(){
        fetch(adata.apiBaseUrl+'/room/'+roomid+'/active', {
            method: 'GET',
            headers: {
              'Authorization': "Bearer "+userInfo.access_token
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


    return (
        <SafeAreaView style={styles.overall}>
            <View style={{alignSelf: "flex-start", paddingLeft: 20, marginBottom: 24}}>    
                <NButton elev={5} size={40} props={props.navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
              </View>
            <View style={styles.row}>
                <MaterialIcons name = "speaker" size={105} style={styles.image}></MaterialIcons>
                <View>
                    <Text numberOfLines={1} style={styles.titleText}>{roomname}</Text>
                    <Subheading>{description}</Subheading>
                </View>
            </View>

            <View style={styles.desc}>
                <View style={styles.row}>
                    <Text style={styles.settingBez}>Status: </Text>
                    <Text style={{  fontSize: 25,
                                    fontWeight: "bold",
                                    color: active ? "green" : "red",
                                    paddingLeft: 15}}>
                                {status}</Text>
                </View>

                <View style={{paddingTop: 60, paddingRight: 20}}>
                <AppButton title="Use Room" onPress={()=>console.log("UseRoom")}/>
                <View style={{paddingTop: 5, paddingRight: 20}}/>
                <AppButton title="Edit Room" onPress={()=>editRoom()}/>
                </View>
            </View>
        </SafeAreaView>
    );

    function editRoom(){
        props.navigation.navigate("EditRoomScreen", {userInfo: userInfo, room: room});
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

export default RoomsDetails;
