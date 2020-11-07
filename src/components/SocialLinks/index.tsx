import React from 'react';
import './SocialLinks.css';

import interFloraLogo from '../../assets/images/interflora.png';
import eKukkaLogo from '../../assets/images/ekukka.png';

interface Links{
    [key:string]: string;
}
interface SocialLinksProps{
    links: Links
}

const SocialLinks = (props: SocialLinksProps) => {
    return(
        <div className="SocialLinks">
            <a href={props.links.facebook} target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-square"></i>
            </a>
            <a href={props.links.instagram} target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
            </a>
            {/* <a href={props.links.ekukka} target="_blank" rel="noreferrer">           
                <img src={eKukkaLogo} title="eKukka verkkokauppa" />
            </a>
            <a href={props.links.interflora} target="_blank" rel="noreferrer">            
                <img src={interFloraLogo} title="Interfloran verkkokauppa" />
            </a> */}
        </div>
    );
}

export default SocialLinks;