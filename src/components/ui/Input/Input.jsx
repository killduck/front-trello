
import styles from "./Input.module.scss";
import { useState } from "react";

export default function Input(props){
    
    const [input_text, setInput] = useState('');

    return (
        <input 
            name={props.name}
            value={console.log(input_text)}
            className={props.className ? props.className : styles.Input} 
            type={props.type} 
            placeholder={props.placeholder} 
            maxLength={props.maxlength}
            onChange={(evt) => setInput(evt.target.value)}
        />
    )
};

