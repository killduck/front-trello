

import styles from "./Button.module.scss";

export default function Button(props) {
    // console.log(props);
    return (
        <button 
            className={`${props.className} ${styles.buttonStyle}`}
            type={props.type} 
            data-testid={props.dataTestid} 
            aria-label={props.ariaLabel} 
            onClick={ 
                () => props.clickAction(true)
            }
            
        >
            {props.children}
        </button>
    )
};
