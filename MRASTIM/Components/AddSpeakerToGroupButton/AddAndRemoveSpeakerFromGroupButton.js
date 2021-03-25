import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import colors from "../colors";
import styles from "../styles";

function AddSpeakerToGroupButton({children, props, speakerID, addOrRemove, navigation, groupname, description}) {

    const addOrRemoveFunc = () =>{
        setIsPress(true)
        if(addOrRemove=="add"){
            console.log("add speaker")
            navigation.navigate("AddSpeakerToGroup", {groupname: groupname, description: description})
        }else{
            console.log("remove speaker")
            navigation.goBack()
            navigation.navigate("Speaker")
        }
    }

    var [ isPress, setIsPress ] = React.useState(false);
    var touchProperties = {
      activeOpacity: 1,
      onPress: () => addOrRemoveFunc()
    }

    var touchprops = {
        activeOpacity: 1,
        underlayColor: colors.backgroundColor,
        setIsPress: false,
        onPress: () => addOrRemoveFunc(),
        style: isPress? [customstyles.buttonstyle, {width: 168, height: 50, borderRadius: 10, elevation: 0 }] : [customstyles.buttonstyle, {width: 168, height: 50, borderRadius: 10, elevation: 5 }]
    }

    return(
        <TouchableWithoutFeedback {...touchProperties}>
                <View style={{width: 168, height: 50, borderRadius: 10}}>
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

export default AddSpeakerToGroupButton;