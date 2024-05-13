

import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import styles from "./AddNewBoardItem.module.scss";

export default function AddNewBoardItem(props){
    return (
    
        <div className={styles.AddNewBoardItem}>

            <div className={styles.wrapForm}>
                <form className={styles.form}>
                    <textarea
                        className={styles.textarea} 
                        spellcheck="false" 
                        dir="auto" maxlength="512" 
                        autocomplete="off" 
                        name="Ввести заголовок списка" 
                        placeholder="Ввести заголовок списка" 
                        aria-label="Ввести заголовок списка" 
                        data-testid="list-name-textarea" 
                        // style="height: 32px;"
                    />
                    <div className={styles.buttons}>
                        <Button 
                            className={`${styles.buttonAdd} ${styles.buttonStyle}`}
                            type="submit" 
                            data-testid="list-composer-add-list-button"
                        >
                            Добавить список
                        </Button>
                        <Button
                            className={`${styles.buttonEsc} ${styles.buttonStyle}`} 
                            type="button" 
                            data-testid="list-composer-cancel-button" 
                            aria-label="Отменить редактирование"
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
            <div className={styles.AddNewBoardItem}>
                <Button className={`${styles.Button} ${styles.buttonStyle}`} >
                    <Icons 
                        className={styles.Icons}
                        name={'AddIcon'}
                        sizeWidth={'24px'}
                        sizeHeight={'24px'}
                        color={'#fff'}
                        sizeLine={'#fff'}
                        viewBox={'0 0 24 24'}
                    ></Icons>
                    Добавьте еще одну колонку 
                </Button>
            </div>    

        </div>

        

    )
};

