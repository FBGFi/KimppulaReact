import React from 'react';
import './Gallery.css';

// @ts-ignore
const galleryImages = window._IMAGES.gallery;

interface GalleryImageProps {
    src: string;
}
interface GalleryProps {
}

const GalleryImage = (props: GalleryImageProps) => {
    return(
        <img src={props.src} />
    );
}

const Gallery = (props: GalleryProps) => {
    return(
        <div className="Gallery">
            {galleryImages.map((img: string) => 
                <GalleryImage 
                    key={img} 
                    src={`${process.env.PUBLIC_URL}/images/gallery/${img}`} />
            )}
        </div>
    );
}

export default Gallery;