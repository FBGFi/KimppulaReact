import React, {useRef, useEffect} from 'react';
import './Highlight.css';

interface HighlightProps{
    text: string;
    setPadding: Function
}

const Highlight = (props: HighlightProps) => {
    const highLightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.setPadding(highLightRef.current?.offsetHeight);       
    });

    return(
        <div ref={highLightRef} className="Highlight">
            <p className="body-text">{props.text}</p>
        </div>
    );
}

export default Highlight;