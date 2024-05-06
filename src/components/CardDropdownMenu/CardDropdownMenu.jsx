import styles from './CardDropdownMenu.module.scss'

export default function CardDropdownMenu(props) {

  // const string = 'some string';
  // console.log(string.substring(0, 1));
  // string.charAt(0);



  return (

    <a className={styles.CardDropdownMenu} href="#">
      <div className={styles.Icon}>
        <div className={styles.IconLetter}>
          {props.cardName.substring(0, 1).toUpperCase()}
        </div>
      </div>
      <p className={styles.Text}>
        {props.cardName}
      </p>
    </a>

  )
};
