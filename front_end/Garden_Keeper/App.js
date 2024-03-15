import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {Button, Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';



export default function App() {

const [name, setName]  = useState(  'Style Test')
const onClickHandler = () => {
setName('Style Test is Done!')

}
  return (


    <View style={styles.container}>
      <Text style={ styles.text}> {name}  </Text>
      <Button style={styles.text} title= {'Update'} onPress={ onClickHandler   } >

      </Button>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {

    width: '100%',
    height : '50%',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth : 10 ,
    borderColor: '#f03',
    borderRadius : 10,
    borderTopColor : 'black',
    borderBottomColor : 'black'
  },
  text:{
    color: '#ff00ff',
    alignItems :'center',
    justifyContent:'center',
    fontStyle : "italic",
    fontFamily : "Times New Roman",
    fontWeight : "bold",
    fontSize : 30,

  },



});
