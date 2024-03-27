import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
    );
  }

return (
    <NavigationContainer theme={navigationTheme}>
      <topTab.Navigator
          screenOptions={ {
            tabBarStyle: {
              position: 'absolute',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: 'transparent'}}}>
        <topTab.Screen name="Menu" component={SettingsScreen}/>
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
      });

