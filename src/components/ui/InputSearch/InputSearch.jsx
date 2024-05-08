

import InputTeg from '../InputTeg/InputTeg'
import Loupe from '../Loupe/Loupe'
import styles from './InputSearch.module.scss'

export default function InputSearch(props){
    console.log(props.className);
    return (

        <div className={props.className ? props.className : styles.blockSearch}> 
            <Loupe className={styles.iconLupa} viewBox='0 0 24 24'></Loupe>
            <InputTeg className={styles.inputSearch} type="text" placeholder="Поиск" maxLength="500"/>
        </div>

    )
};
