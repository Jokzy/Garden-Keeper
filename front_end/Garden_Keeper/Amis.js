import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, TextInput, Button, Text, StyleSheet, ImageBackground} from 'react-native';

export default function ScreenAmi() {


    return (
        <View style={styles.container}>

        </View>
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
});
