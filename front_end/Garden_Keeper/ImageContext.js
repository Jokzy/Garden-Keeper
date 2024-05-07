import React, { createContext, useContext, useState } from 'react';


const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [gImages, setGImages] = useState([]);

    const addImage = (newImageUri) => {
        const newImage = {
            id: images.length + 1,  // Ensuring each image has a unique id
            uri: newImageUri,
        };
        setImages(currentImages => [...currentImages, newImage]);
    };

    const addGardenImage = (newImageUri) => {
        const newImage = {
            id: gImages.length + 1,  // Ensuring each image has a unique id
            uri: newImageUri,
        };
        setGImages(currentImages => [...currentImages, newImage]);
    };

    return (
        <ImageContext.Provider value={{ images, addImage, gImages, addGardenImage }}>
            {children}
        </ImageContext.Provider>
    );
};