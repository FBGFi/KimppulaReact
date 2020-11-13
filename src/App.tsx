import React, {useState,useRef} from 'react';
import './App.css';

import Highlight from "./components/Highlight";
import SocialLinks from "./components/SocialLinks";
import Content from "./components/Content";

import logo from "./assets/images/logo.svg";

// @ts-ignore
const webTexts = window._WEB_TEXTS;
// @ts-ignore
const background = window._IMAGES.julkiSivu;

function App() {  
  const appRef = useRef<HTMLDivElement>(null);
  const [socialLinksPadding, setSocialLinksPadding] = useState(0);

  const setHighLightPadding = (px: Number) => {
    if(appRef.current){
      appRef.current.style.paddingTop = `${px}px`;
    }
  }

  return (
    <div ref={appRef} className="App">
      {webTexts.highLight !== "" ? <Highlight setPadding={setHighLightPadding} text={webTexts.highLight} /> : null}
      <div className="background-image-container" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery/${background})`}}>
        <div className="shader"></div>
      </div>
      <Content paddingBottom={socialLinksPadding} />
      <SocialLinks setPadding={setSocialLinksPadding} links={webTexts.linkit} />
      <img className="background-logo" src={logo} alt="logo" />  
    </div>
  );
}

export default App;
