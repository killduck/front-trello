import Button from '../ui/Button/Button';
import InputSearch from '../ui/InputSearch/InputSearch';
import styles from './Search.module.scss';

export default function Search(props) {
    return (
        <div className={styles.Search}>

            <InputSearch/>
            <Button>Поиск</Button>
        </div>
    )
};
