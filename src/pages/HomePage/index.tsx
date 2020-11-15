import React from 'react';
import './HomePage.css';

import Gallery from "../../components/Gallery";

interface HomePageProps{

}

const HomePage = (props: HomePageProps) => {
    return(
        <div className="HomePage">
            <Gallery />
        </div>
    );
}

export default HomePage;