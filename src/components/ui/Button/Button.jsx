

import styles from "./Button.module.scss";

export default function Button(props) {
    // console.log(props.actionVariable);
    
    return (
        <button 
            className={`${props.className} ${styles.buttonStyle}`}
            type={props.type} 
            data-testid={props.dataTestid} 
            aria-label={props.ariaLabel} 
            onClick={ 
                () => props.clickAction(props.actionVariable)
            }
            
        >
            {props.children}
        </button>
    )
};
