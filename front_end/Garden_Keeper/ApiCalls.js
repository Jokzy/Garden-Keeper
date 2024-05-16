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
            console.error('Error here:', error)
            throw error;
        });
};

//Works no matter how much information you send to the API!
export const addNewPlantToDatabase = async (data) => {
    const {
        id_perenual,
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
        id_perenual: id_perenual || null,
        frequence_arrosage: frequence_arrosage || null,
        ensoleillement: ensoleillement || null,
        image_personelle: image_personelle || null,
        image_API: image_API || null,
        nom_personnel: nom_personnel || null,
        nom_scientifique: nom_scientifique || null,
        description: description || null,
        dans_jardin: dans_jardin || null
    };

    console.log("The data that we are feeding:" , postData)

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
                return response.json();
            } else {
                throw new Error('Failed to send POST request');
            }
        })
        .then(data => {
            console.log('Response from addNewPlantToDatabase', data)
            // return data[0].nom_scientifique; I don't believe I actually have to return anything here...
        })
        .catch(error => {
            console.error('Error in addNewPlantToDatabase', error);
            throw error;
        });
};

export const modifyPlantInfo= async(id_perenual) => {
    console.log("Id from perenual that we are about to send:" , id_perenual)

    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
    };

    const url = `http://${IP_ADDRESS}:8000/edit-plante/${id_perenual}/`

    return fetch(url, options)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Failed to send PATCH request')
            }
        })
        .then(data => {
            console.log('Response from edit plant', data)
        })
        .catch(error => {
            console.error('Error in edit plant', error)
            throw error;
        });
};

export const getPerenualID = async(nom_scientifique) => {
    try {
        const response = await fetch(`https://perenual.com/api/species-list?key=${perenual_key}&q=${nom_scientifique}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log("result json", result);

        //Check is the result is in json:
        if (!result || !result.data || !result.data.length) {
            throw new Error('Invalid response format');
        }

        const id = result.data[0]?.id;
        if (!id) {
            throw new Error('No ID found in response');
        }
        console.log("id:", id);
        await modifyPlantInfo(id)
        return id;
    } catch (error) {
        console.error('Error in getPerenualID', error);
        throw error;
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
}}



//TODO: create a way to add information (an "adjust info about plant section")
//TODO: create a way to get the last plant that was logged

// -------------- CODE GRAVEYARD
    // return new Promise((resolve, reject) => {
    //         fetch
    //             .then(response => response.json())
    //             .then(result => {
    //                 console.log("result:", result)
    //                 console.log("ID of the plant in Perenual (from ApiCalls):", result["data"][0]["id"])
    //                 resolve(result["data"][0]["id"]);
    //             })
    //             .catch(error => {
    //                 console.log('error', error)
    //                 reject(error);
    //             })
    //     })

// export const modifyPlantInfo= async(data) => {
//     const postData = {};
//     for (const key in data) {
//         if (data[key] !== undefined && data[key] !== null) {
//             postData[key] = data[key];
//         }
//     }
//
//     console.log("The data that we are feeding to PATCH request:" , postData)
//
//     const options = {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify(postData)
//
//     };
//
//     const url = `http://${IP_ADDRESS}:8000/edit-plante/${}/`
//
//     return fetch(url, options)
//         .then(response => {
//             if(response.ok){
//                 return response.json();
//             } else {
//                 throw new Error('Failed to send PATCH request')
//             }
//         })
//         .then(data => {
//             console.log('Response from edit plant', data)
//         })
//         .catch(error => {
//             console.error('Error in edit plant', error)
//             throw error;
//         });
// };
