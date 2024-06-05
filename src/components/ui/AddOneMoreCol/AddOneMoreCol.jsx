

import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import styles from "./AddOneMoreCol.module.scss";

export default function AddOneMoreCol(props){
    
    let className = props.className;
    let showElAction = props.showElAction;
    let showFlag = props.showFlag;
    let buttonText = props.buttonText;

    return (
        <div 
            className={className? `${className} ${styles.wrapForm}` : styles.wrapForm} >
            <Button 
                className={styles.AddOneMoreColButton}
                clickAction={showElAction}
                actionVariable={showFlag}
            >
                <Icons 
                    className={styles.Icons}
                    name={'AddIcon'}
                    sizeWidth={'24px'}
                    sizeHeight={'24px'}
                    color={'#fff'}
                    sizeLine={'#fff'}
                    viewBox={'0 0 24 24'}
                />
                {buttonText}
            </Button>
        </div>

    )
};

