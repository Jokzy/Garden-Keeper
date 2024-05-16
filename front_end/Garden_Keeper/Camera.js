import {StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useImages } from './ImageContext';
import React from 'react';
import {handlePhotoSearchAPI, getPlantFromDatabase, getPerenualID} from "./ApiCalls";
import StylesTests from "./StylesTests";

export default function App() {
    // note: on utilise des [const, funct] au lieu d'un let, car, comme ça, React sait qu'il doit rafraîchir la page
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState(null);
    const [photoDB, setPhotoDB] = useState() //TODO: temp test constant
    const [photoURI, setPhotoURI] = useState();
    const navigation = useNavigation();
    const { addImage } = useImages();
    const { addGardenImage } = useImages();
    // const [plantName, setPlantName ] = useState(null);

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
    const hiddenTabBarStyle = { display: 'Pas de nom!' };
    // Navigation bar
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

    // Receiving camera permissions
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
        setPhotoURI(newPhoto.uri)
    };

    if (photoURI) {
        const exportPhoto = async () => {
            if (photoURI) {
                addImage(photoURI);  // Add the photo URI to the context-managed array
                //setPhoto(undefined); // Optionally clear the photo after adding
            }
            const imagePersonelle = await handlePhotoSearch();
            if (imagePersonelle) {
                navigation.navigate("Styles", {photoDB: imagePersonelle});
            }
        };


        const handlePhotoSearch = async () => {
            try {
                //Retrieves the scientific name of the plant:
                const nom_plante = await handlePhotoSearchAPI(photo);
                console.log("nom de la damn plante:", nom_plante)
                const id_plant = await getPerenualID(nom_plante)
                console.log("ID of the damn plant:", id_plant)
                const plant = await getPlantFromDatabase(id_plant)
                console.log("This is the response:", plant)


                const imagePersonelle = plant.Plant_data.image_personelle;
                console.log("Image Personelle", imagePersonelle)
                setPhotoDB(imagePersonelle)
                await console.log(photoDB)

                // getPlantFromDatabase(id_plant)
                //     .then(Plant_data => {
                //         const imagePersonelle = Plant_data.image_personelle;
                //         console.log("Image Personelle", imagePersonelle)
                //     })
            } catch (error) {
                console.error('Error in handlePhotoSearch', error);
            }
        };

        const addPhotoGarden = () => {
            if (photo) {
                addGardenImage(photoURI);  // Add the photo URI to the context-managed array
            }

        };


        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: photoURI }} />
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('./assets/back_icon.png')}
                    />

                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => takePic()}>
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

// ----------------- CODE GRAVEYARD -----------------
// //Sending the name of the plant and the picture we took of the plant to our API, so that it can store them in DB
// const sendPlantToDatabase = async () => {
//     console.log("run")
//     const postData = {
//         nom_scientifique: plantName,
//         image_personelle: photoURI,
//     }
//
//     const options = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(postData)
//     };
//
//     const url = `http://${IP_ADDRESS}:8000/add-plante/`
//
//     fetch(url, options)
//         .then(response => {
//             if (response.ok) {
//                 console.log("SENT!")
//                 return response.json();
//             } else {
//                 throw new Error('Failed to send POST request');
//             }
//         })
//         .then(data => {
//             console.log('Response:', data)
//         })
//         .catch(error => {
//             console.error('Error', error);
//         });
// }

// const handlePhotoSearch = async () => {
//     const options = {
//         method: 'POST',
//         headers: {
//                 'Content-Type': 'application/json',
//                 'Api-Key': plantID_key
//         },
//         body: JSON.stringify({images: [photo.base64]})
//     };
//
//     // Plant.id API identifies what the picture is
//     fetch('https://plant.id/api/v3/identification', options)
//         .then(response => response.json())
//         .then(data => {
//             console.log('Response from API:', data); //TEST
//             const nom_scientifique= data.result?.classification?.suggestions?.[0]?.name;
//             setPlantName(nom_scientifique);
//             console.log('Plant Name:', plantName); //TEST
//             sendPlantToDatabase()
//         })
//         .catch(error => console.error('Error:', error));
// }
//
// This was right under "if (photoURI)"
// let savePhoto = () => {
    //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //         setPhoto(undefined);
    //     });
    // };

// console.log('Plant Name:', plantName); //TEST
            // if (plantName) {
            //     getPerenualID(plantName)
            //         .then(resolve => {
            //             console.log("ID of the plant from Perenual", resolve)
            //
            //         })
            //         .catch(error => {
            //             console.error("Whoospies!", error)
            //         })
            // }

 // const sendPlantToDatabase = async () => {
        //     try {
        //         const image_personelle = typeof photoURI !== 'undefined' ? photoURI : '';
        //
        //         console.log('Before addNewPlantToDatabase', {
        //             id_perenual: "",
        //             frequence_arrosage: "",
        //             ensoleillement: "",
        //             image_personelle: image_personelle || "",
        //             image_API: "",
        //             nom_personnel: "",
        //             nom_scientifique: "",
        //             description: "",
        //             dans_jardin: 'False',
        //         })
        //         await addNewPlantToDatabase({
        //             id_perenual: "",
        //             frequence_arrosage: "",
        //             ensoleillement: "",
        //             image_personelle: photoURI || "",
        //             image_API: "",
        //             nom_personnel: "",
        //             nom_scientifique: "",
        //             description: "",
        //             dans_jardin: "False",
        //         });
        //
        //     } catch (error) {
        //         console.error('Error in sendPlantToDatabase', error);
        //     }
        // };
