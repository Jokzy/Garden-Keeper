import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, TextInput, Button, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native';

export default function StylesTests() {

    const CheckBox = ({isChecked, onPress}) => (
        <TouchableOpacity style={styles.checkBox} onPress={onPress}>
            <Image
                source={isChecked ? require('./assets/checkedCheckBox.png') : require('./assets/emptyCheckBox.png')}
                style={styles.checkBox}
            />
        </TouchableOpacity>
    )
    const [isChecked, setIsChecked] = useState(false);



    return (

        <View style={styles.container}>
            <View style={styles.containerPhotoPrise}>
                <Image source={require('./assets/PlanteMenu.png')} style={styles.imagePhoto}/>
            </View>
            <View style={styles.containerID}>

                <Text style={styles.plantName}>grosse affaire</Text>
                <Image source={require('./assets/PlanteMenu.png')} style={styles.imageApi}/>
            </View>
            <View style={styles.containerInfo}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Info 1:</Text>
                <Text style={styles.infoText}> blablabla</Text>
            </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Info 2:</Text>
                    <Text style={styles.infoText}> blablabla</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Info 3:</Text>
                    <Text style={styles.infoText}> blablabla</Text>
                </View>

            </View>
            <View style={styles.containerCheckBox}>
                <CheckBox
                    isChecked={isChecked}
                    onPress={()=> setIsChecked(!isChecked)}
                />
                <Text style={styles.infoTitle}>Dans le jardin?</Text>
            </View>
        </View>


    );
};
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 90,
        backgroundColor: "#f6f9f0"
    },
    containerPhotoPrise:{
        borderColor: "black",
        borderWidth: 2,
    },
    containerID:{
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%"
    },
    containerInfo:{
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",

    },
    plantName:{
        fontWeight: "bold",
        fontSize: 30,
        color: "#75904b",
        flexShrink: 1,
        justifyContent: "center"
    },
    infoTitle:{
        fontSize: 30,
        color:"#75904b"
    },
    infoText:{
        fontSize: 30,
        color:"#abce6e"
    },
    infoContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 100
    },
    imagePhoto: {
        width: screenWidth,
        height: 100,

    },
    imageApi: {
        width: 150,
        height: 150,
        marginLeft: 30,
        borderColor: "black",
        borderWidth: 2
    },
    containerCheckBox:{
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
    checkBox:{
        width: 35,
        height:35,
    },
    textContainer:{
        flex:1,
        flexWrap: "wrap",


    }
});
