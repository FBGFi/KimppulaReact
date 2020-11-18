import React from 'react';
import './AboutUsPage.css';

import Employees from "../../components/Employees";
import Gallery from "../../components/Gallery";

import WebTexts from "../../constants/interfaces/WebTexts";

interface AboutUsPageProps{
    contentDiv: HTMLDivElement,
    webTexts: WebTexts
}

const AboutUsPage = (props: AboutUsPageProps) => {
    
    return(
        <div className="AboutUsPage">
            <p className="body-text">Tähän joku lyhyt esittelyteksti? Tähän joku lyhyt esittelyteksti? Tähän joku lyhyt esittelyteksti? Tähän joku lyhyt esittelyteksti?</p>
            <Employees texts={props.webTexts.tyonTekijat} />
            <Gallery contentDiv={props.contentDiv} />
        </div>
    );
}

export default AboutUsPage;