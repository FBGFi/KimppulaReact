import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';

import loadingIcon from '../../assets/images/loading.svg';

import GalleryImageObject from "../../constants/interfaces/GalleryImageObject";

// @ts-ignore
const galleryImages = window._IMAGES.gallery;

// global variables for changing the current dimensions
let currentImageIndex = 0;
let currentImageWidth = 0;
let currentImageHeight = 0;
let switching = false;

// global variables to prevent image being clicked while dragged
let startY = 0;
let endY = 0;

interface GalleryModalProps {
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
    contentDiv: HTMLDivElement
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
            width < height ? imageRef.current.style.maxWidth = '100%' : imageRef.current.style.maxHeight = '100%';
            imageRef.current.src = src;
            imageRef.current.classList.remove('loading');
            containerRef.current.style.display = "inline";
        }
    }

    image.src = src;

    const setToSquare = () => {
        if (containerRef.current) {
            containerRef.current.style.height = containerRef.current.offsetWidth + 'px';
        }
    }

    const setImageToView = (e: any) => {
        endY = e.target.getBoundingClientRect().y
        if(startY !== endY) return;
        props.onImageClick(props.index);
    }

    useEffect(() => {
        window.addEventListener('resize', setToSquare);
        return () => {
            window.removeEventListener('resize', setToSquare);
        }
    }, [])

    return (
        <div ref={containerRef} style={{display: "flex"}} className="image-container" >
            <img
                draggable={false}
                ref={imageRef}
                onClick={setImageToView}
                className="gallery-image loading"
                src={loadingIcon}
                alt={props.imageInfo.alt} />
        </div>
    );
}

const GalleryModal = (props: GalleryModalProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const previousRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    currentImageIndex = props.currentIndex;

    let image = new Image();
    let src = `${process.env.PUBLIC_URL}/images/gallery/${galleryImages[currentImageIndex].file}`;

    image.onload = () => {
        currentImageWidth = image.width;
        currentImageHeight = image.height;
        if (imageRef.current) {
            setDimensions();
            imageRef.current.src = src;
            imageRef.current.classList.remove('loading');
        }
    }

    image.src = src;

    const dimensions = (): { width: string, height: string } => {
        let width: number = window.innerWidth * 0.9;
        let height: number = currentImageHeight * (width / currentImageWidth);

        if (currentImageHeight > currentImageWidth) {
            height = window.innerHeight * 0.9 * 0.8;
            width = currentImageWidth * (height / currentImageHeight)
        }

        if (width > window.innerWidth * 0.9) {
            width = window.innerWidth * 0.9;
            height = currentImageHeight * (width / currentImageWidth);
        }
        return { width: width + 'px', height: height + 'px' };
    }

    const next = (e: React.MouseEvent<HTMLButtonElement>) => {
        currentImageIndex++;
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        props.setImageToView(currentImageIndex);
        highLightButton(e.target);
    }

    const previous = (e: React.MouseEvent<HTMLButtonElement>) => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        props.setImageToView(currentImageIndex);
        highLightButton(e.target);
    }

    const setDimensions = () => {
        if (imageRef.current && descriptionRef.current) {
            imageRef.current.style.maxHeight = window.innerHeight * 0.9 * 0.8 + 'px';
            imageRef.current.style.maxWidth = window.innerHeight * 0.9 * 0.8 * (currentImageWidth / currentImageHeight) + 'px';
            descriptionRef.current.style.maxWidth = imageRef.current.style.maxWidth;
            imageRef.current.style.width = dimensions().width;
            descriptionRef.current.style.width = imageRef.current.style.width;
            imageRef.current.style.height = dimensions().height;
        }
    }

    const highLightButton = async (target: any) => {
        target.classList.add('clicked');
        await new Promise(res => setTimeout(res, 500));
        target.classList.remove('clicked');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if(switching) return;
        switching = true;
        
        switch (e.key) {
            case "ArrowRight":
                    if(nextRef.current) nextRef.current.click();
                break;
            case "ArrowLeft":
                    if(previousRef.current) previousRef.current.click();
                break;
            case "Escape": 
                    if(closeRef.current) closeRef.current.click();
                break;
            default:
                break;
        }       
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        switching = false;    
    }

    useEffect(() => {
        window.addEventListener('resize', setDimensions);
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        if(containerRef.current){
            containerRef.current.classList.remove('hidden');
        }
        return () => {
            switching = false;
            window.removeEventListener('resize', setDimensions);
            document.onkeypress = null;
            document.onkeyup = null;
        };
    }, []);

    return (
        <div ref={containerRef} className="gallery-modal-container hidden">
            <div className="zoomed-image">
                <div className="image-container">
                    <img
                        ref={imageRef}
                        src={loadingIcon}
                        alt={galleryImages[currentImageIndex].alt}
                        className='loading' />
                </div>
                <div ref={descriptionRef} className="description">
                    <p className="body-text">{galleryImages[currentImageIndex].text}</p>
                    <button ref={previousRef} className="previous" onClick={previous}><i className="fas fa-arrow-alt-circle-left"></i></button>
                    <button ref={nextRef} className="next" onClick={next}><i className="fas fa-arrow-alt-circle-right"></i></button>
                </div>
                <button ref={closeRef} className="close-gallery" onClick={(e) => {
                    props.closeGallery(e);
                }}>
                    <i className="fas fa-window-close"></i>
                </button>
            </div>
        </div>
    );
}

const Gallery = (props: GalleryProps) => {
    const [currentImage, setCurrentImage] = useState<any>(null);

    const closeGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.contentDiv.removeAttribute('style');
        setCurrentImage(null);
    }

    const setImageToView = (index: number) => {
        if(currentImage === null){
            props.contentDiv.style.zIndex = '5';
        }
        setCurrentImage(<GalleryModal currentIndex={index} setImageToView={setImageToView} closeGallery={closeGallery} />);
    }

    const mouseDownHandler = (e: any) => {
        startY = e.target.getBoundingClientRect().y;   
    }

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownHandler);
        return () => {
            document.removeEventListener('mousedown', mouseDownHandler);
        }
    }, []);

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