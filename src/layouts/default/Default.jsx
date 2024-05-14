import Header from "../../components/Header/Header";


import styles from './Default.module.scss'

export default function Default(props) {
  return (
    <div>

      <Header />

      <main className={styles.Content}>

        {props.children}

      </main>

    </div >
  )
};
