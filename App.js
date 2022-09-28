import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Main} from './Main.js';
import React, { useEffect } from 'react';
import {Przelicznik} from './Przelicznik.js'
import {Wydatki} from './Wydatki.js'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

  const [daily,setDaily] = React.useState();
  const [keys,setKeys] =React.useState();
  

  const Stack = createNativeStackNavigator();

setKey = async (key) => {
  try {
    const value =  await AsyncStorage.getItem(key)
    if(value!==null)
    {
      console.log("istnieje")
      
      console.log(key,value)
      setDaily(value) 
    }
    else
    {
      console.log("chuj")
      setDaily(0)
    }
  } catch(e) {
    // read error
    console.log("err")
  }
}

useEffect(()=>{
  AsyncStorage.clear();
  const data = new Date()
  var dataKeys=data.getDate().toLocaleString() +"/"+ data.getMonth().toLocaleString()
  console.log(dataKeys)
  setKey(dataKeys)
  setKeys(dataKeys)
},[])



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chorwacki Kalkulator "  >
        
          <Stack.Screen name="Chorwacki Kalkulator " component={Main}  />
          <Stack.Screen name="Wydatki" component={Wydatki} initialParams={{key:keys}} /> 
          <Stack.Screen name="Przelicznik" component={Przelicznik} /> 
            {/* <StatusBar style="auto" /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const stylesApp = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



