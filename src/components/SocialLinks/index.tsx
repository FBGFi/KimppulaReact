import React, {useRef,useEffect} from 'react';
import './SocialLinks.css';

import Links from '../../constants/interfaces/Links';

interface SocialLinksProps{
    links: Links,
    setPadding: Function
}

const SocialLinks = (props: SocialLinksProps) => {   
    const socialLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(socialLinksRef.current){
            props.setPadding(window.innerHeight - socialLinksRef.current.getBoundingClientRect().top); 
        }      
    });
    return(
        <div ref={socialLinksRef} className="SocialLinks">
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