import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from "../colors";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function CardDeleteAction({onPress}) {
    return( 
        <TouchableWithoutFeedback onPress={onPress} style={styles.touchable}>
            <View style={styles.container}>
                <MaterialCommunityIcons name = "trash-can" size ={34} color={colors.white}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.delete,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
    },
    touchable:{
        paddingTop: 28
    }
})
export default CardDeleteAction;