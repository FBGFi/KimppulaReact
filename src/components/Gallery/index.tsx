import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';

import GalleryImageObject from "../../constants/interfaces/GalleryImageObject";

// @ts-ignore
const galleryImages = window._IMAGES.gallery;

interface GalleryModalProps {
    imageInfo: GalleryImageObject,
    closeGallery: Function,
    setImageToView: Function,
    currentIndex: number
}
interface GalleryImageProps {
    imageInfo: GalleryImageObject,
    onImageClick: Function,
    index: number
}
interface GalleryProps {
}

const GalleryModal = (props: GalleryModalProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const dimensions = (): { width: string, height: string } => {
        let width = window.innerWidth * 0.9;
        let height = width * 9 / 16;
        return { width: width + 'px', height: height + 'px' };
    }

    const next = () => {
        let index = props.currentIndex + 1;
        if (index >= galleryImages.length) {
            index = 0;
        }
        props.setImageToView(galleryImages[index], index);
    }

    const previous = () => {
        let index = props.currentIndex - 1;
        if (index < 0) {
            index = galleryImages.length - 1;
        }
        props.setImageToView(galleryImages[index], index);
    }

    useEffect(() => {
        if (imageRef.current) {
            let maxHeight = window.innerHeight * 0.8;
            imageRef.current.style.maxHeight = maxHeight + 'px';
            imageRef.current.style.maxWidth = maxHeight * 16 / 9 + 'px';
        }

        window.addEventListener('resize', () => {
            if (imageRef.current) {
                imageRef.current.style.width = dimensions().width;
                imageRef.current.style.height = dimensions().height;
            }
        });
    }, []);

    return (
        <div className="gallery-modal-container">
            <div ref={containerRef} className="zoomed-image">
                <div
                    className="image-container"
                    ref={imageRef}
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery/${props.imageInfo.file})`,
                        width: dimensions().width,
                        height: dimensions().height
                    }}
                />
                <div className="description">{props.imageInfo.text}</div>
                <button className="close-gallery" onClick={(e) => props.closeGallery(e)}>
                    <i className="fas fa-window-close"></i>
                </button>
                <button className="previous" onClick={previous}><i className="fas fa-arrow-alt-circle-left"></i></button>
                <button className="next" onClick={next}><i className="fas fa-arrow-alt-circle-right"></i></button>
            </div>
        </div>
    );
}

const GalleryImage = (props: GalleryImageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    let image = new Image();
    let width = 0;
    let height = 0;
    let src = `${process.env.PUBLIC_URL}/images/gallery/${props.imageInfo.file}`;

    image.onload = () => {
        width = image.width;
        height = image.height;
        if (containerRef.current && imageRef.current) {
            containerRef.current.style.height = containerRef.current.offsetWidth + 'px';
            width < height ? imageRef.current.style.maxWidth = '100%' : imageRef.current.style.maxHeight = '100%'
        }
    }

    image.src = src;

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (containerRef.current) {
                containerRef.current.style.height = containerRef.current.offsetWidth + 'px';
            }
        })
    }, [])

    return (
        <div ref={containerRef} className="image-container" >
            <img
                draggable={false}
                ref={imageRef}
                onClick={() => props.onImageClick(props.imageInfo, props.index)}
                className="gallery-image"
                src={src}
                alt={props.imageInfo.alt} />
        </div>
    );
}

const Gallery = (props: GalleryProps) => {
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(-1);

    const closeGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentImage(null);
    }

    const setImageToView = (imageInfo: GalleryImageObject, index: number) => {
        setCurrentImageIndex(index);
        setCurrentImage(<GalleryModal setImageToView={setImageToView} currentIndex={index} imageInfo={imageInfo} closeGallery={closeGallery} />);
    }

    return (
        <div className="Gallery">
            {currentImage}
            <h2 className="title-text">Kuvagalleria</h2>
            <div className="images">
                {galleryImages.map((obj: GalleryImageObject, index: number) => <GalleryImage
                    key={index.toString()}
                    index={index}
                    imageInfo={obj}
                    onImageClick={setImageToView} />)}
            </div>
        </div>
    );
}

export default Gallery;