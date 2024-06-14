
import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuRecent.module.scss';

import { NavLink } from 'react-router-dom';

export default function DropDownMenuRecent(props) {

  let list_boards = props.data;
  let actionFunction = props.actionFunction;

  return (
    <div className={styles.DropDownMenuRecent_Wrap}>
      <ul>
        {
          list_boards.map((board, index) =>
            <li key={board.id}>

              <NavLink to='recent' className={styles.CardDropdownMenuIcon} >
                <CardDropdownMenuIcon
                  card={board}
                  cardIcon={'Star'}
                  actionFunction={actionFunction}
                />
              </NavLink>

              
            </li>
          )
        }
      </ul>

    </div>
  )
};
