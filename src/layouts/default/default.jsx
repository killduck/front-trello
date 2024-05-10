import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";

import styles from './Default.module.scss'

export default function Default(props) {
  return (
    <div>
      <Header />

      <main className={styles.Content}>

        {/* <nav></nav>

        <Search />

        <div>
          уведомления
          информация
          аккаунт
        </div> */}
        <Search />



      </main>
    </div >
  )
};
