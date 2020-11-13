import Links from './Links';
import Hours from './Hours';

interface WebTexts{
    highLight: String,
    aukiOlo: Hours,
    linkit: Links,
    aloitusSivu: Array<String>,
    tuotteet: Array<String>,
    osoite: Array<String>,
    puhNro: String,
    sPosti: String,
    mobilePay: Number,
    verkkoLasku: String,
    verkkoLaskuOperaattori: String
}

export default WebTexts;