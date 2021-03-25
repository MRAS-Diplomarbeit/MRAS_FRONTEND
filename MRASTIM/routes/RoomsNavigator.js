import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RoomsOverview from "../Screens/RoomsOverview";
import RoomsDetails from "../Screens/RoomsDetails";
import EditRoomScreen from "../Screens/EditRoomScreen";
import AddNewRoomScreen from '../Screens/AddNewRoomScreen';



const Stack = createStackNavigator();

const RoomsNavigator = (props) => (

<Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="RoomsOverview" children={()=><RoomsOverview userInfo={props.userInfo}/>}/>
    <Stack.Screen name="RoomsDetails" component={RoomsDetails}/>
    <Stack.Screen name="EditRoomScreen" component={EditRoomScreen}/>
    <Stack.Screen name="AddNewRoom" component={AddNewRoomScreen}/>
</Stack.Navigator>
);

export default RoomsNavigator;   
