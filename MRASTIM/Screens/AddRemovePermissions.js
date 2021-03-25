import React from 'react';
import {Text, View, Image, SafeAreaView, FlatList} from 'react-native';

import styles from "../Components/styles";



function ManagePermissions(props) {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 64}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.frontpageheadinggray}>Multiroom Audio Software</Text>
          <Image fadeDuration={2500} source={require('../assets/logo2.png')}/>
          <Text style={styles.frontpageheadinggray}>MAS</Text>
        </View>
        <View>  
            <Text>Search user by ID</Text>
        </View>
        <View>
            <Text>Select User from List</Text>
        </View>
        <View style={{marginTop: 12, paddingLeft: 8}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Permission-Groups</Text>
          <FlatList data={[{key: "Testdata"}, {key: "for a flat list"}, {key: "for groups"}]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>
        </View>


      </View>
    </SafeAreaView>


  );
}

export default ManagePermissions;