
import Header from "../../components/Header/Header";

import styles from './Default.module.scss';

// import backgroundImage from '../../../public/img/background_desert.webp';


export default function Default(props) {
  return (
    <div>
      <Header />
      <main className={`${styles.Content} ${styles.bgc}`}>
        {props.children}
      </main>
    </div>
  )
};
