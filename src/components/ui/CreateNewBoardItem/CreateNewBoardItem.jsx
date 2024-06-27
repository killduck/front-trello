

import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import styles from "./CreateNewBoardItem.module.scss";


export default function CreateNewBoardItem(props) {
    // console.log(props);
    let addColumnAction = props.addColumnAction;
    let spellCheck = props.spellCheck;
    let dir = props.dir;
    let maxLength = props.maxLength;
    let autoComplete = props.autoComplete;
    let name = props.name;
    let placeholder = props.placeholder;
    let ariaLabel = props.ariaLabel;
    let dataTestid = props.dataTestid;
    let autoFocus = props.autoFocus;
    let changeAction = props.changeAction;
    let newColName = props.newColName;
    let buttonText = props.buttonText;
    let hideElAction = props.hideElAction;
    let showFlag = props.showFlag;
    let className = props.className;

    return (

        <div className={className ? className : styles.wrapForm}>
            <form className={styles.form}>
                <textarea
                    className={styles.textarea}
                    spellCheck={spellCheck}
                    dir={dir}
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                    name={name}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    data-testid={dataTestid}
                    autoFocus={autoFocus} //не работает???
                    onChange={(evt) => changeAction(evt.target.value)}
                    value={className ? '' : undefined}
                />
                <div className={styles.buttons}>
                    <Button
                        className={`${styles.buttonAdd}`}
                        type="button" // нужно заменить на: type="submit" ???
                        dataTestid="list-composer-add-list-button"
                        clickAction={addColumnAction}
                        actionVariable={newColName}
                    >
                        {buttonText}
                    </Button>
                    <Button
                        className={`${styles.buttonEsc}`}
                        type="button"
                        dataTestid="list-composer-cancel-button"
                        ariaLabel="Отменить редактирование"
                        clickAction={hideElAction}
                        actionVariable={showFlag}
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
