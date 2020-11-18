import React from 'react';
import './ContactsPage.css';

import OpeningHours from "../../components/OpeningHours";
import WebTexts from "../../constants/interfaces/WebTexts";

interface ContactsPageProps {
    webTexts: WebTexts
}

const ContactsPage = (props: ContactsPageProps) => {
    return (
        <div className="ContactsPage">
            <OpeningHours hours={props.webTexts.aukiOlo} />
            <p className="body-text">Juhlapyhinä aukioloajat saattavat muuttua.</p>
            <ul className="body-text">
                {props.webTexts.osoite.map((row: String, index: number) =>
                    <li key={index.toString()}>{row}</li>
                )}
                <li>{props.webTexts.puhNro}</li>
            </ul>
            <p className="body-text">{props.webTexts.sPosti}</p>
            <ul className="body-text separate">
                <li><span className="title-text">MobilePay:</span><br/>{props.webTexts.mobilePay}</li>
                <li><span className="title-text">Verkkolaskuosoite/OVT-tunnus:</span><br />{props.webTexts.verkkoLasku}</li>
                <li><span className="title-text">Verkkolaskuoperaattori:</span><br />{props.webTexts.verkkoLaskuOperaattori}</li>
            </ul>
        </div>
    );
}

export default ContactsPage;