import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, TextInput, Button, Text, StyleSheet, ImageBackground} from 'react-native';

export default function ScreenEnc() {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleSearch = () => {
        // the logic part idk what goes here lol
        // heeheheheheheh
        setSearchResult(searchText);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('/assets/BackgroundEncyclopédie.png')} resizeMode = {'center'} style={styles.image}>
            <TextInput
                style={styles.input}
                placeholder="Type here to search..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            <Button title="Search" onPress={handleSearch} />
            <Text style={styles.result}>{searchResult}</Text>
            </ImageBackground>
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