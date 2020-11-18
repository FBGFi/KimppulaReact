import Links from './Links';
import Hours from './Hours';
import Product from "./Product";
import Person from "./Person";

interface WebTexts{
    highLight: String,
    aukiOlo: Hours,
    linkit: Links,
    aloitusSivu: Array<String>,
    lisaTiedot: Array<String>,
    tuotteet: Array<Product>,
    tyonTekijat: Array<Person>,
    osoite: Array<String>,
    puhNro: String,
    sPosti: String,
    mobilePay: Number,
    verkkoLasku: String,
    verkkoLaskuOperaattori: String
}

export default WebTexts;