import React, { createContext, useContext, useState } from 'react';


const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const [imagePersonnelle, setImagePersonnelle] = useState(null);
    const [nomScientifique, setNomScientifique] = useState(null);

    return (
        <AppContext.Provider value={{
            imagePersonnelle,
            setImagePersonnelle,
            nomScientifique,
            setNomScientifique
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);


    //const [images, setImages] = useState([]);
    //Initial array idea:
    // const addImage = (newImageBase64) => {
    //     const newImage = {
    //         id: images.length + 1,  // Ensuring each image has a unique id
    //         uri: newImageBase64,
    //     };
    //     setImages(currentImages => [...currentImages, newImage]);
    // };

    // const addGardenImage = (newImageUri) => {
    //     const newImage = {
    //         id: gImages.length + 1,  // Ensuring each image has a unique id
    //         uri: newImageUri,
    //     };
    //     setGImages(currentImages => [...currentImages, newImage]);
    // };