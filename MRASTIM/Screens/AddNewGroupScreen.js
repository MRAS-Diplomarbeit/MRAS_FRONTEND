import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Platform, View, Text, Picker, FlatList, TextInput } from 'react-native';
import NButton from "../Components/NButton";
import {AntDesign} from "@expo/vector-icons";
import colors from "../Components/colors";
import { useState, useEffect } from 'react';
import AppButton from '../Components/Buttons/AppButton';


function AddNewGroupScreen(props) {

    const adata = require("../services/apiconnection.json");

    const {userInfo, navigation} = props.route.params;

    const [groupname, setGroupname] = useState("");
    const [message, setMessage] = useState("");

    function AddNewGroup(){
        if(groupname!=null||groupname!=""){
        fetch(adata.apiBaseUrl+'/group/speaker', {
            method: 'POST',
            headers: {
              'Authorization': "Bearer "+userInfo.access_token,
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "name": groupname,
                "speaker_ids": []
            })
    
          })
    
          .then((response) => response.json())
          .then((json) => checkResponse(json))
          .catch((error) => console.error(error))
        }
    }

    function checkResponse(jsonObject){
        console.log(jsonObject);
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.overall}>
            <View style={{alignSelf: "flex-start", paddingLeft: 20, marginBottom: 24}}>    
                <NButton elev={5} size={40} props={navigation}><AntDesign name = "arrowleft" size={20} color={colors.grey}/></NButton>
              </View>
            <View style={styles.row}>
                <MaterialIcons name = "speaker" size={105} style={styles.image}></MaterialIcons>
                <View>
                    <TextInput style={styles.titleText} placeholder={"Groupname"} onChangeText={text=>setGroupname(text)}/>
                </View>
            </View>
            <View style={styles.desc}>
                
                <View style={{paddingRight: 15, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{message}</Text>
                    <View style={{paddingTop: 5}}/>
                    <AppButton title="Add new group" onPress={()=>AddNewGroup()}/>
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

export default AddNewGroupScreen;
