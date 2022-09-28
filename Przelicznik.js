import React, { useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView,TouchableOpacity, Text, TextInput, Alert, Image } from 'react-native';



const styles = StyleSheet.create({
    container: {
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
        marginTop:300
    },
    text:{
        fontSize:22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1:{
        fontSize:36,
        fontWeight:"700",
        top:30,
        width:400,
        textAlign: 'center',
        marginBottom: 100,

    },
    tinyLogo:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginVertical:30
    },
    flex:{
        flexDirection:"row",
        alignItems:"center", 
    },
    input:{
        fontSize:24,
        fontWeight:"400",
    },
  });



function Przelicznik(){

    const [number, onChangeNumber] = React.useState(null);
    const [val,changeVal]=React.useState([{curr:"PLN",course:1.58},{curr:"HRK",course:0.63}])
    const [result,setResult]=React.useState(0)

    useEffect(()=>{setResult(number*val[0].course)},[number,val])
    function changeCurrency(){

        changeVal(prev=>{
            let newArr=[]
            newArr.push(prev[1])
            newArr.push(prev[0])
            return newArr;
        })
    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.h1}>Przelicznik waluty</Text>

                    <View style={styles.flex}>
                        <TextInput
                            textAlign={'center'}
                            style={styles.text}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="____"
                            keyboardType="numeric"
                        />
                        <Text style={styles.input}> {val[0].curr}</Text>
                    </View>
                     <Image
                        style={styles.tinyLogo}
                        source={require ('./assets/arrow.png')}
                    />
                    <Text style={styles.text}>{parseFloat(result.toFixed(2))} {val[1].curr}</Text>
                    <TouchableOpacity activeOpacity={0.95} style={styles.navButton} onPress={() => changeCurrency()}>
                        <Text style={styles.text}> Zamień: {val[0].curr} na {val[1].curr}</Text>
                    </TouchableOpacity> 
            </View>
        </SafeAreaView>
    )

}

export {Przelicznik}