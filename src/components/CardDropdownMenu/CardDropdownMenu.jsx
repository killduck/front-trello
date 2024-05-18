import styles from './CardDropdownMenu.module.scss'


export default function CardDropdownMenu(props) {

  return (

    <a className={styles.CardDropdownMenu} href='#'>
      <div className={styles.Icon}>
        <div className={styles.IconLetter}>
          {props.cardName.substring(0, 1).toUpperCase()}
        </div>
      </div>
      <p className={styles.CardTitle}>
        {props.cardName}
      </p>
    </a>

  )
};
