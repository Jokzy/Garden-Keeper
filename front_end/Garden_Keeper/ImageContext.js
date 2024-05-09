import React, { createContext, useContext, useState } from 'react';


const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);

    const addImage = (newImageBase64) => {
        const newImage = {
            id: images.length + 1,  // Ensuring each image has a unique id
            uri: newImageBase64,
        };
        setImages(currentImages => [...currentImages, newImage]);
    };

    return (
        <ImageContext.Provider value={{ images, addImage }}>
            {children}
        </ImageContext.Provider>
    );
};