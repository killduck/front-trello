

import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import styles from "./AddOneMoreCol.module.scss";

export default function AddOneMoreCol(props){
    return (
        <div 
            className={props.className? `${props.className} ${styles.wrapForm}` : styles.wrapForm} >
            <Button 
                className={styles.AddOneMoreColButton}
                clickAction={props.showElAction}
                actionVariable={props.boolian}
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
                {props.buttonText}
            </Button>
        </div>

    )
};

