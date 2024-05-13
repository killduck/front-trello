

import Button from '../ui/Button/Button';
import styles from './Search.module.scss';
import Input from '../ui/Input/Input';
import Icons from '../ui/Icons/Icons';

export default function Search(props) {
    // console.log(props);
    return (
        <div className={styles.Search}>

            <div className={props.className ? props.className : styles.blockSearch}>
                <Icons className={styles.Loupe} name={'Loupe'} />
                <Input className={props.className ? props.className : styles.inputSearch} type="text" placeholder="Поиск" maxLength="500"/>
            </div>
        
            <Button>Поиск</Button>
            
        </div>
    )
};
