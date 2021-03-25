import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../colors'
import AppText from '../AppText';
import {MaterialIcons} from '@expo/vector-icons';
import Subheading from '../Subheading';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function GroupCard({title, description, room, onPress, renderRightActions, activeorinactive}) {                //renderLeftActions -> Bluetooth aktivieren
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.cardoverall}>
                    <MaterialIcons name = "menu" size={55}/>
                    <View style={styles.cardtop}>
                        <AppText>{title}</AppText>
                    </View>
                    {/* <Subheading>{activeorinactive}</Subheading> */}
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
        paddingRight: 90
    }
})

export default GroupCard;