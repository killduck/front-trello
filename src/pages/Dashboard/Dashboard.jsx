import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";
import axios from "axios";

import { useState, useEffect } from "react";


export default function Dashboard(props) {

  const [columns, setColumns] = useState([]);
  const [show, setShowElement] = useState(true);
  const [newName, setText] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/test')
      .then(function (response) {
        setColumns(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onClickAdd = () => {
    if (newName !== '') {
      setColumns([...columns, {
        id: 3,
        name: newName,
        order: 3,
        cards: [],
      }
      ]);
      setShowElement(true);
    }
    else {
      return false;
    }
  }

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

                <span>
                  тут нужен код добавления карточек
                  {/* можно использовать компоненты: CreateNewBoardItem и AddOneMoreCol. */}
                </span>
               
              </Column>
            )
          }
          <CreateNewBoardItem
            className={show ? styles.none : ''}
            buttonText={'Добавить список'}
            spellCheck="false"
            dir="auto"
            maxLength="512"
            autoComplete="off"
            name="Ввести заголовок списка"
            placeholder="Ввести заголовок списка"
            aria-label="Ввести заголовок списка"
            data-testid="list-name-textarea"
            autoFocus={show ? false : true}
            hideElAction={setShowElement}
            showFlag={true}
            changeAction={setText}
            newText={newName}
            addColumnAction={onClickAdd}
            newColName={columns}
          />
          <AddOneMoreCol
            className={show ? '' : styles.none}
            // hidden={show? 'hidden' : ''}
            buttonText={'Добавьте еще одну колонку'}
            showElAction={setShowElement}
            showFlag={false}
          />

        </div>

      </Default>

    </div>
  )
};
