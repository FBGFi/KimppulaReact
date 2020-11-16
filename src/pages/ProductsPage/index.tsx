import React from 'react';
import './ProductsPage.css';

import WebTexts from "../../constants/interfaces/WebTexts";

interface ProductsPageProps{
    webTexts: WebTexts
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
        </div>
    );
}

export default ProductsPage;