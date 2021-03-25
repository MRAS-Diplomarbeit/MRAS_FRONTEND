import * as React from 'react';
import { StyleSheet,Button, View, Text } from 'react-native';
import MainTabNavigator from '../routes/MainTabNavigator';




const HomeScreen = (props) => {
    return (
      <MainTabNavigator userInfo={props.route.params.userData}/>
      );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      borderBottomColor:'black',
      borderWidth:1, 
      padding: 10, 
      marginBottom: 5,
      marginTop: 5
    },
  });
  