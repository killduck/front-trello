import Button from '../ui/Button/Button';
import styles from './header.module.scss';
import Logo from "../../components/logo/logo.jsx";
export default function Header(props) {
    return (
        <div className={styles.Header}>
            <Logo/>
        <nav></nav>


        <div>
          уведомления
          информация
          аккаунт
        </div>


            <Button>Создать</Button>
        </div>
    )
};
