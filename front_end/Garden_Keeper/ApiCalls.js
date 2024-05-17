import {useState} from "react";


const IP_ADDRESS = "" //TODO: Don't push your IP address!
const perenual_key = "sk-K1St6646b9bc47e595540"
const plantID_key = "78wKYnmoSAawYGVcmrotGJw3mBweeCN7mMDaZ8PXDNOoVtLLfV"

//TODO: A lot of this can be handled directly in the API calls, like the setPlantName

export const getPerenualID = async(nom_scientifique) => {
    try {
        const response = await fetch(`https://perenual.com/api/species-list?key=${perenual_key}&q=${nom_scientifique}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data ${errorText}`);
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
        return id;
    } catch (error) {
        console.error('Error in getPerenualID', error);
        throw error;
    }
}

// Sends photo to Plant.id APi and returns the name of the plant - basically a getPlantNomScientifique
export const handlePhotoSearchAPI = async (photo) => {
    const options = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Api-Key': plantID_key,
        },
        body: JSON.stringify({images: [photo.base64]})
    };

    console.log(photo.uri) //TEST
    try {
        const response = await fetch('https://plant.id/api/v3/identification', options)
        const data = await response.json()
        console.log('Response from API:', data); //TEST

        const nom_scientifique = data.result?.classification?.suggestions?.[0]?.name;
        console.log("nom ScientiFique", nom_scientifique)
        if (!nom_scientifique) {
            throw new Error('Plant name not found in response');
        }

        //Getting the id in Perenual from the scientific name
        const id_perenual = await getPerenualID(nom_scientifique);
        console.log("dis the id:", id_perenual)

        const response2 = await fetch(`https://perenual.com/api/species/details/${id_perenual}?key=${perenual_key}`);
        if (!response.ok) {
            const errorText = await response2.text();
            throw new Error(`Failed to fetch data ${errorText}`);
        }
        const result = await response2.json();

        //Adding 3 base info into the DB
        await addNewPlantToDatabase({
                    nom_scientifique: nom_scientifique,
                    image_personelle: photo.uri,
                    id_perenual: id_perenual,
                    frequence_arrosage: result["watering"],
                    ensoleillement: result["sunlight"],
                    image_API: result["default_image"]["original_url"],
                    description: result["description"],
                });

        return nom_scientifique;
    } catch (error) {
        console.error('Error in handlePhotoSearchAPI:', error);
        throw error;
    }
};

//Works no matter how much information you send to the API!
export const addNewPlantToDatabase = async (data) => {
    const postData = {};
    for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
            postData[key] = data[key];
        }
    }

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
            console.error('Full error details', JSON.stringify(error,null, 2))
            throw error;
        });
};

export const getPlantFromDatabase = async (id_perenual) => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }

    const url = `http://${IP_ADDRESS}:8000/get-plante/${id_perenual}/`;

    try {
        const response = await fetch(url, options);
        console.log("Response status:", response.status);

        const data = await response.json();

        if (response.ok) {
            console.log("tis tes response:", data);
            return data;
        } else {
            throw new Error(data.error || "Failes to retrieve plant from database.");
        }
    } catch (error) {
        console.error("Error in handlePhotoSearch", error);
        throw error;
    }}

export const getAllPlants = async () => {
    try {
        const response = await fetch(`http://${IP_ADDRESS}:8000/get-all-plants/`)
        if (!response.ok) {
            throw new Error("HTTP error! Stupid!");
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching plants:', error);
        throw error;
    }
    // const url = `http://${IP_ADDRESS}:8000/get-all-plants/`;
    //
    // return fetch(url)
    //     .then(response => {
    //         if (response.ok) {
    //             console.log("SENT all plants!") //TEST
    //             return response.json();
    //         } else {
    //             throw new Error('Failed to send GET request to get all plants');
    //         }
    //     })
}

// Get the plant from our database and fill its information
// Or get the information first and then fill it?
// And fill in information
export const acquireInformationAPI = async (id_perenual) => {
    /*try {
        const response = await fetch(`https://perenual.com/api/species/details/${id_perenual}?key=${perenual_key}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data ${errorText}`);
        }
        const result = await response.json();
        //console.log("result json", result);
        const patchData = {
            frequence_arrosage: result["watering"],
            ensoleillement: result["sunlight"],
            image_API: result["default_image"]["original_url"],
            description: result["description"]
        }
        //console.log("data to send:", patchData)

        const options= {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(patchData)
    }
        const url = `http://${IP_ADDRESS}:8000/edit-plante/${id_perenual}/`

        fetch(url, options)
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
                console.error('There was a problem with the patch operation:', error);
            })


    } catch (error) {
        console.error('Error in acquireInformationAPI', error);
        throw error;
    }*/




}




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

// export const modifyPlantInfo= async(id_perenual) => {
//     console.log("Id from perenual that we are about to send:" , id_perenual)
//
//     const options = {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json'},
//     };
//
//     const url = `http://${IP_ADDRESS}:8000/edit-plante/${id_perenual}/`
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

// This was in "addNewPlantToDatabase":
    // const {
    //     id_perenual,
    //     frequence_arrosage,
    //     ensoleillement,
    //     image_personelle,
    //     image_API,
    //     nom_personnel,
    //     nom_scientifique,
    //     description,
    //     dans_jardin
    // } = data;
    //
    // const postData = {
    //     id_perenual: id_perenual || null,
    //     frequence_arrosage: frequence_arrosage || null,
    //     ensoleillement: ensoleillement || null,
    //     image_personelle: image_personelle || null,
    //     image_API: image_API || null,
    //     nom_personnel: nom_personnel || null,
    //     nom_scientifique: nom_scientifique || null,
    //     description: description || null,
    //     dans_jardin: dans_jardin || null
    // };

// Code that used to be in handlePhotoSearchAPI:
    // fetch('https://plant.id/api/v3/identification', options)
    //     .then(response => response.json())
    //     .then(async data => {
    //         console.log('Response from API:', data); //TEST
    //         const nom_scientifique = data.result?.classification?.suggestions?.[0]?.name;
    //         console.log("Perenual ID HA", await getPerenualID(nom_scientifique))
    //         const id_perenual = await getPerenualID(nom_scientifique)
    //
    //         console.log('Checking nom_scientifique and id_perenual', nom_scientifique, id_perenual);
    //         addNewPlantToDatabase({
    //                 nom_scientifique: nom_scientifique,
    //                 image_personelle: photo.uri,
    //                 id_perenual: id_perenual,
    //             }
    //         )
    //     })
    //     .catch(error => {
    //         console.error('Error here:', error)
    //         throw error;
    //     });

//
//     return fetch(url, options)
//         .then(response => {
//             console.log("Response status:", response.status);
//
//             const data = await response.json();
//             // console.log("Response body:", response)
//             if (response.ok) {
//                 console.log("tis the response:", response.json())
//                 return response.json();
//             } else {
//                 throw new Error("Failed to retrieve plant from database.")
//             }
//         })
// }

