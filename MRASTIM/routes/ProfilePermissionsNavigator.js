import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import SearchByNameOrList from '../Screens/SearchByNameOrList';
import SearchByNameScreen from "../Screens/SearchByNameScreen";
import SelectUserFromListScreen from "../Screens/SelectUserFromListScreen";
import ManageSpeakerAndGroupsPermissionsScreen from "../Screens/ManageSpeakerAndGroupsPermissionsScreen";

const Stack = createStackNavigator();

const ProfilePermissionsNavigator = (props) => (

<Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfileScreen" children={()=><ProfileScreen userInfo={props.userInfo}/>}/>
    <Stack.Screen name="SearchByNameOrList" component={SearchByNameOrList}/>
    <Stack.Screen name="SearchByNameScreen" component={SearchByNameScreen}/>
    <Stack.Screen name="SelectUserFromListScreen" component={SelectUserFromListScreen}/>
    <Stack.Screen name="ManageSpeakerAndGroupsPermissionsScreen" component={ManageSpeakerAndGroupsPermissionsScreen}/>
</Stack.Navigator>

);

export default ProfilePermissionsNavigator;   
