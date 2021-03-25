import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import LoginNavigator from './routes/LoginNavigator';
import LoadService from './services/LoadService';
import { StyleSheet, SafeAreaView, Platform, View, Text, ImageBackground } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';



export default class App extends React.Component{
  state = {
    loaded:false
  }
  constructor(){
    super();
    LoadService.load(v => this.setState({loaded: true}));
  }

  render(){
    return(
      <NavigationContainer>
        
         <LoginNavigator></LoginNavigator>
        
      </NavigationContainer>
    );
  }

}

/*
<LoginNavigator/>
*/


