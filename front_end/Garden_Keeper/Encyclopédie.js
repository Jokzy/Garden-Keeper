import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import * as Font from "expo-font"
import { AppLoading } from 'expo';

async function loadFont(){
    await Font.loadAsync({
        "Cheflat": require("./assets/fonts/Cheflat.ttf"),
    });
}



    export default function ScreenEnc() {
        const ip_adresse = "" //TODO: REMOVE THIS BEFORE PUSHING

        const [searchText, setSearchText] = useState('');
        const [searchResult, setSearchResult] = useState('');

        const handleSearch = async() => {
            const response = await fetch(`http://${ip_adresse}:8000/get-data/${searchText}/`)
            const info_as_object = await response.json()

            setSearchResult(JSON.stringify(info_as_object))
            setSearchResult(searchText);
        };

        const MyIconButton = ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image
                    source={require('./assets/Magnifying_glass_icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        );


        return (
            <ImageBackground source={require("./assets/background2.png")} resizeMode={"cover"} style={styles.image}>
                <View style={styles.container}>

                    <KeyboardAvoidingView style={styles.containerTop}>
                        <Text style={styles.titleText}>Encyclopédie</Text>
                        <View style={styles.containerSearchBar}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type here to search..."
                                value={searchText}
                                onChangeText={text => setSearchText(text)}
                            />
                            <MyIconButton onPress={handleSearch}></MyIconButton>
                        </View>
                            <Text style={styles.result}>{searchResult}</Text>

                    </KeyboardAvoidingView>
                    <View style={styles.containerFlatList}>

                    </View>
                </View>
            </ImageBackground>
        );
    };



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        containerTop: {
            flex: 2,
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingHorizontal: 30,
        },
        containerSearchBar: {
            flex: 0.3,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,


        },

        containerFlatList: {
            flex: 3
        },

        input: {
            width: '90%',
            height: 40,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 25,
            paddingHorizontal: 10,
            marginBottom: 10,
            backgroundColor: "white",
            alignItems: 'center',
            justifyContent: "center",
            paddingLeft: 10
        },
        result: {
            marginTop: 20,
            fontSize: 30,
            fontFamily: "Cheflat",
            fontWeight: "bold",
            color: "white"
        },
        image: {
            flex: 1,
            justifyContent: 'center',
        },
        titleText: {
            fontFamily: "Cheflat",
            fontWeight: "bold",
            fontSize: 40,
            color: "#75904b"
        },
        button:{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 25,
            width: 35,
            height:35,
            paddingRight:0


        },
        icon: {
            width: 15,
            height: 15,
            marginRight: 10,

        },

    });

