import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";
import axios from "axios";

import { useState, useEffect } from "react";


export default function Dashboard(props) {

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/test')
      .then(function (response) {
        setColumns(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  const [_show, showElement] = useState(true);
  const [_newName, takeNewName] = useState('');
  // console.log(_newName);
  const [_newCol, addColumn] = useState(columns);

  const onClickAdd = () => {
    // console.log(_newName);
    if (_newName !== '') {
      // console.log('56__ da');
      addColumn([..._newCol, {
        id: 3,
        name: _newName,
        order: 3,
        cards: [],
      }
      ]);
      showElement(true);
    }
    else {
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
            columns.map((column) =>
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

              </Column >
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

        </div >

      </Default >

    </div >
  )
};
