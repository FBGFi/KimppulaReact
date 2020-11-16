import React from 'react';
import './HomePage.css';

import Gallery from "../../components/Gallery";

interface HomePageProps{
    contentDiv: HTMLDivElement
}

const HomePage = (props: HomePageProps) => {
    return(
        <div className="HomePage">
            <Gallery contentDiv={props.contentDiv} />
        </div>
    );
}

export default HomePage;