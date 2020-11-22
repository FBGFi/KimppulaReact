import React, { useRef, useState, useEffect } from 'react';
import './Content.css';

import Header from "../Header";

import LandingPage from "../../pages/LandingPage";
import AboutUsPage from "../../pages/AboutUsPage";
import ProductsPage from "../../pages/ProductsPage";
import ContactsPage from "../../pages/ContactsPage";

interface ContentProps {
    paddingBottom: number
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
            containerRef.current.style.scrollBehavior = 'initial';
            mousePos.top = containerRef.current.scrollTop;
            mousePos.y = e.clientY;
        }
        document.addEventListener('mousemove', mouseMoveHandler);
    };

    const mouseUpHandler = function () {
        if (containerRef.current) {
            containerRef.current.style.scrollBehavior = 'smooth';
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

    // scroll the container when mouse not on top of the container
    const mouseScrollHandler = (e: any) => {
        if (containerRef.current) {
            if (!e.path.includes(containerRef.current)) {
                containerRef.current.style.scrollBehavior = 'initial';
                containerRef.current.scrollTop += e.deltaY / 2;
                containerRef.current.style.scrollBehavior = 'smooth';
            }
        }
    };

    const setContent = async (destination: String) => {
        if (containerRef.current) {
            try {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
            }
            containerRef.current.className = 'content-container fade';
        }
        await new Promise(res => setTimeout(() => res(), 500));
        switch (destination) {
            case 'etusivu':
                if (contentRef.current) {
                    setCurrentPage(<AboutUsPage webTexts={webTexts} contentDiv={contentRef.current} />);
                }
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
        if (containerRef.current) {
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
        if (contentRef.current) {
            contentRef.current.className = "Content";
            setContentMaxed(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', mouseUpHandler);
        document.addEventListener('mousedown', mouseDownHandler);
        document.addEventListener('wheel', mouseScrollHandler);

        // user has the crappiest web browser ever invented (aka safari)
        if (containerRef.current && containerRef.current.style.paddingLeft != 'clamp(40px, 10%, 60px)') {
            containerRef.current.style.paddingLeft = '40px';
            containerRef.current.style.paddingRight = '40px';
            containerRef.current.style.paddingTop = '40px';
        }

        containerRef.current?.addEventListener('scroll', (e) => {
            if (!containerRef.current || !contentRef.current) return;

            if (containerRef.current.scrollTop > lastScroll + 5 && window.innerWidth <= 850 && !contentMaxed) {
                contentRef.current.className = "Content align-top";
                setContentMaxed(true);
            }
            lastScroll = containerRef.current.scrollTop;
        });

    }, []);

    return (
        <div ref={contentRef} className="Content">
            <Header setHeaderHeight={setHeaderHeight} contentMaxed={contentMaxed} minimizeContent={minimizeContent} setPage={setContent} />
            <div
                ref={containerRef}
                className="content-container"
                style={{
                    paddingBottom: `${props.paddingBottom * 2}px`,
                    paddingTop: 'clamp(40px,10%,60px)',
                    paddingLeft: 'clamp(40px,10%,60px)',
                    paddingRight: 'clamp(40px,10%,60px)'
                }}>
                <div ref={fadeOutRef} className="fade-out"></div>
                {currentPage}
            </div>
        </div>
    );
}

export default Content;