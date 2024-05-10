import Button from '../ui/Button/Button';
import styles from './Header.module.scss';
import Logo from "../../components/logo/logo.jsx";
import Notification from "../ui/Button/Notification.jsx";
export default function Header(props) {
    return (
        <div className={styles.Header}>
            <Logo/>
        <nav></nav>


        <div>
          <Notification/>
          информация
          аккаунт
        </div>


            <Button>Создать</Button>
        </div>
    )
};
