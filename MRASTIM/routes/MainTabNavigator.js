import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import SpeakerNavigator from './SpeakerDetailsNavigator';
import GroupsNavigator from './GroupsNavigator';
import colors from "../Components/colors";
import ProfilePermissionsNavigator from "./ProfilePermissionsNavigator";
import RoomsNavigator from "./RoomsNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => (
  <Tab.Navigator
  initialRouteName="Profile"
  tabBarOptions={{
    activeBackgroundColor: colors.white,
    activeTintColor: "black",
    inactiveBackgroundColor: colors.backgroundColor,
    inactiveTintColor: "black",
    headerShown: false,
    
  }}>

    <Tab.Screen name="Profile" 
    children={()=><ProfilePermissionsNavigator userInfo={props.userInfo}/>} 
    options={{
      tabBarIcon: ({size, color}) => <AntDesign name="user" size={size} color={color} />,
      headerShown: false,
    }}/>
    <Tab.Screen name="Speaker" 
    children={()=><SpeakerNavigator userInfo={props.userInfo}/>} 
    options={{
      tabBarIcon: ({size, color}) => <AntDesign name="sound" size={size} color={color} />,
      headerShown: false,
    }}/>
    <Tab.Screen name="Groups" 
    children={()=><GroupsNavigator userInfo={props.userInfo}/>} 
    options={{
      tabBarIcon: ({size, color}) => <MaterialIcons name="menu" size={size} color={color} />,
      headerShown: false,
    }}/>
    <Tab.Screen name="Rooms" 
    children={()=><RoomsNavigator userInfo={props.userInfo}/>} 
    options={{
      tabBarIcon: ({size, color}) => <MaterialIcons name="menu" size={size} color={color} />,
      headerShown: false,
    }}/>
  </Tab.Navigator>
)



export default TabNavigator;