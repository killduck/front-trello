import QuickLabelled from '../ui/QuickLabelled/QuickLabelled'

import styles from './CardDropdownMenuIcon.module.scss'


export default function CardDropdownMenuIcon(props) {

  let option = {
    card: props.card,
    cardTheme: props.cardTheme,
    cardName: props.cardName,
    cardImg: props.cardImg,
    cardIcon: props.cardIcon,
    favoriteStar: props.favoriteStar,
    actionFunction: props.actionFunction,
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
      <div className={
        option.favoriteStar ?
          `${styles.CardIcon} ${styles.IconActive}`
          :
          styles.CardIcon
      }>
        <QuickLabelled
          iconName={option.cardIcon}
          class_name={`BtnCardDropdown${option.cardIcon}`}
          favoriteStar={option.favoriteStar}
          actionFunction={option.actionFunction}
          id_card={option.card.id}
        />
      </div>
    </a >

  )
};
