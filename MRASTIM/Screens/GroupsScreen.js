import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Alert } from 'react-native';
import styles from "../Components/styles";
import Screen from './Screen';
import GroupCard from '../Components/GroupCard';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../Components/Buttons/AppButton';


function GroupsScreen(props) {
    
    const navigation = useNavigation();
    useEffect(() => getRooms(), []);

    const [speakers, setSpeakers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [roomArray, setRoomArray] = useState();
    

    const handleDelete = speaker => {
        setSpeakers(speakers.filter(s => s.id !== speaker.id));
    }

    const deleteAbfrage = speaker => {
        Alert.alert("Delete", "Wollen Sie " + speaker.title + " wirklich entfernen?", [
            {text: "Ja", onPress: () => handleDelete(speaker)},
            {text: "Nein"}
            ])
    }

    const getRooms=()=>{
        const adata = require("../services/apiconnection.json");

        fetch(adata.apiBaseUrl+'/group/speaker', {
        method: 'GET',
     
        headers: {
          'Authorization': "Bearer "+props.userInfo.access_token
        }

      })

      .then((response) => response.json())
      .then((json) => saveRooms(json))
      .catch((error) => console.error(error))
      .finally(checkLoading())
    }

    function checkLoading(){
        setLoading(false);
    }

    function saveRooms(jsonObject){
        setRoomArray(jsonObject.groups);
        setTimeout(()=> 10)
        console.log(jsonObject.groups);
    }

    return (
            <Screen style={{padding: 20, paddingTop: 40}}>
                <View style={styles.container}>
                {isLoading ? <Text>loading</Text> : (
                <FlatList 
                    data={roomArray}
                    renderItem={({item}) => (
                        <GroupCard 
                            activeorinactive = {"ia"}
                            title = {item.name} 
                            description = {item.description} 
                            room = {item.room} 
                            onPress={() => navigation.navigate("GroupsDetails", {groupname: item.name, groupid: item.id, userInfo: props.userInfo, speakerids: item.speaker_ids, speakergroup: item})}
                            //renderRightActions={() => (<CardDeleteAction onPress={() => deleteAbfrage(item)}/>)}
                        />
                    )
                }
                refreshing={refreshing}
                onRefresh={() => getRooms()}
            />
            )}
            <View style={{paddingLeft: 1, paddingBottom: 10}}>
                <AppButton title="Add New Group" onPress={()=>navigation.navigate("AddNewGroup", {userInfo: props.userInfo, navigation: navigation})}/>
            </View>
            </View>
            </Screen>
        
    );
}

export default GroupsScreen;