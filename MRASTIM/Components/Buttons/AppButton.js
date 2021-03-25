import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from "../colors";

function AppButton({title, onPress, color = colors.backgroundColor}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors.backgroundColor}]} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        borderColor: "#E2ECFD",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        elevation: 5
    },

    text:{
       color: colors.black,
       fontSize: 18,
       textTransform: 'uppercase',
       fontWeight: 'bold'
    }

})

export default AppButton;