import React from 'react';
import './ProductsPage.css';

import WebTexts from "../../constants/interfaces/WebTexts";

interface ProductsPageProps{
    webTexts: WebTexts
    banner: String
}

const ProductsPage = (props: ProductsPageProps) => {
    const texts = props.webTexts.tuotteet;
    return(
        <div className="ProductsPage">
            {texts.map((text: String, index: number) => {
                    let className = 'body-text';

                    className += index%2 === 0 ? ' left' : ' right';                   
                    
                    return (
                        <p key={index.toString()} className={className}>{text}</p>
                    );
            })}
            <img draggable={false} alt="Ajankohtaista" src={`${process.env.PUBLIC_URL}/images/${props.banner}`} />
        </div>
    );
}

export default ProductsPage;