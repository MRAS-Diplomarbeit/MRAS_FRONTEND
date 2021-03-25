import * as React from 'react';
import styles from "../Components/styles";
import StartAnimation from "../Components/StartAnimation";






   const FirstScreen = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>
        <StartAnimation/>
        <Text>Testtest</Text>
        </SafeAreaView>
   );
  }



export default FirstScreen;












