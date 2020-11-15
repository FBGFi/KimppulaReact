import React, { useRef, useState, useEffect } from 'react';
import './Content.css';

import Header from "../Header";
import Gallery from "../Gallery";

import LandingPage from "../../pages/LandingPage";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import ContactsPage from "../../pages/ContactsPage";

interface ContentProps {
    paddingBottom: number
    images: {
        ajanKohtaista: String
    }
}

// @ts-ignore
const webTexts = window._WEB_TEXTS;

const mousePos = { top: 0, y: 0 };

let lastScroll = 0;

const Content = (props: ContentProps) => {
    const [currentPage, setCurrentPage] = useState(<LandingPage webTexts={webTexts} />);
    const [contentMaxed, setContentMaxed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fadeOutRef = useRef<HTMLDivElement>(null);

    const mouseDownHandler = function (e: MouseEvent) {
        if (containerRef.current) {
            // Change the cursor and prevent user from selecting the text
            mousePos.top = containerRef.current.scrollTop;
            mousePos.y = e.clientY;
            containerRef.current.style.cursor = 'grabbing';
            containerRef.current.style.userSelect = 'none';
        }

        document.addEventListener('mousemove', mouseMoveHandler);
    };

    const mouseUpHandler = function () {
        if (containerRef.current) {
            containerRef.current.style.cursor = 'grab';
            containerRef.current.style.removeProperty('user-select');
        }
        document.removeEventListener('mousemove', mouseMoveHandler);
    };

    const mouseMoveHandler = function (e: MouseEvent) {
        // How far the mouse has been moved
        const dy = e.clientY - mousePos.y;

        if (containerRef.current) {
            // Scroll the element
            containerRef.current.scrollTop = mousePos.top - dy;
        }
    };

    const setContent = async(destination: String) => {
        if(containerRef.current){          
            containerRef.current.scrollTo({top: 0, behavior: 'smooth'});
            containerRef.current.className = 'content-container fade';
        }
        await new Promise(res => setTimeout(() => res(),500));
        switch (destination) {
            case 'etusivu':
                setCurrentPage(<HomePage />);
                break;
            case 'tuotteet':
                setCurrentPage(<ProductsPage banner={props.images.ajanKohtaista} webTexts={webTexts} />);
                break;
            case 'yhteystiedot':
                setCurrentPage(<ContactsPage webTexts={webTexts} />);
                break;
            default:
                setCurrentPage(<LandingPage webTexts={webTexts} />);
                break;
        }
        if(containerRef.current){          
            containerRef.current.className = 'content-container';
            lastScroll = 0;
        }
    }

    const setHeaderHeight = (height: Number) => {
        if (fadeOutRef.current) {
            fadeOutRef.current.style.top = height + 'px';
        }
    }

    const minimizeContent = () => {
        if(contentRef.current){
            contentRef.current.className = "Content";  
            setContentMaxed(false);
        } 
    }

    useEffect(() => {       
        document.addEventListener('mouseup', mouseUpHandler);
        document.addEventListener('mousedown', mouseDownHandler);

        containerRef.current?.addEventListener('scroll', (e) => {
            if(!containerRef.current || !contentRef.current) return;
            
            if(containerRef.current.scrollTop > lastScroll+5 && window.innerWidth <= 850 && !contentMaxed){
                contentRef.current.className = "Content align-top";  
                setContentMaxed(true);
            } 
            lastScroll = containerRef.current.scrollTop;  
        });

    }, []);    

    return (
        <div ref={contentRef} className="Content">
            <Header setHeaderHeight={setHeaderHeight} contentMaxed={contentMaxed} minimizeContent={minimizeContent} setPage={setContent} />
            <div ref={containerRef} className="content-container" style={{ paddingBottom: `${props.paddingBottom * 2}px` }}>
                <div ref={fadeOutRef} className="fade-out"></div>
                {currentPage}
                <div className="fade-in"></div>
            </div>
        </div>
    );
}

export default Content;