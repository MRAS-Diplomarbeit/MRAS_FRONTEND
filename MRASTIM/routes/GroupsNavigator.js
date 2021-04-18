import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GroupsDetails from '../Screens/GroupsDetails';
import GroupsOverview from '../Screens/GroupsScreen';
import AddSpeakerToGroup from '../Screens/AddSpeakerToGroup';
import AddNewGroupScreen from '../Screens/AddNewGroupScreen';

const Stack = createStackNavigator();

const GroupsNavigator = (props) => (

<Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="GroupsOverview" children={()=><GroupsOverview userInfo={props.userInfo}/>}/>
    <Stack.Screen name="GroupsDetails" component={GroupsDetails}/>
    <Stack.Screen name="AddSpeakerToGroup" component={AddSpeakerToGroup}/>
    <Stack.Screen name="AddNewGroup" component={AddNewGroupScreen}/>
</Stack.Navigator>

);

export default GroupsNavigator;   
