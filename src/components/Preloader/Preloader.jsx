
import styles from "./Preloader.module.scss";

export default function Preloader(props){
  return (
    <div className={styles.preloaderWrap}>
        <div className={styles.preloader} />
        <div style={{marginLeft:'10px'}}>
            загрузка
            <span>...</span>
        </div>
    </div>
  )
};

