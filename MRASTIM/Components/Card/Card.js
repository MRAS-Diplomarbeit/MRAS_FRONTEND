import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors'
import AppText from '../AppText';
import {MaterialIcons} from '@expo/vector-icons';
import Subheading from '../Subheading';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function Card({title, description, room, onPress, renderRightActions}) {                //renderLeftActions -> Bluetooth aktivieren
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.cardoverall}>
                    <MaterialIcons name = "speaker" size={55}/>
                    <View style={styles.cardtop}>
                        <AppText>{title}</AppText>
                        <Subheading>{description}</Subheading>
                       {/*<Subheading style={{paddingLeft: "10"}}>Raum: {room}</Subheading>*/}
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}
const styles = StyleSheet.create({
    cardinner: {
        flexDirection: "column",
        alignItems: "center",
    },
    
    cardoverall:{
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 5,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        paddingLeft: 5,
        paddingRight: 120
    }
})

export default Card;