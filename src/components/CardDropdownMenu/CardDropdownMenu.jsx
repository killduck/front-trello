
import styles from './CardDropdownMenu.module.scss';

import { NavLink } from 'react-router-dom';

export default function CardDropdownMenu(props) {

  return (
    <div>
      
      <NavLink to='workspace' className={styles.CardDropdownMenu}>
        <div className={styles.Icon}>
          <div className={styles.IconLetter}>
            {props.cardName.substring(0, 1).toUpperCase()}
          </div>
        </div>
        <p className={styles.CardTitle}>
          {props.cardName}
        </p>
      </NavLink>
      
    </div>
  )
};
