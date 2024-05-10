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
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import * as Font from "expo-font"
import * as ImagePicker from 'expo-image-picker';
import { AppLoading } from 'expo';
import { useImages } from './ImageContext';

async function loadFont(){
    await Font.loadAsync({
        "Cheflat": require("./assets/fonts/Cheflat.ttf"),
    });
}

export default function ScreenSearch() {
    const ip_adresse = "10.186.7.22" //TODO: REMOVE THIS BEFORE PUSHING

    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [image, setImage] = useState(null);
    const { images } = useImages();
    const { addImage } = useImages();

    const pickImage = async () => {

        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            //setImage(result.uri);
            addImage(result.uri);
        }
    };


    const handleSearch = async () => {
            const response = await fetch(`http://${ip_adresse}:8000/get-data/${searchText}/`)
            const info_as_object = await response.json()
            let info = ""
            for (let key in info_as_object) {

                if (key !== "id" && key !== "nom_recherche") {
                    let nom_categorie = key[0].toUpperCase() + key.slice(1).replace("_", " ")

                    if (Array.isArray(info_as_object[key])) { //this no work for some reason haha
                        let array_texte = ""
                        for (let i = 0; i < info_as_object[key].length; i++) {
                            array_texte += info_as_object[key][i]
                            if(i!=info_as_object[key].length-1){
                                array_texte += ", "
                            }
                        }
                        info += (nom_categorie + ": " + array_texte + "\n");
                    } else if(!info_as_object[key].startsWith("Upgrade")){
                        let valeur = info_as_object[key]
                        info += (nom_categorie + ": " + valeur + "\n");
                    }

                }

            }

            setSearchResult(info)
        };


    const SearchButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image
                source={require('./assets/search_icon.png')}
                style={styles.icon}
            />
        </TouchableOpacity>
    );


    const ImageUploadButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.input}>
            <Text>Upload an image</Text>
            <Image
                source={require('./assets/upload_icon.png')}
                style={styles.icon}
            />
        </TouchableOpacity>
    );


    return (
        <ImageBackground source={require("./assets/background2.png")} resizeMode={"cover"} style={styles.image}>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.titleText}>Recherche</Text>
                <View style={styles.containerSearchBar}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here to search..."
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                    <SearchButton onPress={handleSearch}></SearchButton>
                </View>

                <Text style={styles.result}>{searchResult}</Text>
                <ImageUploadButton onPress={pickImage} ></ImageUploadButton>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: "column",
        paddingVertical: 150

    },

    containerSearchBar: {
        flex: 1,
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
        paddingLeft: 10,
        flexDirection: "row",
        alignContent: "space-between"
    },
    result: {
        marginTop: 20,
        fontSize: 30,
        //fontFamily: "Cheflat",
        fontWeight: "bold",
        color: "white"
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        //fontFamily: "Cheflat",
        fontWeight: "bold",
        fontSize: 40,
        color: "#75904b",
        flex: 1
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
    UploadButton:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        width: "90%",
        height:35,
        paddingRight:0
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 10,

    },

    imageFormat: {
        width: 300,  // Set image width
        height: 200, // Set image height
    }


});

