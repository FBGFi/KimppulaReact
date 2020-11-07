import React from 'react';
import './Highlight.css';

interface HighlightProps{
    text: string;
}

const Highlight = (props: HighlightProps) => {
    return(
        <div className="Highlight">
            {props.text}
        </div>
    );
}

export default Highlight;