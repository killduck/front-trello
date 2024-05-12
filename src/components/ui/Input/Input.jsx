
import styles from "./Input.module.scss";
import { useState } from "react";

export default function Input(props) {

    const [input_text, setInput] = useState('');
    // console.log(input_text);

    return (
        <input
            name={props.name}
            value={input_text}
            className={props.className ? props.className : styles.input}
            type={props.type}
            placeholder={props.placeholder}
            maxLength={props.maxlength}
            onChange={(evt) => setInput(evt.target.value)}
        />
    )
};
