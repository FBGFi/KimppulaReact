import React from 'react';
import './LandingPage.css';

import WebTexts from "../../constants/interfaces/WebTexts";

interface LandingPageProps {
    webTexts: WebTexts
}

const LandingPage = (props: LandingPageProps) => {
    const texts = props.webTexts.aloitusSivu;

    return (
        <div className="LandingPage">
            <div className="description-container">
                {texts.map((text: String, index: number) => {
                    let className = 'body-text';

                    className += index % 2 === 0 ? ' left' : ' right';

                    return (
                        <p key={index.toString()} className={className}>{text}</p>
                    );
                })}
            </div>
            <div className="shop-links">
                <a className="title-text" href={props.webTexts.linkit.ekukka} title="eKukan verkkokauppa" target="_blank" rel="noreferrer">eKukan verkkokauppa</a>
                <a className="title-text" href={props.webTexts.linkit.interflora} title="Interfloran verkkokauppa" target="_blank" rel="noreferrer">Interfloran verkkokauppa</a>
            </div>
        </div>
    );
}

export default LandingPage;