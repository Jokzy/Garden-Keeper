import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity} from 'react-native';
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
    const { addGardenImage } = useImages();

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

        const addPhotoGarden = () => {
            if (photo) {
                addGardenImage(photo.uri);  // Add the photo URI to the context-managed array
            }
        };


        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <View style={styles.proceedingContainer}>


                {hasMediaLibraryPermission ? <TouchableOpacity onPress= {exportPhoto}>
                    <Image
                        style={{width: 98, height: 98}}
                        source={require('./assets/save_icon.png')}
                    />
                </TouchableOpacity> : undefined}

                <TouchableOpacity onPress={() => setPhoto(undefined)}>
                    <Image
                        style={{width: 80, height: 98}}
                        source={require('./assets/delete_icon.png')}
                    />
                </TouchableOpacity>
                    <TouchableOpacity onPress={addPhotoGarden}>
                        <Image
                            style={{width: 80, height: 98}}
                            source={require('./assets/yard_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.topContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('./assets/back_icon.png')}
                    />

                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer} >
                <TouchableOpacity  onPress={() => takePic()}>
                    <Image
                        style={{width: 150, height: 150}}
                        source={require('./assets/circle_icon.png')}
                    />
                </TouchableOpacity>
            </View>

        </Camera>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative'

    },

    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
     proceedingContainer:{
        margin : 30,
        padding : 15,
        backgroundColor: "transparent",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        top: 20,
        margin: 10,
        padding: 30
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding : 20
    },

});


