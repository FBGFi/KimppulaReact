import React, {useRef} from 'react';
import './LandingPage.css';

import loadingIcon from '../../assets/images/loading.svg';

import WebTexts from "../../constants/interfaces/WebTexts";

interface LandingPageProps {
    webTexts: WebTexts,
    banner: string
}

const LandingPage = (props: LandingPageProps) => {
    const bannerRef = useRef<HTMLImageElement>(null);
    const texts = props.webTexts.aloitusSivu;

    let img = new Image();
    let src = `${process.env.PUBLIC_URL}/images/${props.banner}`;

    img.onload = () => {
        if(bannerRef.current){
            bannerRef.current.src = src;
            bannerRef.current.classList.remove('loading');
        }        
    };

    img.src = src;

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
            {props.banner !== "" ? <img className="loading" ref={bannerRef} draggable={false} alt="Ajankohtaista" src={loadingIcon} /> : null}
        </div>
    );
}

export default LandingPage;