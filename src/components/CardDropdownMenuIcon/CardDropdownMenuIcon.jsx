import QuickLabelled from '../ui/QuickLabelled/QuickLabelled'

import styles from './CardDropdownMenuIcon.module.scss'


export default function CardDropdownMenuIcon(props) {

  let option = {
    cardTheme: props.cardTheme,
    cardName: props.cardName,
    cardImg: props.cardImg,
    cardIcon: props.cardIcon
  }

  return (
    <a className={styles.CardDropdownMenuIcon} href="#">
      <div className={styles.Image}>
        <img className={styles.ImageBackground} src={`img/${option.cardImg}`} alt="" />
      </div>
      <div className={styles.CardText}>
        <div className={styles.CardTheme}>
          {option.cardTheme}
        </div>
        <div className={styles.CardTitle}>
          {option.cardName}
        </div>
      </div>
      <div className={styles.CardIcon}>
        <QuickLabelled
          iconName={option.cardIcon}
          class_name={`BtnCardDropdown${option.cardIcon}`}
        />
      </div>
    </a >

  )
};
