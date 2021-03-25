import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Alert } from 'react-native';
import Card from "../Components/Card";
import styles from "../Components/styles";
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';



function ViewImageScreen(props) {

    const navigation = useNavigation();

    const adata = require("../services/apiconnection.json");

    useEffect(() => getSpeakers(), []);

    const [speakers, setSpeakers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isNotOk, setNotOk] = useState(true);
    const [data, setData] = useState([]);
    let roomnames = [];

    const handleDelete = speaker => {
        setSpeakers(speakers.filter(s => s.id !== speaker.id));
    }

    const deleteAbfrage = speaker => {
        Alert.alert("Delete", "Wollen Sie " + speaker.title + " wirklich entfernen?", [
            {text: "Ja", onPress: () => handleDelete(speaker)},
            {text: "Nein"}
            ])
    }


    const getSpeakers=()=>{

        fetch(adata.apiBaseUrl+'/speaker', {
        method: 'GET',
     
        headers: {
          'Authorization': "Bearer "+props.userInfo.access_token
        }

      })

      .then((response) => response.json())
      .then((json) => {
          checkData(json)
      })
      .catch((error) => console.error(error))
      .finally(setLoading(false))
    }

    return (
            <Screen style={{padding: 20, paddingTop: 40}}>
                {isLoading ? <Text>Loading...</Text> : (
                <View style={styles.container}>
                <FlatList 
                    data={speakers}
                    keyExtractor={speaker => speaker.id.toString()}
                    renderItem={({item}) => (
                        <Card 
                            title = {item.name} 
                            description = {item.description} 
                            room = {roomnames.length}
                            onPress={() => navigation.navigate("SpeakerDetails", {speakerID: item.id, room: item.room_id, title: item.name, description: item.description, navigation: navigation, userInfo: props.userInfo})}
                            //renderRightActions={() => (<CardDeleteAction onPress={() => deleteAbfrage(item)}/>)}
                        />
                    )
                }
                refreshing={refreshing}
                onRefresh={() => getSpeakers()}
            />
            </View>
        )}
            </Screen>
        
    );

    function saveRoomNames(jsonObject){
        console.log(jsonObject)
        try{
            if(jsonObject.code != null){
                setNotOk(true);
            }else{
                setNotOk(false);
                roomnames.push(jsonObject.name);
            }
        }catch(e){console.log(e)}
    }

    function checkData (jsonObject){
        console.log(jsonObject)
        try{
            if(jsonObject.code != null){
                setNotOk(true);
                setData(jsonObject);
            }else{
                setNotOk(false);
                setSpeakers(jsonObject.speakers);
            }
        }catch(e){console.log(e);}
    }
}

export default ViewImageScreen;