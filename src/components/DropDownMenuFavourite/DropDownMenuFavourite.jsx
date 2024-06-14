
import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuFavourite.module.scss';

import { NavLink } from 'react-router-dom';

export default function DropDownMenuFavourite(props) {

  let list_boards_favourite = props.data;
  let actionFunction = props.actionFunction;

  return (
    <div className={styles.DropDownMenuFavourite_Wrap}>

      <ul>
        {
          list_boards_favourite.map((board, index) => {

            if (board.favorites) {
              return (
                <li key={board.id}>

                  <NavLink to='favourites' className={styles.CardDropdownMenuIcon} >
                    <CardDropdownMenuIcon
                      card={board}
                      cardIcon={'Star'}
                      actionFunction={actionFunction}
                    />
                  </NavLink>

                </li>
              )
            }
          })
        }
      </ul>

    </div >
  )
};
