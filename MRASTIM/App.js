import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import LoginNavigator from './routes/LoginNavigator';
import LoadService from './services/LoadService';




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


