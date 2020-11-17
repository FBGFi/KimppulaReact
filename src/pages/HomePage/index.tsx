import React, {useRef} from 'react';
import './HomePage.css';

import loadingIcon from '../../assets/images/loading.svg';

import Gallery from "../../components/Gallery";

interface HomePageProps{
    contentDiv: HTMLDivElement,
    banner: string
}

const HomePage = (props: HomePageProps) => {
    const bannerRef = useRef<HTMLImageElement>(null);

    let img = new Image();
    let src = `${process.env.PUBLIC_URL}/images/${props.banner}`;

    img.onload = () => {
        if(bannerRef.current){
            bannerRef.current.src = src;
            bannerRef.current.classList.remove('loading');
        }        
    };

    img.src = src;
    
    return(
        <div className="HomePage">
            {props.banner !== "" ? <img className="banner loading" ref={bannerRef} draggable={false} alt="Ajankohtaista" src={loadingIcon} /> : null}
            <Gallery contentDiv={props.contentDiv} />
        </div>
    );
}

export default HomePage;