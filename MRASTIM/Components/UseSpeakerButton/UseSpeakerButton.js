import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import colors from "../colors";
import styles from "../styles";

function UseSpeakerButton({size, children, elev, props, speakerID, navigation}) {

    const goBackFunc = () =>{
        setIsPress(true)
        navigation.goBack()
        console.log("usespeaker")
    }

    var [ isPress, setIsPress ] = React.useState(false);
    var touchProperties = {
      activeOpacity: 1,
      onPress: () => goBackFunc()
    }

    var touchprops = {
        activeOpacity: 1,
        underlayColor: colors.backgroundColor,
        setIsPress: false,
        onPress: () => goBackFunc(),
        style: isPress? [customstyles.buttonstyle, {width: 340, height: 50, borderRadius: 10, elevation: 0 }] : [customstyles.buttonstyle, {width: 340, height: 50, borderRadius: 10, elevation: 5 }]
    }

    return(
        <TouchableWithoutFeedback {...touchProperties}>
                <View style={{width: 340, height: 50, borderRadius: 10}}>
                    <View {...touchprops}>{children}</View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const customstyles = StyleSheet.create({
    buttonstyle:{
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#E2ECFD",
        borderWidth: 1,
        alignSelf: 'flex-start',
    }
})

export default UseSpeakerButton;