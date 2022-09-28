import React, { Component , useEffect} from 'react'
import { StyleSheet, Button, View, SafeAreaView,TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const stylesMain = StyleSheet.create({
    container: {
        flexDirection:"column",
        justifyContent: 'center',
        marginHorizontal: 16,
        alignItems: 'center', 
    },
    
    navButton:{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius:5,
        width:300,
        height:60,
        margin:10,
        
    },
    text:{
        fontSize:22,
        alignItems: 'center',
    },

    mainh1:{
        fontSize:36,
        fontWeight:"700",
        top:30,
        width:400,
        textAlign: 'center',
        marginBottom:70
    },
    buttons:{
        justifyContent:"flex-end",
        marginTop:200
    },
    progressBar:{
         top:0,
         alignItems:'center',
    },
    limitText:{
        
        fontSize:22,
        alignItems: 'center',
        position:'absolute',
        top:200,
        alignSelf:'center',  
    }

  });

  

function Main({ navigation },initParams){
    const [lim,setLim]=React.useState()
    const isFocused = useIsFocused();
    const [howMuch,setHowMuch]=React.useState()
    const [percentage,setPercentage] =React.useState(0)

    getMyStringValue = async (key) => {
        try {
          const value =  await AsyncStorage.getItem(key)
          if(value!==null)
          {
           setLim(value) 
        }
          else
          {
        setLim(0)
        }
        } catch(e) {
          // read error
        }
      }
    


      getHowMuch = async (key) => {
        try {
          const value =  await AsyncStorage.getItem(key)
          if(value!==null){setHowMuch(value);} 
          else setHowMuch(0)
        } catch(e){}
      }


      useEffect(()=>{
        getMyStringValue('limit')

        const data = new Date()
        var dataKeys=data.getDate().toLocaleString() +"/"+ data.getMonth().toLocaleString()

        getHowMuch(dataKeys)    

        if(parseFloat(howMuch)>=0&&parseFloat(lim)>0){

            if(parseFloat(howMuch)>=parseFloat(lim))setPercentage(1)
            else setPercentage(parseFloat((parseFloat(howMuch)/parseFloat(lim)).toFixed(2)))
        }
    
    },[isFocused,lim,howMuch])


    return(
        <SafeAreaView>
             <View style={stylesMain.container}>
                <View>
                <Text style={stylesMain.mainh1}>Twoje dzienne wydatki</Text>
                <Text style={stylesMain.limitText}> {howMuch}/{lim} HRK </Text>
                 <Progress.Circle 
                style={stylesMain.progressBar}
                size={200} 
                progress={parseFloat(percentage)}
                endAngle={0.5}  
                thickness={20}
                strokeCap={'round'}
                unfilledColor={'rgba(180, 217, 255, 1)'}
                borderWidth={0}
                />
                </View>
                <View style={stylesMain.buttons}>
                
                
                <TouchableOpacity activeOpacity={0.95} style={stylesMain.navButton} onPress={() => navigation.navigate('Wydatki')}>
                    <Text style={stylesMain.text}>Twoje wydatki</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.95} style={stylesMain.navButton} onPress={() => navigation.navigate('Przelicznik')}>
                    <Text style={stylesMain.text}>Przelicznik</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

}

export {Main}