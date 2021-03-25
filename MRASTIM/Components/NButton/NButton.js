import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import colors from "../colors";
import styles from "../styles";

function NButton({size, children, elev, props}) {

    const goBackFunc = () =>{
        setIsPress(true)
        try {
            props.navigation.goBack()
        } catch (error) {
            console.log("Navigationsobjekt direkt übergeben")
            props.goBack()
        }
        
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
        style: isPress? [customstyles.buttonstyle, {width: size || 40, height: size || 40, borderRadius: size / 2 || 40 / 2, elevation: 0 }] : [customstyles.buttonstyle, {width: size || 40, height: size || 40, borderRadius: size / 2 || 40 / 2, elevation: 5 }]
    }

    return(
        <TouchableWithoutFeedback {...touchProperties}>
                <View style={{width: size || 40, height: size || 40, borderRadius: size / 2 || 40 / 2}}>
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

export default NButton;