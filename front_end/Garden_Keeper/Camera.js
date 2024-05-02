import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useImages } from './ImageContext';
import React from 'react';

export default function App() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const navigation = useNavigation();
    const { addImage } = useImages();

    const originalTabBarStyle = {
        position: 'absolute',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        top: 30,
        bottom: 695,
        right: 0,
        left: 0,
        elevation: 0,
        backgroundColor: 'transparent', };
    const hiddenTabBarStyle = { display: 'none' };

    useFocusEffect(
        useCallback(() => {

            const hideTabBar = () => navigation.getParent().setOptions({ tabBarStyle: hiddenTabBarStyle });
            const showTabBar = () => navigation.getParent().setOptions({ tabBarStyle: originalTabBarStyle });
            const unsubscribeFocus = navigation.addListener('focus', hideTabBar);
            const unsubscribeBlur = navigation.addListener('blur', showTabBar);

            return () => {
                unsubscribeFocus();
                unsubscribeBlur();
                showTabBar();
            };
        }, [navigation])
    );


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
           setHasCameraPermission(cameraPermission.status === "granted");
           setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
            if (mediaLibraryPermission.status === "granted") {
                console.log("Permission to access media library granted");
            } else {
                console.log("Permission to access media library not granted");
            }
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }


    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        const exportPhoto = () => {
            if (photo) {
                addImage(photo.uri);  // Add the photo URI to the context-managed array
                setPhoto(undefined); // Optionally clear the photo after adding
            }
        };



        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={exportPhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title="Take Pic" onPress={takePic} />
                <Button title="Home" onPress={() => navigation.goBack()} />
            </View>

        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    buttonStyle:{
        borderRadius: 25,
        height: 50,
        width: 50,
        backgroundColor: "white"
    }
});


