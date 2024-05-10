

import Button from '../ui/Button/Button';
import Loupe from '../Loupe/Loupe';
import styles from './Search.module.scss';
import Input from '../ui/Input/Input';

export default function Search(props) {
    // console.log(props);
    return (
        <div className={styles.Search}>

            <div className={props.className ? props.className : styles.blockSearch}> 
                <Loupe className={props.className ? props.className : styles.iconLupa} viewBox="" />
                <Input className={props.className ? props.className : styles.inputSearch} type="text" placeholder="Поиск" maxLength="500"/>
            </div>

            <Button>Поиск</Button>

            {/* <Loupe className="s"></Loupe> */}

            {/* <InputTeg className='her'></InputTeg> */}
        </div>
    )
};
