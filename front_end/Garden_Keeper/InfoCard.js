import React, { useState } from 'react';
import * as Font from "expo-font"
import {
    ImageBackground, KeyboardAvoidingView,
    StyleSheet, Text, TextInput, View
} from 'react-native';
import ScreenSearch from './Recherche.js';

export default function InfoCard() {
    return (
        <ImageBackground
            source={require("./assets/background2.png")}
            resizeMode={"cover"}
            style={styles.bgImage}
        >
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Info</Text>
                </View>
            </View>
        </ImageBackground>

    );
};


const styles= StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },

    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#75904b"
    },

    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },



});