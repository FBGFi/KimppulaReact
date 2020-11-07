import React from 'react';
import './App.css';

import Gallery from "./components/Gallery";
import OpeningHours from "./components/OpeningHours";
import Highlight from "./components/Highlight";
import SocialLinks from "./components/SocialLinks";
import Header from "./components/Header";

import logo from "./assets/images/logo.svg";

// @ts-ignore
const webTexts = window._WEB_TEXTS;

function App() {  
  return (
    <div className="App">
      {webTexts.highLight !== "" ? <Highlight text={webTexts.highLight} /> : null}
      <Header />
      <OpeningHours hours={webTexts.aukiOlo} />
      <Gallery />
      <SocialLinks links={webTexts.linkit} />
      <img className="background-logo" src={logo} alt="logo" />
    </div>
  );
}

export default App;
