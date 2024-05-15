import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuFavourite.module.scss';


export default function DropDownMenuFavourite(props) {

  let list_boards_favourite = props.data;

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
                    cardTheme={board.cardTheme}
                    cardName={board.cardName}
                    cardImg={board.cardImg}
                    cardIcon={'Star'}
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
