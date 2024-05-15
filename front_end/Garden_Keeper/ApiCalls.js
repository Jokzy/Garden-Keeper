import {useState} from "react";

const IP_ADDRESS = "" //TODO: Don't push your IP address!
const perenual_key = "sk-3pOW6643942e18ef15485"
const plantID_key = "uNrAXKqhOOBBoNXCMQIaEJpqmE6gFs8g0O6tFoEAa5q9AzpQgG"

// Sends photo to Plant.id APi and returns the name of the plant
export const handlePhotoSearchAPI = async (photo, setPlantName) => {
    const options = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Api-Key': plantID_key,
        },
        body: JSON.stringify({images: [photo.base64]})
    };

    console.log(photo.uri) //TEST

    fetch('https://plant.id/api/v3/identification', options)
        .then(response => response.json())
        .then(data => {
            console.log('Response from API:', data); //TEST
            const nom_scientifique= data.result?.classification?.suggestions?.[0]?.name;
            setPlantName(nom_scientifique);
            console.log('Response', nom_scientifique);
        })
        .catch(error => {
            console.error('Error:', error)
            throw error;
        });
};

//Works no matter how much information you send to the API!
export const addNewPlantToDatabase = async (data) => {
    const {
        frequence_arrosage,
        ensoleillement,
        image_personelle,
        image_API,
        nom_personnel,
        nom_scientifique,
        description,
        dans_jardin
    } = data;

    const postData = {
        frequence_arrosage: frequence_arrosage !== undefined ? frequence_arrosage: null,
        ensoleillement: ensoleillement !== undefined ? ensoleillement: null,
        image_personelle: image_personelle !== undefined ? image_personelle: null,
        image_API: image_API !== undefined ? image_API: null,
        nom_personnel: nom_personnel !== undefined ? nom_personnel: null,
        nom_scientifique: nom_scientifique !== undefined ? nom_scientifique: null,
        description: description !== undefined ? description: null,
        dans_jardin: dans_jardin !== undefined ? dans_jardin: null
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
    };

    const url = `http://${IP_ADDRESS}:8000/add-plante/`

    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                console.log("SENT!") //TEST
                console.log('Response', response);
                return response["data"][0]["id"];
            } else {
                throw new Error('Failed to send POST request');
            }
        })
        .then(result => {

        })
        .catch(error => {
            console.log('Error', error);
            throw error;
        });
};

export const getPerenualID = async(nom_scientifique) => {
    return new Promise((resolve, reject) => {
            fetch(`https://perenual.com/api/species-list?key=${perenual_key}&q=${nom_scientifique}`)
                .then(response => response.json())
                .then(result => {
                    console.log("result:", result)
                    console.log("result:", result["data"][0]["id"])
                    resolve(result["data"][0]["id"]);
                })
                .catch(error => {
                    console.log('error', error)
                    reject(error);
                })
        })
}

// Get the plant from our database and fill its information
// Or get the information first and then fill it?
// And fill in information
const acquireInformationAPI = async (nom_scientifique) => {
    const options= {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'key': perenual_key,
        },
        body: JSON.stringify({'q': nom_scientifique})
    }

    fetch()
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received: ', data) //TEST
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
}



//TODO: create a way to add information (an "adjust info about plant section")
//TODO: create a way to get the last plant that was logged

