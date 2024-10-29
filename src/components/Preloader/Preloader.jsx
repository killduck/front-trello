import styles from "./Preloader.module.scss";

export default function Preloader(props){

  let style = props.style;

  return (
    <div className={styles.preloaderWrap} style={style}>
        <div className={styles.preloader} />
        <div style={{marginLeft:'10px'}}>
            загрузка
            <span>...</span>
        </div>
    </div>
  )
};
