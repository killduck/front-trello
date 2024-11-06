import Header from "../../components/Header/Header";

import styles from './Default.module.scss';


export default function Default(props) {

  let backGroundImage = props.backGroundImage;

  return (
    <div>
      <Header />
      <main className={`${styles.Content} ${styles.bgc}`} style={backGroundImage}>
        <div className={styles.main_wrap}>
          {props.children}
        </div>
      </main>
    </div>
  )
};
