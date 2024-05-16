import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuFavourite.module.scss';


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
                <li>
                  <CardDropdownMenuIcon
                    key={board.id}
                    card={board}
                    cardIcon={'Star'}
                    actionFunction={actionFunction}
                  />
                </li>
              )
            }
          })
        }
      </ul>

    </div >
  )
};
