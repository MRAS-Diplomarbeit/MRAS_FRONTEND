import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../colors'
import TextAnimator from "../TextAnimator";

function StartAnimation() {
    return (
        <View style={styles.container}>
            <TextAnimator content='Multiroom' textStyle={styles.textStyle} style={styles.containerstyle}/>
            <TextAnimator content='Audio Software' textStyle={styles.textStyle} style={styles.containerstyle}/>
            <Image fadeDuration={2500} source={require('./logo2.png')}/>
        </View>
        
    );
}
const styles = StyleSheet.create({
    containerstyle:{

    },

    container:{
        flex: 0.5,
        paddingTop: '20%',
        backgroundColor: colors.backgroundColor,
        alignItems: 'center'
    },

    textStyle:{
        fontSize: 32,
        fontWeight: 'bold',
        ...Platform.select({ios: {fontFamily: "Avenir"},android: {fontFamily: "Roboto"}})
    }
})

/*
<Card 
    title = {item.title} 
    describtion = {item.describtion} 
    room = {item.room} 
    onPress={() => console.log()}
    renderRightActions={() => (<CardDeleteAction onPress={() => deleteAbfrage(item)}/>
        )}
    />
*/

export default StartAnimation;