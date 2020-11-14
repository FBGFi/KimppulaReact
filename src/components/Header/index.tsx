import React, {useState, useRef, useEffect} from 'react';
import './Header.css';

interface HeaderProps{
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
        if(activeMenu === destination) return;
        setActiveMenu(destination);
        props.setPage(destination);
    }

    const openMobileMenu = async(e: React.MouseEvent<HTMLButtonElement>) => {
        if(primaryMenuRef.current && mobileMenuRef.current){
            mobileMenuRef.current.className = "clicked";
            primaryMenuRef.current.className = "show";
        }       
    }

    const minimizeContent = () => {
        props.minimizeContent();
    }

    useEffect(() => {
        document.body.addEventListener('click', async(e: any) => { 
            if(window.innerWidth >= 550) return;          
            if(primaryMenuRef.current && mobileMenuRef.current && e.target?.id !== mobileMenuRef.current.id){
                mobileMenuRef.current.className = "";  
                await new Promise(res => setTimeout(() => res(), 400));
                primaryMenuRef.current.className = "";
            }            
        }); 
        props.setHeaderHeight(headerRef.current?.offsetHeight);
    }, []);   

    return(
        <header ref={headerRef} className="Header">
            <button id="content-minimize" className={props.contentMaxed ? "show" : ""} ref={minimizeRef} onClick={minimizeContent}><i className="fas fa-arrow-alt-circle-down"></i></button>
            <button id="mobile-menu" ref={mobileMenuRef} onClick={openMobileMenu}><i className="fas fa-bars"></i></button>
            <div ref={primaryMenuRef} id="primary-menu">
                <button 
                    style={
                        activeMenu === "etusivu" ? {fontWeight:  "bold", transform: "scale(1.1)"} : {}
                    } 
                    className="menu-link title-text" 
                    onClick={() => clickedLink("etusivu")}>Etusivu</button>
                <button 
                    style={
                        activeMenu === "tuotteet" ? {fontWeight:  "bold", transform: "scale(1.1)"} : {}
                    } 
                    className="menu-link title-text" 
                    onClick={() => clickedLink("tuotteet")}>Tuotteet&Palvelut</button>
                <button 
                    style={
                        activeMenu === "yhteystiedot" ? {fontWeight:  "bold", transform: "scale(1.1)"} : {}
                    } 
                    className="menu-link title-text" 
                    onClick={() => clickedLink("yhteystiedot")}>Yhteystiedot</button>
            </div>
        </header>
    );
}

export default Header;