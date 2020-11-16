import React, { useRef, useEffect } from 'react';
import './LoadingScreen.css';

import logo from '../../assets/images/logo.svg';

import GalleryImageObject from "../../constants/interfaces/GalleryImageObject";

// @ts-ignore
const preloadjs = window.createjs;
// @ts-ignore
const webImages = window._IMAGES;

interface LoadingScreenProps {
    setPageLoaded: Function,
    images: Array<GalleryImageObject>
}

const LoadingScreen = (props: LoadingScreenProps) => {
    const queue = new preloadjs.LoadQueue();
    const loadBarRef = useRef<HTMLDivElement>(null);
    const loadingScreenRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    const handleLoad = () => {
        if (loadBarRef.current && logoRef.current) {
            loadBarRef.current.style.width = queue.progress * 100 + '%';
            logoRef.current.style.filter = `invert(1) blur(${10 - queue.progress * 10}px)`;
        }
    }

    const handleLoadComplete = async () => {
        await new Promise(res => setTimeout(() => res(), 800));
        loadingScreenRef.current?.classList.add('fading');
        await new Promise(res => setTimeout(() => res(), 2000));
        props.setPageLoaded(true)
    }

    useEffect(() => {
        for (let img of webImages.gallery) {
            queue.loadFile({ src: `${process.env.PUBLIC_URL}/images/gallery/${img.file}`, type: preloadjs.Types.IMAGE });
        }
        queue.loadFile({ src: `${process.env.PUBLIC_URL}/images/gallery/${webImages.ajanKohtaista}`, type: preloadjs.Types.IMAGE });
        queue.loadFile({ src: `${process.env.PUBLIC_URL}/images/gallery/${webImages.julkiSivu}`, type: preloadjs.Types.IMAGE });
        queue.on('fileload', () => handleLoad());

        queue.on('complete', () => handleLoadComplete());
    }, []);

    return (
        <div ref={loadingScreenRef} className="LoadingScreen">
            <img ref={logoRef} className="logo" src={logo} alt="logo" />
            <div ref={loadBarRef} className="loading-bar"></div>
        </div>
    );
}
export default LoadingScreen;