import React, {useState} from 'react';
import './Header.css';

interface HeaderProps{
    setPage: Function
}

const Header = (props: HeaderProps) => {
    const [activeMenu, setActiveMenu] = useState("landing");

    const clickedLink = (destination: string) => {
        if(activeMenu === destination) return;
        setActiveMenu(destination);
        props.setPage(destination);
    }

    return(
        <header className="Header">
            <div id="primary-menu">
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