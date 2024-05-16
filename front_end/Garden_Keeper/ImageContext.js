import React, { createContext, useContext, useState } from 'react';


const ImageContext = createContext();


export const ImageProvider = ({ children }) => {
    const [photoDB, setPhotoDB] = useState(null);


    return (
        <ImageContext.Provider value={{ photoDB, setPhotoDB}}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImages = () => useContext(ImageContext);










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