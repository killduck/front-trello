import CardDropdownMenuIcon from "../CardDropdownMenuIcon/CardDropdownMenuIcon";

import styles from './DropDownMenuRecent.module.scss';


export default function DropDownMenuRecent(props) {

  let list_boards = props.data;
  let actionFunction = props.actionFunction;

  return (
    <div className={styles.DropDownMenuRecent_Wrap}>
      <ul>
        {
          list_boards.map((board, index) =>
            <li key={board.id}>
              <CardDropdownMenuIcon
                card={board}
                cardIcon={'Star'}
                actionFunction={actionFunction}
              />
            </li>
          )
        }
      </ul>

    </div>
  )
};
