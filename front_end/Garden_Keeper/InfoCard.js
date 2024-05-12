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
            style={styles.bg_image}
        >
            <View style={styles.main_container}>
                <View style={styles.title_container}>
                    <Text style={styles.titleText}>Info</Text>
                </View>
            </View>
        </ImageBackground>

    );
};


const styles= StyleSheet.create({
    bg_image: {
        flex: 1,
        justifyContent: 'center',
    },

    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#75904b"
    },

    title_container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },



});