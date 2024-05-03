import 'react-native-gesture-handler';
import React, {useEffect, useState, createContext, useContext} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useIsFocused, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenEnc from "./Encyclopédie";
import ScreenAmi from "./Amis";
import ScreenJar from "./Jardin";
import ScreenSearch from "./Recherche";
import Camera from "./Camera";
import ScreenInfoCard from "./InfoCard"
import MenuIcon from "./assets/Menu.png"
import EncyclopedieIcon from "./assets/Encyclopédie.png"
import GardenIcon from "./assets/Mon jardin.png"
import FriendsIcon from "./assets/Mes amis.png"
import { ImageProvider } from './ImageContext';

const topTab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator();




export default function App() {
    return topTabNav();

}
    function SettingsScreen() {
        /*const isFocused = useIsFocused();
        const [showTabBar, setShowTabBar] = useState(true);

        useEffect(() => {
            return navigation.addListener('focus', () => {
                setShowTabBar(true);
            });
        }, [navigation]);

        const toggleTabBarVisibility = () => {
            setShowTabBar(!showTabBar);
        };*/
        const CameraIconButton = ({onPress}) => (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image
                    source={require('./assets/Magnifying_glass_icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>


        );
        const SettingsIconButton = ({onPress}) => (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image
                    source={require('./assets/icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        );
        const navigation = useNavigation();


        return (
            <ImageBackground source={require("./assets/background1.png")} resizeMode={"cover"} style={styles.image}>
                <View style={styles.containerTitle}>
                    <Text style={styles.titleText}>Garden</Text>
                    <Text style={styles.titleText2}>Keeper</Text>
                </View>
                <View style={styles.containerCarousel}>


                </View>
                <View style={styles.containerPressables}>
                    <SettingsIconButton></SettingsIconButton>
                    <CameraIconButton onPress={() => navigation.navigate('Camera') /*&& toggleTabBarVisibility*/}></CameraIconButton>
                </View>
            </ImageBackground>
        );
    }
    function topTabNav(){
        const navigationTheme = {
            colors: {
                background: "transparent",
            },
        }

    return (
        <ImageProvider>
        <NavigationContainer theme={navigationTheme}>
            <topTab.Navigator
                initialRouteName={"Menu"}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let icon;
                        if (route.name === 'Menu') {
                            icon = MenuIcon;
                        } else if (route.name === 'Encyclopédie') {
                            icon = EncyclopedieIcon
                        } else if (route.name === 'Jardin') {
                            icon = GardenIcon
                        } else if (route.name === 'Amis') {
                            icon = FriendsIcon
                        } else if (route.name == 'InfoCard') {
                            icon = FriendsIcon //TODO: To code
                        }
                        // This whole thing lets us change the icons for the top bar. It works ish we just have to find a way to make them all fit
                        return <Image source={icon} style={{width: size, height: size, tintColor: color}}/>;
                    },
                    tabBarShowLabel: true,
                    tabBarShowIcon: false,
                    swipeEnabled: false,

                    tabBarStyle: {
                        position: 'absolute',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        top: 30, //Top, bottom, right, left, sont la position arbitraire de la tab bar et permettent de la voir.
                        bottom: 695,
                        right: 0,
                        left: 0,
                        elevation: 0, // Elevation 0 fait qu'il y a pas de shadow en dessous de la tab bar
                        backgroundColor: 'transparent',
                    }
                })}
            >

                <topTab.Screen name="Menu" component={StackNavMain}/>
                <topTab.Screen name="Recherche" component={StackNavSearch}/>
                <topTab.Screen name="Encyclopédie" component={ScreenEnc}/>
                <topTab.Screen name="Jardin" component={ScreenJar}/>
                <topTab.Screen name="Équipe" component={ScreenAmi}/>
                <topTab.Screen name="InfoCard" component={ScreenInfoCard}/>
            </topTab.Navigator>
        </NavigationContainer>
        </ImageProvider>
    )
}
function StackNavMain(){

    return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Main" component={SettingsScreen}/>
                <Stack.Screen name="Camera" component={Camera} options={{tabBarVisible: false }} />
            </Stack.Navigator>
    );
}

function StackNavSearch(){

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainRecherche" component={ScreenSearch}/>
        </Stack.Navigator>
    );
}







    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        image: {
            flex: 1,
            justifyContent: 'center',
        },
        containerTitle: {
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
        },
        containerCarousel: {
            flex: 2,
        },
        containerPressables: {
            flex: 0.5,
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'baseline',


        },
        titleText: {
            //fontFamily: "Cheflat",
            fontWeight: "bold",
            fontSize: 60,
            color: "#75904b"
        },
        titleText2: {
            //fontFamily: "Cheflat",
            fontWeight: "bold",
            fontSize: 50,
            color: "#75904b"
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 10,
            borderRadius: 25,
            width: 65,
            height: 65,
            paddingRight: 0


        },
        icon: {
            width: 45,
            height: 45,
            marginRight: 10,

        },


    })

