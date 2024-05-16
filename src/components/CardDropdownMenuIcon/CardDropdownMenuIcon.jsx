import QuickLabelled from '../ui/QuickLabelled/QuickLabelled'

import styles from './CardDropdownMenuIcon.module.scss'


export default function CardDropdownMenuIcon(props) {

  let card = props.card;

  let option = {
    cardIcon: props.cardIcon,
    actionFunction: props.actionFunction,
  }

  return (
    <a className={styles.CardDropdownMenuIcon} href="#">
      <div className={styles.Image}>
        <img className={styles.ImageBackground} src={`img/${card.cardImg}`} alt="" />
      </div>
      <div className={styles.CardText}>
        <div className={styles.CardTheme}>
          {card.cardTheme}
        </div>
        <div className={styles.CardTitle}>
          {card.cardName}
        </div>
      </div>
      <div className={
        card.favorites ?
          `${styles.CardIcon} ${styles.IconActive}`
          :
          styles.CardIcon
      }>
        <QuickLabelled
          iconName={option.cardIcon}
          class_name={`BtnCardDropdown${option.cardIcon}`}
          favoriteStar={card.favorites}
          actionFunction={option.actionFunction}
          id_card={card.id}
        />
      </div>
    </a >

  )
};
