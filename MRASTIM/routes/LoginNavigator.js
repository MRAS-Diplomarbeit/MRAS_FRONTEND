import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ApiLogin from '../services/ApiLogin';
import ApiRegister from '../services/ApiRegister';
import HomeScreen from '../Screens/HomeScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import ApiForgotPassword from '../services/ApiForgotPassword';
import ApiSendNewPassword from '../services/ApiSendNewPassword';
import SendNewPasswordScreen from '../Screens/SendNewPasswordScreen';
import ShowResetCode from '../Screens/ShowResetCode';





const Stack = createStackNavigator();

const LoginNavigator = () => (

    

<Stack.Navigator screenOptions={{headerShown: false}}>

    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="Register" component={RegisterScreen}/>
    <Stack.Screen name="ApiLogin" component={ApiLogin}/>
    <Stack.Screen name="ApiRegister" component={ApiRegister}/>
    <Stack.Screen name="ShowResetCode" component={ShowResetCode}/>
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
    <Stack.Screen name="ApiForgotPassword" component={ApiForgotPassword}/>
    <Stack.Screen name="ApiSendNewPassword" component={ApiSendNewPassword}/>
    <Stack.Screen name="SendNewPassword" component={SendNewPasswordScreen}/>
    
    <Stack.Screen name="Home" component={HomeScreen}/>
</Stack.Navigator>

);

export default LoginNavigator;   

