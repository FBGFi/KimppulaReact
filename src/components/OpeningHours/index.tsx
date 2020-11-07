import React from 'react';
import './OpeningHours.css';

interface Hours {
    [key: string]: string;
}
interface OpeningHoursProps {
    hours: Hours;
}

const OpeningHours = (props: OpeningHoursProps) => {
    let hours: Hours = {};
    let keys = Object.keys(props.hours);
    let key: (keyof Hours);
    let lastKeyIndex = 0;
    let oldKey: string;

    hours.ma = props.hours.ma;
    for (let i = 1; i < keys.length; i++) {
        key = keys[i];
        if (props.hours[key] !== hours[Object.keys(hours)[lastKeyIndex]]) {
            hours[key] = props.hours[key];
            lastKeyIndex++;   
        } else {
            oldKey = Object.keys(hours)[lastKeyIndex];
            delete hours[oldKey];
            hours[`${oldKey.slice(0, 2)}-${key}`] = props.hours[key];
        }
    }

    return (
        <div className="OpeningHours">
            {Object.keys(hours).map(key => <p key={key}>{key}: {hours[key]}</p>)}
        </div>
    )
}

export default OpeningHours;