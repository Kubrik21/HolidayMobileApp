import React, { useEffect, Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Text, TextInput, Alert, Image, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useIsFocused } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal: 16,
        alignItems: 'center',
    },
    h1: {
        fontSize: 36,
        fontWeight: "700",
        top: 30,
        width: 400,
        textAlign: 'center',
        marginBottom: 40
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
    confirmButton: {
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 5,
        width: 100,
        height: 50,
        marginTop: 10,
        marginBottom: 10
    },
    addToButton: {

        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 5,
        width: 100,
        height: 50,
    },
    text: {
        fontSize: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTo: {
        marginTop: 220,
        alignItems: "center",
        bottom: 0
    },

    buttonText: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: "500"
    },
    input: {
        fontSize: 28,
        fontWeight: "400",
    },
    AddToinput: {
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        marginBottom: 20,
        paddingVertical: 8,
        paddingLeft: 5
    },
    h2: {
        fontSize: 36,
        fontWeight: "700",
        width: 400,
        textAlign: 'center',
        paddingBottom: 20
    }

});



function Wydatki(params) {
    const [number, onChangeNumber] = React.useState(null);
    const [limit, setLimit] = React.useState()
    const [edit, setEdit] = React.useState(false)
    const [val, setVal] = React.useState()
    const [desc, setDesc] = React.useState()
    const [dataKey, setDataKey] = React.useState()
    const [dataValue, setDataValue] = React.useState()
    const isFocused = useIsFocused();

    const [test, setTest] = React.useState()


    const setstate = async (key, value) => {
        try {
            // console.log(key,value)
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            console.log("err")
        }
    }

    getMyStringValue = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                setLimit(value)
            }
            else {
                setLimit(0)
            }
        } catch (e) {
            // read error
        }
    }


    setStoredValue = async (key) => {
        try {
          const value =  await AsyncStorage.getItem(key)
          if(value!==null)
          {
            setDataValue(value)
          }
          else
          {
            setDataValue(0)
          }
        } catch(e) {
          // read error
          console.log("err")
        }
      }


    useEffect(() => {
        getMyStringValue('limit')
        setStoredValue(params.route.params.key)
    }, [])
    


    function addValue(elem){
   
        if(elem!==undefined)
        { 
        setstate(params.route.params.key,JSON.stringify((parseFloat(dataValue)+parseFloat(elem))))

        setDataValue((parseFloat(dataValue)+parseFloat(elem)))
         
         setVal()
         setDesc() 
        
    }        
    }


    function changeVal(elem) {
        setEdit(!edit)
        if (elem === true) setstate('limit', limit)
    }

    return (
        <KeyboardAwareScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.h1}>Dzienny limit</Text>
                    <View style={styles.flex}>

                        <TextInput
                            style={styles.input}
                            onChangeText={setLimit}
                            value={limit}
                            editable={edit}
                            keyboardType="numeric"
                        />
                        <Text style={styles.input}> HRK</Text>
                        
                    </View>
                    
                    <TouchableOpacity activeOpacity={0.95} style={styles.confirmButton} onPress={() => changeVal(edit)}>
                        <Text style={styles.buttonText} >{edit !== true ? "Edytuj" : "Zapisz"}</Text>
                    </TouchableOpacity>

                    <View style={styles.addTo}>
                        <Text style={styles.h2}>Twoje zakupy</Text>
                        <TextInput
                            style={styles.AddToinput}
                            onChangeText={setDesc}
                            value={desc}
                            placeholder={"Opis"}
                        />
                        <TextInput
                            style={styles.AddToinput}
                            onChangeText={setVal}
                            value={val}
                            placeholder={"Kwota"}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity activeOpacity={0.95} style={styles.addToButton} >
                            <Text style={styles.buttonText} onPress={()=>{addValue(val)}} >Dodaj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )

}

export { Wydatki }