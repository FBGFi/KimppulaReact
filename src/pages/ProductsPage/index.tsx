import React from 'react';
import './ProductsPage.css';

import WebTexts from "../../constants/interfaces/WebTexts";
import Product from "../../constants/interfaces/Product";

import eKukka from "../../assets/images/eKukka.png";

interface ProductsPageProps {
    webTexts: WebTexts
}

const ProductsPage = (props: ProductsPageProps) => {
    const texts = props.webTexts.tuotteet;
    return (
        <div className="ProductsPage">
            <div className="shop-container">
                <a href={props.webTexts.linkit.ekukka} target="_blank" rel="noreferrer" title="eKukan verkkokauppa"><img src={eKukka} alt="eKukka" /></a>
            </div>
            {texts.map((p: Product, index: number) => {
                const textList = (arr: Array<string>) => {
                    let list = arr.map((text: string, index: number) => <li key={index.toString()}>{text}</li>);
                    return (<ul className="body-text">{list}</ul>);
                }

                return (
                    <div key={index.toString()} className="row">
                        <p className="title-text">{p.title}</p>
                        {p.list ? textList(p.list) : null}
                    </div>
                );
            })}
        </div>
    );
}

export default ProductsPage;