import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    Pressable
} from 'react-native';
import * as Font from "expo-font"
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {getAllPlants} from "./ApiCalls";

//import { useImages } from './AppContext';

async function loadFont(){
    await Font.loadAsync({
        "Cheflat": require("./assets/fonts/Cheflat.ttf"),
    });
}

export default function ScreenEnc() {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const navigation = useNavigation();

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async() => {
            try {
                const data = await getAllPlants();
                console.log("Data fetched:", data);
                setPlants(data);
                //setPlants(response.data);
            } catch (error) {
                console.error('Error fetching plants:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchPlants().then(r => null);
    }, []);

    if (loading) {
        return <Text>Loading...</Text>
    }

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
            //addImage(result.uri);
        }
    };


        const handleSearch = () => {
            // the logic part idk what goes here lol
            // heeheheheheheh
            setSearchResult(searchText);
        };

        const SearchButton = ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image
                    source={require('./assets/Magnifying_glass_icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        );

        const ImageUploadButton = ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image
                    source={require('./assets/imagesicon.png')}
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
                            <SearchButton onPress={handleSearch}></SearchButton>
                        </View>
                            <Text style={styles.result}>{searchResult}</Text>

                    </KeyboardAvoidingView>
                    <FlatList
                        data={plants}
                        keyExtractor={item => item.id_perenual.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate("Styles", {plantID: item.id_perenual})}
                                       style={styles.pressableItem}
                                       >
                                {/*console.log("Pressed item", item.id && navigation.navigate("Styles"))} style={styles.pressableItem}>*/}
                                <Image source={{ uri: item.image_API }} style={styles.imageFormat} />
                                <Text>{item.nom_scientifique}</Text>
                            </Pressable>
                        )}

                        // renderItem={({ item }) => (
                        //     <Pressable onPress={() => console.log("Pressed item", item.id && navigation.navigate("Styles"))} style={styles.pressableItem}>
                        //         <Image source={{ uri: item.uri }} style={styles.imageFormat} />
                        //         <Text>Plant name</Text>
                        //     </Pressable>
                        // )}
                        ListEmptyComponent={<Text style={styles.emptyMessage}>C'est bien vide ici...</Text>}
                        numColumns={3}
                        style={styles.containerFlatList}
                    />
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
            flex: 0.7,
            paddingTop: 20,
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
        imageContainer: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imageFormat: {
    width: 100,  // Set image width
        height: 100, // Set image height
    },
        pressableItem: {
            padding: 10,
            marginVertical: 5,
            backgroundColor: '#f0f0f0',
            alignItems: 'center'
        },
        emptyMessage: {
            textAlign: 'center',
            fontSize: 20,
            color: "#75904b",
            marginTop: 20
        }
});

