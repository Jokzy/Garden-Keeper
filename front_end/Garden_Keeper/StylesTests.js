import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Dimensions,
    Pressable, Alert, ScrollView
} from 'react-native';
import {useAppContext} from './AppContext'
import { useNavigation } from '@react-navigation/native';

export default function StylesTests() {
    const {imagePersonnelle} = useAppContext(); //Use context to access photoDB
    const {nomScientifique} = useAppContext();
    const {frequenceArrosage} = useAppContext()
    const {Ensoleillement} = useAppContext()
    const {imageAPI} = useAppContext()
    const {description} = useAppContext()
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [modalText, setModalText] = useState()

    useEffect(() => { //THIS IS JUST TO TEST
        console.log('photoDB in StylesTests:', imagePersonnelle);
        console.log('nomScientifique', nomScientifique)
    })

    const CheckBox = ({isChecked, onPress}) => (
        <TouchableOpacity style={styles.checkBox} onPress={onPress}>
            <Image
                source={isChecked ? require('./assets/checkedCheckBox.png') : require('./assets/emptyCheckBox.png')}
                style={styles.checkBox}
            />
        </TouchableOpacity>
    )




    return (
        <View style={styles.container}>

            <View style={styles.containerPhotoPrise}>
                <Image source={{uri: imagePersonnelle}} style={styles.imagePhoto}/>
            </View>

            <View style={styles.containerID}>
                <Text style={styles.plantName}>{nomScientifique}</Text>
                <Image source={{uri:imageAPI}} style={styles.imageApi}/>
            </View>

            <View style={styles.descriptionContainer}>
                <ScrollView style={styles.descriptionText}>
                    <Text style={styles.infoText}>{description}</Text>
                </ScrollView>

            <View style={styles.containerInfo}>

            <View style={styles.infoContainer}>
                <Image source={require('./assets/labelIcon.png')} style={styles.infoTitle}/>
                <Text style={styles.gardenQ}>: </Text>
                <Text style={styles.infoText}> {nomScientifique}</Text>
            </View>

                <View style={styles.infoContainer}>
                    <Image source={require('./assets/sunIcon.png')} style={styles.infoTitle}/>
                    <Text style={styles.gardenQ}>: </Text>
                    <Text style={styles.infoText}> {Ensoleillement}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Image source={require('./assets/waterIcon.png')} style={styles.infoTitle}/>
                    <Text style={styles.gardenQ}>: </Text>
                    <Text style={styles.infoText}> {frequenceArrosage}</Text>
                </View>

            </View>
            </View>
            <View style={styles.containerCheckBox}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{width: 30, height: 30, marginRight: 30}}
                        source={require('./assets/back_icon.png')}
                    />

                </TouchableOpacity>
                <CheckBox
                    isChecked={isChecked}
                    onPress={()=> setIsChecked(!isChecked)}
                />
                <Text style={styles.gardenQ}>Dans le jardin?</Text>
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
        flex: 1,
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
        height: 20,
        width: 20,
        alignItems: "center"
    },
    gardenQ:{
        fontSize: 30,
        color: "#75904b",
    },
    infoText:{
        fontSize: 15,
        color:"#abce6e"
    },
    infoContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 50
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
    },
    descriptionContainer:{
        flexDirection: "row",
        flex: 0.5,

    },
    descriptionText:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20
    }
});
