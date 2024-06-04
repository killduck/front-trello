

import styles from "./Button.module.scss";

export default function Button(props) {

    let class_name = props.className;
    let type = props.type;
    let dataTestid = props.dataTestid;
    let ariaLabel = props.ariaLabel;
    let clickAction = props.clickAction;
    let actionVariable = props.actionVariable;

    return (
        <button
            className={`${class_name} ${styles[class_name]} ${styles.buttonStyle}`}
            type={type}
            data-testid={dataTestid}
            aria-label={ariaLabel}
            onClick={() => clickAction(actionVariable)}
        >
            {props.children}
        </button>
    )
};
