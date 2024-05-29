

import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import styles from "./CreateNewBoardItem.module.scss";


export default function CreateNewBoardItem(props){
    // console.log(props);

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
                    autoFocus={props.autoFocus} //не работает???
                    onChange={(evt) => props.changeAction(evt.target.value)}
                    // value={props.newText}
                />
                <div className={styles.buttons}>
                    <Button 
                        className={`${styles.buttonAdd}`}
                        type="button" // нужно заменить на: type="submit" ???
                        dataTestid="list-composer-add-list-button"
                        clickAction={props.addColumnAction}
                        actionVariable={props.newColName.value}
                    >
                        {props.buttonText}
                    </Button>
                    <Button
                        className={`${styles.buttonEsc}`}
                        type="button" 
                        dataTestid="list-composer-cancel-button" 
                        ariaLabel="Отменить редактирование"
                        clickAction={props.hideElAction}
                        actionVariable={props.showFlag}
                    >
                        <Icons 
                            className={styles.Icons}
                            name={'CloseIcon'}
                        ></Icons>
                    </Button>
                </div>
            </form>
        </div>
        
    )
};

