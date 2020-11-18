import React, {BaseSyntheticEvent, useRef} from 'react';
import './LandingPage.css';

import WebTexts from "../../constants/interfaces/WebTexts";

interface LandingPageProps {
    webTexts: WebTexts
}

const LandingPage = (props: LandingPageProps) => {
    const hiddenRef = useRef<HTMLDivElement>(null);
    const texts = props.webTexts.aloitusSivu;
    const hiddenTexts = props.webTexts.lisaTiedot;

    const showHiddenTexts = (e: any) => {
        if(hiddenRef.current){
            e.target.style.display = "none";
            hiddenRef.current.classList.add('show');
        }
    }

    const mapTexts = (arr: Array<String>, initDirection: boolean) => {
        let directions = initDirection ? [' left', ' right'] : [' right', ' left'];
        return arr.map((text: String, index: number) => {
            let className = 'body-text';

            className += index % 2 === 0 ? directions[0] : directions[1];

            return (
                <p key={index.toString()} className={className}>{text}</p>
            );
        });
    }

    return (
        <div className="LandingPage">
            <div className="description-container">
                {mapTexts(texts, true)}
            </div>
            <div className="hidden-texts">
                <button className="title-text" onClick={showHiddenTexts}>Lue lisää!</button>
                <div ref={hiddenRef} className="hidden-container">
                    {mapTexts(hiddenTexts, false)}
                </div>
            </div>
            <div className="shop-links">
                <p className="body-text">Voit tilata kukat myös suoraan verkkokaupasta</p>
                <a className="title-text" href={props.webTexts.linkit.ekukka} title="eKukan verkkokauppa" target="_blank" rel="noreferrer">eKukan verkkokauppa</a>
                <a className="title-text" href={props.webTexts.linkit.interflora} title="Interfloran verkkokauppa" target="_blank" rel="noreferrer">Interfloran verkkokauppa</a>
            </div>
        </div>
    );
}

export default LandingPage;