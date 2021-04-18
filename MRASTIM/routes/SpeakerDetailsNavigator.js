import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SpeakerDetails from '../Screens/SpeakerDetails';
import SpeakerOverview from '../Screens/SpeakerOverview';
import EditSpeakerScreen from '../Screens/EditSpeakerScreen';

const Stack = createStackNavigator();
const SpeakerNavigator = (props) => (

<Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SpeakerOverview" children={()=><SpeakerOverview userInfo={props.userInfo}/>}/>
    <Stack.Screen name="SpeakerDetails" component={SpeakerDetails} />
    <Stack.Screen name="EditSpeaker" component={EditSpeakerScreen} />
</Stack.Navigator>

);

export default SpeakerNavigator;   
