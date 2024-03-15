import {StatusBar} from 'expo-status-bar';
import React, {useState} from "react";
import {Button, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderCurve : 15,
    borderRadius : 15,

  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});


export default function App() {


    return (
        <View style={styles.container}>

          <ImageBackground source={require('./assets/background1.png')} resizeMode={'cover'} style={styles.image}>
          <Text>

          </Text>
          </ImageBackground>
        </View>
    );
};
