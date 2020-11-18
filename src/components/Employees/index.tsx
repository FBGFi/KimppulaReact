import React from 'react';
import './Employees.css';

import Person from '../../constants/interfaces/Person';

// @ts-ignore
const images = window._IMAGES.employees;

interface EmployeeProps{
    person: Person,
    index: number
}
interface EmployeesProps{
    texts: Array<Person>
}

const Employee = (props: EmployeeProps) => {
    return(
        <div className="employee">
            <img draggable="false" src={`${process.env.PUBLIC_URL}/images/employees/${images[props.index]}`} alt={props.person.name} />
            <p className="title-text">{props.person.name}</p>
            <p className="body-text">{props.person.title}</p>
        </div>
    );
}

const Employees = (props: EmployeesProps) => {
    return(
        <div className="Employees">
            {props.texts.map((p: Person, index: number) => <Employee key={index} person={p} index={index} />)}
        </div>
    );
}

export default Employees;