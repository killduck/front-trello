import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuRecent.module.scss';


export default function DropDownMenuRecent(props) {

  let list_boards = props.data;

  return (
    <div className={styles.DropDownMenuRecent_Wrap}>
      <ul>
        {
          list_boards.map((board, index) =>
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
      </ul>

    </div>
  )
};
