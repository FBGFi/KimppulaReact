import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
    setPage: Function,
    minimizeContent: Function,
    contentMaxed: Boolean,
    setHeaderHeight: Function
}

const Header = (props: HeaderProps) => {
    const [activeMenu, setActiveMenu] = useState("landing");
    const mobileMenuRef = useRef<HTMLButtonElement>(null);
    const minimizeRef = useRef<HTMLButtonElement>(null);
    const primaryMenuRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const clickedLink = (destination: string) => {
        if (activeMenu === destination) return;
        setActiveMenu(destination);
        props.setPage(destination);
    }

    const openMobileMenu = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (primaryMenuRef.current && mobileMenuRef.current) {
            mobileMenuRef.current.className = "clicked";
            primaryMenuRef.current.className = "show";
        }
    }

    const minimizeContent = () => {
        props.minimizeContent();
    }

    const setHeaderHeight = () => props.setHeaderHeight(headerRef.current?.offsetHeight);

    const hideMobileMenu = async (e: any) => {
        if (window.innerWidth >= 550) return;
        if (primaryMenuRef.current && mobileMenuRef.current && e.target?.id !== mobileMenuRef.current.id) {
            mobileMenuRef.current.className = "";
            await new Promise(res => setTimeout(() => res(), 400));
            primaryMenuRef.current.className = "";
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', hideMobileMenu);
        props.setHeaderHeight(headerRef.current?.offsetHeight);
        window.addEventListener('resize', setHeaderHeight);

        return () => {
            window.removeEventListener('resize', setHeaderHeight);
            document.body.removeEventListener('click', hideMobileMenu);
        }
    }, []);

    return (
        <header ref={headerRef} className="Header">
            <button id="content-minimize" className={props.contentMaxed ? "show" : ""} ref={minimizeRef} onClick={minimizeContent}><i className="fas fa-arrow-alt-circle-down"></i></button>
            <button id="mobile-menu" ref={mobileMenuRef} onClick={openMobileMenu}><i className="fas fa-bars"></i></button>
            <div ref={primaryMenuRef} id="primary-menu">

                <div className="button-container">
                    <button
                        style={
                            activeMenu === "etusivu" ? { fontWeight: "bold", transform: "scale(1.1)" } : {}
                        }
                        className="menu-link title-text"
                        onClick={() => clickedLink("etusivu")}>Etusivu</button>
                    <div className="slider" style={activeMenu === "etusivu" ? { width: "100%" } : {}}></div>
                </div>

                <div className="button-container">
                    <button
                        style={
                            activeMenu === "tuotteet" ? { fontWeight: "bold", transform: "scale(1.1)" } : {}
                        }
                        className="menu-link title-text"
                        onClick={() => clickedLink("tuotteet")}>Tuotteet&Palvelut</button>
                    <div className="slider" style={activeMenu === "tuotteet" ? { width: "100%" } : {}}></div>
                </div>

                <div className="button-container">
                    <button
                        style={
                            activeMenu === "yhteystiedot" ? { fontWeight: "bold", transform: "scale(1.1)" } : {}
                        }
                        className="menu-link title-text"
                        onClick={() => clickedLink("yhteystiedot")}>Yhteystiedot</button>
                    <div className="slider" style={activeMenu === "yhteystiedot" ? { width: "100%" } : {}}></div>
                </div>
            </div>
        </header>
    );
}

export default Header;