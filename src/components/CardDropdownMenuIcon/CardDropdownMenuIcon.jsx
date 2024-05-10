import ButtonIcon from '../ui/ButtonIcon/ButtonIcon'
import styles from './CardDropdownMenuIcon.module.scss'

export default function CardDropdownMenu(props) {

  return (

    <a className={styles.CardDropdownMenu} href="#">
      <div className={styles.Image}>
        <img className={styles.ImageBackground} src={`img/${props.cardImg}`} alt="" />
      </div>
      <div className={styles.CardText}>
        <div className={styles.CardTheme}>
          {props.cardTheme}
        </div>
        <div className={styles.CardTitle}>
          {props.cardName}
        </div>
      </div>
      <div className={styles.CardIcon}>
        <ButtonIcon
          iconName={props.cardIcon}
          iconSize={props.cardIconSize}
          colorFillIcon={props.colorFillIcon}
          sizeLineIcon={props.sizeLineIcon}
        />
      </div>
    </a >

  )
};
