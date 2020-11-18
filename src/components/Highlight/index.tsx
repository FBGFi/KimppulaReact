import React from 'react';
import './Highlight.css';

interface HighlightProps{
    text: string;
}

const Highlight = (props: HighlightProps) => {

    return(
        <div className="Highlight">
            <p className="body-text">{props.text}</p>
        </div>
    );
}

export default Highlight;