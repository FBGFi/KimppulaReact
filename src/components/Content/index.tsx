import React, { useRef, useState } from 'react';
import './Content.css';

import Header from "../Header";
import Gallery from "../Gallery";

import LandingPage from "../../pages/LandingPage";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import ContactsPage from "../../pages/ContactsPage";

interface ContentProps {
    paddingBottom: number
}

// @ts-ignore
const webTexts = window._WEB_TEXTS;

const mousePos = { top: 0, y: 0 };

const Content = (props: ContentProps) => {
    const [currentPage, setCurrentPage] = useState(<LandingPage webTexts={webTexts} />);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseDownHandler = function (e: MouseEvent) {               
        if(containerRef.current){
            // Change the cursor and prevent user from selecting the text
            mousePos.top = containerRef.current.scrollTop;
            mousePos.y = e.clientY;
            containerRef.current.style.cursor = 'grabbing';
            containerRef.current.style.userSelect = 'none';
        }

        document.addEventListener('mousemove', mouseMoveHandler);
    };

    const mouseUpHandler = function () {
        if(containerRef.current){
            containerRef.current.style.cursor = 'grab';
            containerRef.current.style.removeProperty('user-select');
        }
        document.removeEventListener('mousemove', mouseMoveHandler);
    };

    const mouseMoveHandler = function(e: MouseEvent) {
        // How far the mouse has been moved
        const dy = e.clientY - mousePos.y;               
    
        if(containerRef.current){
            // Scroll the element
            containerRef.current.scrollTop = mousePos.top - dy;
        }
    };
    
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('mousedown', mouseDownHandler);

    const setContent = (destination: String) => {
        switch(destination){
            case 'etusivu': 
                setCurrentPage(<HomePage />);
            break;
            case 'tuotteet': 
                setCurrentPage(<ProductsPage webTexts={webTexts} />);
            break;
            case 'yhteystiedot': 
                setCurrentPage(<ContactsPage webTexts={webTexts} />);
            break;
            default: 
                setCurrentPage(<LandingPage webTexts={webTexts} />);
            break;
        }
    }

    return (
        <div className="Content">
            <Header setPage={setContent} />
            <div ref={containerRef} className="content-container" style={{ paddingBottom: `${props.paddingBottom * 2}px` }}>
                {currentPage}
            </div>
        </div>
    );
}

export default Content;