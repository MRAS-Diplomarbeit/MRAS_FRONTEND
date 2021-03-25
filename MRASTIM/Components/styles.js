import { StyleSheet, Platform } from 'react-native';
import colors from "./colors";


const styles = StyleSheet.create({
    text:{
        ...Platform.select({ios: {fontFamily: "Avenir"},android: {fontFamily: "Roboto"}}),
        fontSize : 30,
        fontWeight : "bold",
        color: "black"
    },
    buttonText:{
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.black
    },
    item:{
      fontSize: 18,
      color: colors.grey
    },
    inner:{
      backgroundColor: colors.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#E2ECFD",
      borderWidth: 1
    },
    frontpageheading:{
        ...Platform.select({ios: {fontFamily: "Avenir"},android: {fontFamily: "Roboto"}}),
        fontSize : 30,
        fontWeight : "bold",
        color: colors.black
    },
    frontpageheadinggray:{
      ...Platform.select({ios: {fontFamily: "Avenir"},android: {fontFamily: "Roboto"}}),
      fontSize : 30,
      fontWeight : "bold",
      color: colors.grey
  },
    subheading:{
        ...Platform.select({ios: {fontFamily: "Avenir"},android: {fontFamily: "Roboto"}}),
        fontSize: 20,
        color: "black",
        marginRight: 10,
    },

    background:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    titleText:{
        fontSize : 25,
        fontWeight : "bold",
        color: "teal",
        
      },
    
      loginButton:{
        color:"dodgerblue",
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      
      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundColor
      },
      resLogButton: {
        backgroundColor: 'dodgerblue',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%'
    },
    resLogButtonText:{
       color: '#fff',
       fontSize: 18,
       textTransform: 'uppercase',
       fontWeight: 'bold'
    },
    textInput: {
      color: colors.grey,
      fontSize: 24,
      textAlign: "center"
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  }
});

export default styles;