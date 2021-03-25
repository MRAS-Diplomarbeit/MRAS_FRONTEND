import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import colors from "../colors";
import styles from "../styles";

function AddPermissionsSpeakerOrGroupButton({props, children, nameOrList, len, name, ID}) {

    const addOrRemoveFunc = () =>{
        setIsPress(true)
        if(nameOrList=="name"){
            console.log("search by ID");
            console.log("name: "+name);
            props.navigation.navigate("SearchByNameScreen");
        }else if(nameOrList=="list"){
            console.log("select from list")
            props.navigation.navigate("SelectUserFromListScreen");
        }else if(nameOrList=="confirm"){
            console.log("confirm");
            props.navigation.navigate("ManageSpeakerAndGroupsPermissionsScreen", {userID: ID, props: props});
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
        style: isPress? [customstyles.buttonstyle, {width: len || 168, height: 50, borderRadius: 10, elevation: 0 }] : [customstyles.buttonstyle, {width: len || 168, height: 50, borderRadius: 10, elevation: 5 }]
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

export default AddPermissionsSpeakerOrGroupButton;