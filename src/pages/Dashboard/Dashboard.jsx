import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";

import { useState } from "react";


export default function Dashboard(props) {

  let columns = [
    {
      id: 1,
      name: "backlog",
      order: 1,
      cards:[
        {
          id: 1,
          name: "Лёня",
          author_id: 3,
          order: 1,
        },
        {
          id: 2,
          name: "Андрей",
          author_id: 2,
          order: 2,
        },
      ],
    },
    {
      id: 2,
      name: "in progress",
      order: 2,
      cards:[
        {
          id: 1,
          name: "Лёня",
          author_id: 4,
          order: 1,
        },
      ],
    },
  ]

  const [_show , showElement] = useState(true);
  const [_newName, takeNewName] = useState('');

  // const [_newColName, addColumn] = useState(check_newName(_newName));


  // function addColumn(_newName, columns){
  //   if(_newName !== ''){
  //     console.log(_newName);
  //     let newCol = {
  //       id: 3,
  //       name: _newName,
  //       order: 3,
  //       cards:[],
  //     };
  //     columns = [columns, newCol];
  //     return columns;
  //   }
  //   else{
  //     console.log('net');
  //     return false;
  //   }
  // }


  return (
    <div>
      
      <Default>
        
        <div className={styles.Columns}>
          {
            columns.map((column) => 
              <Column key={column.id} dataColumn={column}/>
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
            // addColumnAction={addColumn}
            // newColName={_newColName}
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
