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

  const [show , showElement] = useState(false);
  const [hide, hideElement] = useState(false);
  // const formRef = useRef(null);

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
            className={!show ? styles.none : ''}
            buttonText={'Добавить список'} 
            spellCheck="false"
            dir="auto" 
            maxLength="512" 
            autoComplete="off" 
            name="Ввести заголовок списка" 
            placeholder="Ввести заголовок списка" 
            aria-label="Ввести заголовок списка" 
            data-testid="list-name-textarea" 
            action={hideElement}
          />
          <AddOneMoreCol 
            className={show ? styles.none : ''}
            // hidden={show? 'hidden' : ''}
            buttonText={'Добавьте еще одну колонку'} 
            clickAction={showElement}
          />

        </div>

      </Default>
    </div>
  )
};
