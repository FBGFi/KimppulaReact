import React from 'react';
import './SocialLinks.css';

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
        </div>
    );
}

export default SocialLinks;