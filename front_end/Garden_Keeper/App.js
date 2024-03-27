import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, TextInput, Button, Text, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ScreenEnc from "./Encyclopédie";
import ScreenAmi from "./Amis";
import ScreenJar from "./Jardin";


export default function App() {
  const navigationTheme = {
    colors: {
      background: "transparent",
    },
  }

  const topTab = createMaterialTopTabNavigator()
  function SettingsScreen() {
    return (
        <ImageBackground source={require("./assets/background1.png")} resizeMode={"cover"} style={styles.image}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
          </View>
        </ImageBackground>
    );
  }

return (
    <NavigationContainer  theme={navigationTheme}>
      <topTab.Navigator screenOptions={ {
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          top:30, //Top, bottom, right, left, sont la position arbitraire de la tab bar et permettent de la voir.
          bottom: 695,
          right:0,
          left:0,

          elevation: 0, // Elevation 0 fait qu'il y a pas de shadow en dessous de la tab bar
          //paddingTop: StatusBar.height, I tried to not make the status bar and top bar overlap. Unsuccessfully
          backgroundColor: 'transparent'}}}
        >

        <topTab.Screen  name="Menu" component={SettingsScreen}/>
        <topTab.Screen name="Encyclopédie" component={ScreenEnc}/>
        <topTab.Screen name="Jardin" component={ScreenJar}/>
        <topTab.Screen name="Amis" component={ScreenAmi}/>
      </topTab.Navigator>
    </NavigationContainer>
  );
};


        const styles = StyleSheet.create({
        container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
        input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
        result: {
        marginTop: 20,
        fontSize: 16,
      },
          image: {
            flex: 1,
            justifyContent: 'center',



          },
          textScreen:{
          color: "darkgreen",
            fontWeight: "bold",
            fontFamily: "Adlamdisplay"
          }
      });

