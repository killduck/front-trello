
import styles from "./InputTeg.module.scss";
import { useState } from "react";

export default function InputTeg(props){
    
    const [inputSearch, setInput] = useState('');

    return (
        <input 
            name={props.name}
            value={console.log(inputSearch)}
            className={props.className ? props.className : styles.inputTeg} 
            type={props.type} 
            placeholder={props.placeholder} 
            maxLength={props.maxlength}
            onChange={(evt) => setInput(evt.target.value)}
        />
    )
};

