import { render } from '@testing-library/react';
import React, { Component, createRef, RefObject } from 'react';
import './LoadingScreen.css';

import logo from '../../assets/images/logo.svg';

// @ts-ignore
const preloadjs = window.createjs;

interface ILoadingScreen {
    queue: any,
    handleLoadProgress: Function,
    handleLoadComplete: Function,
    loadBarRef: RefObject<HTMLDivElement>
    loadingScreenRef: RefObject<HTMLDivElement>
}
interface LoadingScreenProps {
    setPageLoaded: Function,
    images: Array<String>
}

class LoadingScreen extends Component<LoadingScreenProps> implements ILoadingScreen {
    queue;
    loadBarRef = createRef<HTMLDivElement>();
    loadingScreenRef = createRef<HTMLDivElement>();
    logoRef = createRef<HTMLImageElement>();

    state = {
        loadState: 0
    }

    constructor(props: LoadingScreenProps) {
        super(props)
        this.queue = new preloadjs.LoadQueue();
    }

    handleLoadProgress() {
        if (this.loadBarRef.current && this.logoRef.current) {
            this.loadBarRef.current.style.width = this.queue.progress * 100 + '%';
            this.logoRef.current.style.filter = `invert(1) blur(${10 - this.queue.progress*10}px)`;           
        }
    }

    async handleLoadComplete() {
        await new Promise(res => setTimeout(() => res(), 800));
        this.loadingScreenRef.current?.classList.add('fading');
        await new Promise(res => setTimeout(() => res(), 2000));
        this.props.setPageLoaded(true)
    }

    componentDidMount() {
        this.queue.on('progress', () => this.handleLoadProgress());
        for (let img in this.props.images) {
            this.queue.loadFile({ src: `${process.env.PUBLIC_URL}/images/gallery/${img}`, type: preloadjs.Types.IMAGE });
        }
        this.queue.on('complete', () => this.handleLoadComplete());
    }

    render() {
        return (
            <div ref={this.loadingScreenRef} className="LoadingScreen">
                <img ref={this.logoRef} className="logo" src={logo} alt="logo" />
                <div ref={this.loadBarRef} className="loading-bar"></div>
            </div>
        );
    }
}
export default LoadingScreen;