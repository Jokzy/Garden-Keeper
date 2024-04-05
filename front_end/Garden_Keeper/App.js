import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, TextInput, Button, Text, StyleSheet, ImageBackground, TouchableOpacity, Image} from 'react-native';
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
    const CameraIconButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image
                source={require('./assets/Magnifying_glass_icon.png')}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
    const SettingsIconButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image
                source={require('./assets/icon.png')}
                style={styles.icon}
            />
        </TouchableOpacity>
    );

  const topTab = createMaterialTopTabNavigator()
  function SettingsScreen() {
    return (
        <ImageBackground source={require("./assets/background1.png")} resizeMode={"cover"} style={styles.image}>
          <View style={styles.containerTitle}>
            <Text style={styles.titleText}>Garden</Text>
              <Text style={styles.titleText2}>Keeper</Text>
          </View>
            <View style={styles.containerCarousel}>


            </View>
            <View style={styles.containerPressables}>
            <CameraIconButton></CameraIconButton>
                <SettingsIconButton></SettingsIconButton>
            </View>
        </ImageBackground>
    );
  }

return (
    <NavigationContainer  theme={navigationTheme}>
      <topTab.Navigator screenOptions={ {
          tabBarShowLabel: true,
          tabBarShowIcon: false,
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
          backgroundColor: 'transparent',}}}
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
        paddingHorizontal:20,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    containerTitle:{
        flex:2,
        alignItems: "center",
        justifyContent: "center",
    },
    containerCarousel:{
        flex:2,
    },
    containerPressables:{
        flex:0.5,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'baseline',



    },
    titleText: {
        fontFamily: "Cheflat",
        fontWeight: "bold",
        fontSize: 60,
        color: "#75904b"
    },
    titleText2: {
        fontFamily: "Cheflat",
        fontWeight: "bold",
        fontSize: 50,
        color: "#75904b"
    },
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 25,
        width: 65,
        height:65,
        paddingRight:0


    },
    icon: {
        width: 45,
        height: 45,
        marginRight: 10,

    },

      });

