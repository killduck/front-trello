

import styles from "./Button.module.scss";

export default function Button(props) {

    let class_name = props.className;
    let type = props.type;
    let dataTestid = props.dataTestid;
    let ariaLabel = props.ariaLabel;
    let clickAction = props.clickAction ?? Function.prototype;
    let actionVariable = props.actionVariable;
    let style = props.style;

    return (
        <button
            className={`${styles.buttonStyle} ${styles[class_name]} `}
            type={type}
            data-testid={dataTestid}
            aria-label={ariaLabel}
            style={style}
            onClick={() => clickAction(actionVariable)}
        >
            {props.children}
        </button>
    )
};
