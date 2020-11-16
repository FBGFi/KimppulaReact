import React from 'react';
import './LandingPage.css';

import WebTexts from "../../constants/interfaces/WebTexts";

interface LandingPageProps {
    webTexts: WebTexts,
    banner: String
}

const LandingPage = (props: LandingPageProps) => {
    const texts = props.webTexts.aloitusSivu;

    return (
        <div className="LandingPage">
            <div className="description-container">
                {texts.map((text: String, index: number) => {
                    let className = 'body-text';

                    className += index%2 === 0 ? ' left' : ' right';                   
                    
                    return (
                        <p key={index.toString()} className={className}>{text}</p>
                    );
                })}
            </div>          
            {props.banner !== "" ? <img draggable={false} alt="Ajankohtaista" src={`${process.env.PUBLIC_URL}/images/${props.banner}`} /> : null}
        </div>
    );
}

export default LandingPage;