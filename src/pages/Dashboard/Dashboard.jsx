import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";
import axios from "axios";

import { useState, useEffect } from "react";


import { closestCenter, DndContext } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import request from "../../api/request";

const SortableColumns = ({ column }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <Column
        dataColumn={column}></Column>
    </div>
  );
};

export default function Dashboard(props) {

  const [columns, setColumns] = useState([]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    console.log(columns);

    editOrderColumns(active, over);
    // setColumns((column) => {
    //   const oldIndex = columns.findIndex((column) => column.id === active.id);
    //   const newIndex = columns.findIndex((column) => column.id === over.id);
    //   return arrayMove(columns, oldIndex, newIndex);
    // });
    new_order();
  };


  function editOrderColumns(active, over) {

    const oldIndex = columns.findIndex((column) => column.id === active.id);
    const newIndex = columns.findIndex((column) => column.id === over.id);

    let copy = arrayMove(columns, oldIndex, newIndex);

    copy.map((column, index) => {
      column.order = index;
    })

    setColumns(copy);
    return arrayMove(copy, oldIndex, newIndex);

  }

  const [showForm, setShowForm] = useState(true);
  const [newName, setText] = useState('');

  function new_order() {

    axios.post('http://127.0.0.1:8000/edite-columns/', columns)
      .then((response) => {

      })
      .catch((error) => {
        console.error(error);
      })
  }




  useEffect(() => {

    request("GET", 'columns/', (response) => { setColumns(response); })

  }, []);

  // # тут будем добавлять новую колонку
  function new_column_data(columns, new_name) {
    let new_column = {
      'id': 1,
      'name': new_name,
      'order': 1,
      'cards': [],
    };

    if (columns.length > 0) {
      let id_arr = [];
      let order_arr = [];
      columns.forEach((column) => {
        id_arr.push(column.id);
        order_arr.push(column.order);
      });
      new_column.id = Math.max.apply(null, id_arr) + 1;
      new_column.order = Math.max.apply(null, order_arr) + 1;
    }
    return new_column;
  }
  const onClickAdd = () => {
    if (newName !== '') {
      setColumns([...columns, new_column_data(columns, newName),]); // добавляем новую колонку
      setShowForm(true); // снова показываем кнопку AddOneMoreCol
    }
    else {
      return false;
    }
  }
  // # тут будем добавлять новую колонку

  return (
    <div>
      <Default>



        <div className={styles.Columns}>

          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
              {columns.map((column) => (
                <SortableColumns key={column.id} column={column} />
              ))}
            </SortableContext>
          </DndContext>


          <CreateNewBoardItem
            className={showForm ? styles.none : ''}
            buttonText={'Добавить список'}
            spellCheck="false"
            dir="auto"
            maxLength="512"
            autoComplete="off"
            name="Ввести заголовок списка"
            placeholder="Ввести заголовок списка"
            aria-label="Ввести заголовок списка"
            data-testid="list-name-textarea"
            autoFocus={showForm ? false : true}
            hideElAction={setShowForm}
            showFlag={true}
            changeAction={setText}
            newText={newName}
            addColumnAction={onClickAdd}
            newColName={columns}
          />
          <AddOneMoreCol
            className={showForm ? '' : styles.none}
            buttonText={'Добавьте еще одну колонку'}
            showElAction={setShowForm}
            showFlag={false}
          />

        </div>

      </Default>

    </div>
  )
};
