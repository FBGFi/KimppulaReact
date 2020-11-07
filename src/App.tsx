import React from 'react';
import './App.css';

import Gallery from "./components/Gallery";
import OpeningHours from "./components/OpeningHours";
import Highlight from "./components/Highlight";
import SocialLinks from "./components/SocialLinks";

// @ts-ignore
const webTexts = window._WEB_TEXTS;

function App() {
  
  return (
    <div className="App">
      {webTexts.highLight !== "" ? <Highlight text={webTexts.highLight} /> : null}
      <OpeningHours hours={webTexts.aukiOlo} />
      <Gallery />
      <SocialLinks links={webTexts.linkit} />
    </div>
  );
}

export default App;
