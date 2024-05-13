

import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import styles from "./CreateNewBoardItem.module.scss";


export default function CreateNewBoardItem(props){

    return (
        
        <div className={props.className? props.className : styles.wrapForm}>
            <form className={styles.form}>
                <textarea
                    className={styles.textarea}
                    spellCheck={props.spellCheck}
                    dir={props.dir}
                    maxLength={props.maxLength}
                    autoComplete={props.autoComplete}
                    name={props.name}
                    placeholder={props.placeholder}
                    aria-label={props.ariaLabel}
                    data-testid={props.dataTestid}
                />
                <div className={styles.buttons}>
                    <Button 
                        className={`${styles.buttonAdd}`}
                        type="submit" 
                        dataTestid="list-composer-add-list-button"
                    >
                        {props.buttonText}
                    </Button>
                    <Button
                        className={`${styles.buttonEsc}`}
                        type="button" 
                        dataTestid="list-composer-cancel-button" 
                        ariaLabel="Отменить редактирование"
                    >
                        <Icons 
                            className={styles.Icons}
                            name={'CloseIcon'}
                            sizeWidth={'24px'}
                            sizeHeight={'24px'}
                            color={'#fff'}
                            sizeLine={'#fff'}
                            viewBox={'0 0 24 24'}
                        ></Icons>
                    </Button>
                </div>
            </form>
        </div>
        
    )
};

