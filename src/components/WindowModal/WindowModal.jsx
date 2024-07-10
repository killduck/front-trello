
import styles from "./WindowModal.module.scss"


export default function WindowModal(props){
    console.log(props);
  return (
    <div className={styles.wrap}>
        <h2>WindowPortal</h2>
        <p>Текст модального окна</p>
        <div className={styles.header}>
          header    
        </div>
        <div className={styles.mainCol}>
          mainCol    
        </div>
        <div className={styles.sidebar}>
          sidebar    
        </div>

    </div>
  )
};

