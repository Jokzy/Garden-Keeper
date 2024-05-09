import React, { useState } from 'react';
import * as Font from "expo-font"
import {
    ImageBackground, KeyboardAvoidingView,
    StyleSheet, Text, TextInput, View
} from 'react-native';
import ScreenSearch from './Recherche.js';

export default function InfoCard() {
    return (
        <ImageBackground source={require("./assets/background2.png")}
                         resizeMode={"cover"}
                         style={styles.image}
        >
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.titleText}>Info Card</Text>
            </KeyboardAvoidingView>


        </ImageBackground>
    );
};


const styles= StyleSheet.create({
    container: {
        flex: 1,
    },

    titleText: {

    },

    containerSearchBar: {

    },

    result: {

    },

});