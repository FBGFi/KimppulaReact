import React, {useState,useRef} from 'react';
import './App.css';

import Highlight from "./components/Highlight";
import SocialLinks from "./components/SocialLinks";
import Content from "./components/Content";
import LoadingScreen from "./pages/LoadingScreen";

import logo from "./assets/images/logo.svg";

// @ts-ignore
const webTexts = window._WEB_TEXTS;
// @ts-ignore
const images = window._IMAGES;

function App() {  
  const appRef = useRef<HTMLDivElement>(null);
  const [socialLinksPadding, setSocialLinksPadding] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);

  let loadingScreen = null;

  const setHighLightPadding = (px: Number) => {
    if(appRef.current){
      appRef.current.style.paddingTop = `${px}px`;
    }
  }
  
  if(!pageLoaded){
    loadingScreen = <LoadingScreen images={images.gallery} setPageLoaded={setPageLoaded} />;
  }
  

  return (
    <div ref={appRef} className="App">
      {loadingScreen}
      <div id="site">
        <div className="background-image-container" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery/${images.julkiSivu})`}}>         
          {webTexts.highLight !== "" ? <Highlight text={webTexts.highLight} /> : null}
          <div className="shader"></div>
        </div>
        <Content paddingBottom={socialLinksPadding} />
        <SocialLinks setPadding={setSocialLinksPadding} links={webTexts.linkit} />
        <img className="background-logo" src={logo} alt="logo" />
      </div>  
    </div>
  );
}

export default App;
