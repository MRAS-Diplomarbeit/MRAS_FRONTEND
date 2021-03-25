import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground, SafeAreaView, TouchableHighlight, TouchableOpacity, View, Alert } from 'react-native';
//import CardDeleteAction from '../Components/CardDeleteAction';
import styles from "../Components/styles";
import Screen from './Screen';
import RoomsCard from '../Components/RoomsCard';
import {useNavigation} from '@react-navigation/native';
import AppButton from "../Components/Buttons/AppButton";


function RoomsOverview(props) {

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

        fetch(adata.apiBaseUrl+'/room', {
        method: 'GET',
     
        headers: {
          'Authorization': "Bearer "+props.userInfo.access_token
        }

      })

      .then((response) => response.json())
      .then((json) => saveRooms(json))
      .catch((error) => console.error(error))
      .then(()=>console.log(roomArray))
      .finally(checkLoading())
    }

    function checkLoading(){
        setLoading(false);
    }

    function saveRooms(jsonObject){
        setRoomArray(jsonObject.rooms);
        setTimeout(()=> 10)
        console.log(jsonObject.rooms);
    }

    return (
            <Screen style={{padding: 20, paddingTop: 40}}>
                <View style={styles.container}>
                <FlatList 
                    data={roomArray}
                    keyExtractor={speaker => speaker.id.toString()}
                    renderItem={({item}) => (
                        <RoomsCard
                            activeorinactive = {"ia"}
                            title = {item.name} 
                            description = {item.description} 
                            room = {item.room} 
                            onPress={() => navigation.navigate("RoomsDetails", {roomname: item.name, description: item.description, roomid: item.id, userInfo: props.userInfo, room: item})}
                            //renderRightActions={() => (<CardDeleteAction onPress={() => deleteAbfrage(item)}/>)}
                        />
                    )
                }
                refreshing={refreshing}
                onRefresh={() => getRooms()}
            />
            <View style={{paddingLeft: 1, paddingBottom: 10}}>
                <AppButton title="Add New Room" onPress={()=>navigation.navigate("AddNewRoom", {userInfo: props.userInfo, navigation: navigation})}/>
            </View>
            </View>
            </Screen>
        
    );
}

export default RoomsOverview;