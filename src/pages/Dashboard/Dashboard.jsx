
import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";
import request from "../../api/request";
import new_column_data from "../../api/new_column_data";

import { useState, useEffect } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Dashboard(props) {

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
        <Column dataColumn={column} />
      </div>
    );
  };
  
  const [columns, setColumns] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [newName, setText] = useState('');

  useEffect(() => {
    request("GET", 'columns/', (response) => setColumns(response),);
  }, []);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    editOrderColumns(active, over);
    request("POST", 'swap-columns/', (response) => setColumns(response), columns);
  };

  function editOrderColumns(active, over) {
    const oldIndex = columns.findIndex((column) => column.id === active.id);
    const newIndex = columns.findIndex((column) => column.id === over.id);

    let copy = arrayMove(columns, oldIndex, newIndex);
    copy.map((column, index) => (column.order = index));
    setColumns(copy);

    return arrayMove(copy, oldIndex, newIndex);
  }

  // тут добавляем новую колонку
  const onClickAdd = () => {
    if (newName !== '') {
      let copy = [...columns, new_column_data(columns, newName),];
      setColumns(copy); // добавляем новую колонку
      setShowForm(true); // снова показываем кнопку AddOneMoreCol
      request("POST", 'create-columns/', (response) => setColumns(response), copy);
    }
    else {
      return false;
    }
  }
  // тут добавляем новую колонку

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
