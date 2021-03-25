import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, Dimensions} from "react-native";
import colors from '../Components/colors';
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons';


const screenWidth = Math.round(Dimensions.get('window').width);

export default function NowPlayingScreen(){

    const NMTop = ({children, size, style})=>{
        return(
            <View style={[styles.inner,{width: size || 40, height: size || 40, borderRadius: size / 2 || 40 / 2, elevation: 5}]}>{children}</View>
        );
    };

    const NMBot = ({children, size, style})=>{
        return(
            <View style={[styles.inner,{width: size || 60, height: size || 60, borderRadius: size / 2 || 60 / 2, elevation: 5}]}>{children}</View>
        );
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignSelf: "stretch"}}>
                <View style={{marginHorizontal: 32, marginTop: 48}}>
                    <View style={styles.topContainer}>
                        <NMTop><AntDesign name = "arrowleft" size={20} color={colors.gray}/></NMTop>
                        <View>
                            <Text style = {styles.playing}>Now Playing</Text>
                        </View>
                        <NMTop><Entypo name="menu" size={24} color={colors.gray}/></NMTop>
                    </View>
                    <Image style={styles.picContainer} source={require('../assets/nowplayingpicture.png')}/> 
                    <View style={styles.footer}>
                    <NMBot><AntDesign name = "stepbackward" size={30} color={colors.gray}/></NMBot>
                    <NMBot><AntDesign name = "play" size={30} color={colors.gray}/></NMBot>
                    <NMBot><AntDesign name = "stepforward" size={30} color={colors.gray}/></NMBot>
                </View>
                </View>
                
                
            </SafeAreaView>
                 
        </View>
    );
}

const styles = StyleSheet.create({
    footer:{
        marginLeft: 32,
        marginRight: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: -50
    },
    playing: {
        fontSize: 22,
        ...Platform.select({ios: {fontFamily: "Avenir"},android: {fontFamily: "Roboto"}}),
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center"
    },
    picContainer:{
        marginTop: -30,
        width: screenWidth-64,
        resizeMode: "contain"
    },

    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inner:{
        backgroundColor: "#DEE9F7",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#E2ECFD",
        borderWidth: 1
    },
});