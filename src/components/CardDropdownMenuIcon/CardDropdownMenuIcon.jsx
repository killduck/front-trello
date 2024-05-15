import { useState } from "react";

import QuickLabelled from '../ui/QuickLabelled/QuickLabelled'

import styles from './CardDropdownMenuIcon.module.scss'


export default function CardDropdownMenuIcon(props) {

  let [stateFavouriteStar, setStateFavouriteStar] = useState(false);

  let option = {
    cardTheme: props.cardTheme,
    cardName: props.cardName,
    cardImg: props.cardImg,
    cardIcon: props.cardIcon,
    action: props.actionFunction,
  }

  function onAddFavoriteStar() {
    console.log('Проверка выполения функции =>', onAddFavoriteStar.name);

    stateFavouriteStar ?
      setStateFavouriteStar(false)
      :
      setStateFavouriteStar(true)
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
        stateFavouriteStar ?
        `${styles.CardIcon} ${styles.IconActive}`
          :
          styles.CardIcon
      }>
        <QuickLabelled
          iconName={option.cardIcon}
          class_name={`BtnCardDropdown${option.cardIcon}`}
          stateFavouriteStar={stateFavouriteStar}
          actionFunction={onAddFavoriteStar}
        />
      </div>
    </a >

  )
};
