
import React from 'react'
import {Image} from 'react-native'




function SplashScreen({navigation}) {
   
    return (
        <ImageBackground blurRadius={4} style={styles.background} source={require("../assets/hintergrund.jpg")}>
            <SafeAreaView style={styles.container}>
      
            <FrontPageHeading>Multiroom Audio Software</FrontPageHeading>
            <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
            <FrontPageHeading>MAS</FrontPageHeading>

            </SafeAreaView>
        </ImageBackground>
    );


    
}
export default SplashScreen;

    