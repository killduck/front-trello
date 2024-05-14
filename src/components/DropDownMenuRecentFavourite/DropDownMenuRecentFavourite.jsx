import { useState } from "react";

import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuRecentFavourite.module.scss';


export default function DropDownMenuRecentFavourite(props) {

  let list_boards = props.data;
  console.log(list_boards);

  let [stateFavourites, setStateFavourites] = useState(false);


  function onAddFavorite() {
    console.log('Проверка выполения функции =>', onAddFavorite.name);

    stateFavourites ?
      setStateFavourites(false)
      :
      setStateFavourites(true)
  }


  return (
    <div className={styles.DropDownMenuRecentFavourite_Wrap}>
      <ul>

        {
          list_boards.map((board, index) =>
            <li>
              <CardDropdownMenuIcon
                cardTheme={board.cardTheme}
                cardName={board.cardName}
                cardImg={board.cardImg}
                cardIcon={'Star'}
              />
            </li>
          )
        }

        {/* <li>
          <CardDropdownMenuIcon
            cardTheme={"Диплом 31"}
            cardName={"Ilya Poletuev's workspace"}
            cardImg={'background_desert.webp'}
            cardIcon={'Star'}
          />
        </li>
        <li>

          <CardDropdownMenuIcon
            cardTheme={"Single Page (Laravel + React)"}
            cardName={"Иван Кузьмин: рабочее пространство"}
            cardImg={'Background_blue.svg'}
            cardIcon={'Star'}
          />
        </li> */}
      </ul>

    </div>
  )
};
