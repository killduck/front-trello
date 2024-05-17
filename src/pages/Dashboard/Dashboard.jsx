import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";

import { useState } from "react";


export default function Dashboard(props) {
// console.log(props);

  let columns = [
    {
      id: 1,
      name: "backlog",
      order: 1,
      cards: [
        {
          id: 1,
          name: "Максим es lint",
          author_id: 3,
          order: 1,
        },
        {
          id: 2,
          name: "Лёня хреначит реакт компоненты",
          author_id: 2,
          order: 2,
        }
      ]
    },
    {
      id: 2,
      name: "in progress",
      order: 2,
      cards: [
        {
          id: 3,
          name: "Кнопки меню",
          author_id: 4,
          order: 1,
        }
      ]
    },
  ]

  const [_show , showElement] = useState(true);
  const [_newName, takeNewName] = useState('');
  // console.log(_newName);
  const [_newCol, addColumn] = useState(columns);

  const onClickAdd = ()=>{
    // console.log(_newName);
    if(_newName !== ''){
      // console.log('56__ da');
      addColumn([ ..._newCol, {
          id: 3,
          name: _newName,
          order: 3,
          cards:[],
        }
      ]);
      showElement(true);
    }
    else{
      // console.log('56__ net');
      return false;
    }
  }

  // console.log(columns);

  return (
    <div>
      <Default>
        <div className={styles.Columns}>
          {
            _newCol.map((column) =>
              <Column
                key={column.id}
                dataColumn={column}
              >

              {/* <CreateNewBoardItem
                className={_show ? styles.none : ''}
                buttonText={'Добавить карточку'}
                spellCheck="false"
                dir="auto"
                maxLength="512"
                autoComplete="off"
                name="Ввести заголовок списка"
                placeholder="Ввести заголовок списка"
                aria-label="Ввести заголовок списка"
                data-testid="list-name-textarea"
                autoFocus={_show ? false : true}
                hideElAction={showElement}
                boolian={true}
                changeAction={takeNewName}
                newText={_newName}
                addColumnAction={onClickAdd}
                newColName={_newCol}
              />
              <AddOneMoreCol
                className={_show ? '' : styles.none}
                buttonText={'Добавить карточку_'}
                showElAction={showElement}
                boolian={false}
              /> */}

              </Column>
            )
          }
          <CreateNewBoardItem
            className={_show ? styles.none : ''}
            buttonText={'Добавить список'}
            spellCheck="false"
            dir="auto"
            maxLength="512"
            autoComplete="off"
            name="Ввести заголовок списка"
            placeholder="Ввести заголовок списка"
            aria-label="Ввести заголовок списка"
            data-testid="list-name-textarea"
            autoFocus={_show ? false : true}
            hideElAction={showElement}
            boolian={true}
            changeAction={takeNewName}
            newText={_newName}
            addColumnAction={onClickAdd}
            newColName={_newCol}
          />
          <AddOneMoreCol
            className={_show ? '' : styles.none}
            // hidden={show? 'hidden' : ''}
            buttonText={'Добавьте еще одну колонку'}
            showElAction={showElement}
            boolian={false}
          />

        </div>

      </Default>

    </div>
  )
};
