import React from 'react';
import '../Gallery.css';

const ImagesSlide = (props) => {
    const imageData = props.imageData;
    return (
        <>
            <div>
                <img src={imageData} />
            </div>
        </>
    );
};

export default ImagesSlide;