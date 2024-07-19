import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import { createPortal } from "react-dom";

import request from "../../api/request";

import Button from "../../components/ui/Button/Button";
import ColumnContainer from "../../components/ColumnContainer/ColumnContainer";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import Icons from "../../components/ui/Icons/Icons";
import TaskCard from "../../components/TaskCard/TaskCard";

import styles from "./KanbanBoard.module.scss";
import Preloader from "../../components/Preloader/Preloader";
// import WorkspaceMenu from "../../components/WorkspaceMenu/WorkspaceMenu";


export default function KanbanBoard() {

  let [showPreloder, setShowPreloder] = useState(false);

  const [columns, setColumns] = useState([]);

  const [columnBug, setcolumnBug] = useState(null); // используем для корректировки работы библиотеки DnD

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState([]);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const [showForm, setShowForm] = useState(true);

  const [newName, setText] = useState('Новая колонка');

  const [newTextTask, setNewTextTask] = useState('Новая задача');

  let [backGroundImage, setBackGroundImage] = useState('');

  let { dashboardId } = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );


  useEffect(() => {
    request({
      method:'POST',
      url:'dashboards/',
      callback:(response) => { 
        if (response.status === 200) {
          let dashboard = response.data[0]; //нужный дашборд

          setBackGroundImage( dashboard.img );
          setColumns( dashboard.column );
          setcolumnBug( dashboard.column[0].id ); // ищем 1ую колонку

          let data_card = [];
          dashboard.column.map((column) => (
            data_card = [...data_card, ...column.cards]
          ))

          data_card.map((card) =>
            card.id = card.id.toString()
          );

          setTasks(data_card);

        }
        else {
          console.log("редирект");
        }
      },
      data: { 'dashboardId': dashboardId },
      status:200,
    });

  }, [dashboardId]); //TODO ES Lint просит добавить dashboardId


  // Библиотека @dnd kit
  function onDragStart(event) {
    console.log('onDragStart');

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    console.log('onDragEnd');

    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    const active_order_element = active.data.current?.type;


    if (active_order_element === "Column") {
      console.log('Сортируем колонки');

      if (!over) return;

      if (active.id === over.id) return;

      const isActiveAColumn = active.data.current?.type === "Column";

      if (!isActiveAColumn) return;

      editOrderColumns(active, over);

      request({
        method: "POST",
        url: 'swap-columns/',
        callback: (response) => { },
        data: { columns, dashboardId },
        status: 200,
      });
    }


    if (active_order_element === "Task") {
      console.log('Сортируем карточки');

      let order_cards = editOrderCards(tasks);

      request({
        method: "POST",
        url: 'swap-cards/',
        callback: (response) => { },
        data: { order_cards, dashboardId },
        status: 200,
      });
    }
  }

  function editOrderColumns(active, over) {
    const activeColumnIndex = columns.findIndex((column) => column.id === active.id);
    const overColumnIndex = columns.findIndex((column) => column.id === over.id);

    let copy = arrayMove(columns, activeColumnIndex, overColumnIndex);

    copy.map(
      (column, index) => (column.order = index)
    );

    setColumns(copy);

    return arrayMove(copy, activeColumnIndex, overColumnIndex);
  }

  function editOrderCards(arrCards) {

    let cards_by_columns = {};

    arrCards.forEach((card) => {

      if (typeof cards_by_columns[card.column] == "undefined") {
        cards_by_columns[card.column] = [
          {
            id: card.id,
            // name: card.name,
            order: card.order,
            column: card.column,
          }
        ];
      }
      else {
        cards_by_columns[card.column].push(
          {
            id: card.id,
            // name: card.name,
            order: card.order,
            column: card.column,
          }
        );
      }
    });

    // Переписываем в карточках поле "order" в соответствии их позиции в массиве
    let sort_cards = [];

    Object.values(cards_by_columns).forEach((obj) => {

      obj.forEach((card, index) => {
        card.order = index;
        sort_cards.push(card)
      });
    });

    return sort_cards;
  }


  function onDragOver(event) {
    console.log('onDragOver');

    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);
        const overIndex = tasks.findIndex((task) => task.id === over.id);


        if (tasks[activeIndex].column !== tasks[overIndex].column) {
          tasks[activeIndex].column = tasks[overIndex].column;

          if (tasks[overIndex].column === columnBug) {
            console.log('>>>проверяем проблемное место #1');
            return arrayMove(tasks, activeIndex, overIndex);  // пытаемся решить проблему пермещения карточки на 1ое место в 1ую колонку
          }

          return arrayMove(tasks, activeIndex, overIndex - 1); // пока оставить на всякий случай - библиотека чудит (:
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);
        tasks[activeIndex].column = over.id;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }


  // Кликкеры
  const onShowFormAddColumn = () => {
    setShowForm(false);
  }


  // Интерфейсы для работы с колонками и карточками
  function requestSuccessCreateColumn(response) {

    if (response) {
      const columnToAdd = response.data;

      setColumns([...columns, columnToAdd]);
      setShowForm(true);
      setText('Новая колонка');

    }
  }

  function createNewColumn() {

    let columnToAdd = {
      nameNewColumn: newName,
      idWorkSpace: 1, //TODO переделать на конкретное рабочее пространство
      idDashboard: Number(dashboardId)
    }

    request({
      method: "POST",
      url: 'create-column/',
      callback: (response) => { requestSuccessCreateColumn(response) },
      data: columnToAdd,
      status: 200,
    });
  }


  function requestSuccessCreateTask(response) {
    // console.log(response);
    if (response) {
      const cardToAdd = response.data;

      setTasks([...tasks, cardToAdd]);

      setNewTextTask('Новая задача');
    }

  }

  function updateSetColumns(id, name) {
    const newColumns = columns.map((col) => {
      // console.log(id, name ,col.id);
      if (col.id !== id){
        return col;
      }
      return { ...col, name };
    });
    setColumns(newColumns);
  }

  function updateColumn(id, name) {
    // console.log(id, name);
    // console.log('мы_тут');
    request({
      method: "POST",
      url: `new-data-column/`,
      callback: (response) => { 
        if (response.status === 200) {
          name = response.data[0]['name'];
          updateSetColumns(id, name);
        }
      },
      data: {id: id, name: name},
      status: 200,
    });
  }

  function updateSetTasks(id, name) {
    const newTasks = tasks.map((task) => {
      // console.log(String(id) , name ,task.id);
      if (task.id !== String(id)){ 
        return task;
      }
      return { ...task, name };
    });
    setTasks(newTasks);
  }

  function updateTask(id, name) {
    // console.log(id, name);
    request({
      method: "POST",
      url: `new-data-card/`,
      callback: (response) => { 
        if (response.status === 200) {
          name = response.data[0]['name'];
          updateSetTasks(id, name);
        }
      },
      data: {id: id, name: name},
      status: 200,
    });
  }

  function requestSuccessDeletColumn(response, id) {
    if (response.data) {
      const filteredColumns = columns.filter((column) => column.id !== id);
      setColumns(filteredColumns);

      const filteredTasks = tasks.filter((task) => task.column !== id);
      setTasks(filteredTasks);
    }
  }

  function deleteColumn(id) {

    let idColumnDeleted = { id_column: id }

    request({
      method: "POST",
      url: 'delete-column/',
      callback: (response) => { 
        setShowPreloder(true);
        if(response.status === 200){
          requestSuccessDeletColumn(response, id);
          setShowPreloder(false);
        }
      },
      data: idColumnDeleted,
      status: 200,
    });
  }

  function requestSuccessDeletCard(response, id) {
    if (response.data) {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    }
  }

  function deleteCard(id) {
    let idCardDeleted = { id_card: id }

    request({
      method: "POST",
      url: 'delete-card/',
      callback: (response) => { 
        setShowPreloder(true);
        if(response.status === 200){
            requestSuccessDeletCard(response, id);
            setShowPreloder(false);
        }
      },
      data: idCardDeleted,
      status: 200,
    });
  }


  return (
 
      <Default
        backGroundImage={{ backgroundImage: `url(/img/${ backGroundImage })` }}
      >
      {showPreloder ? (<Preloader />) : ("")}
        {/* <WorkspaceMenu /> */}
        <div className={styles.KanbanBoard}>
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className={styles.Wrap}>
              <div className={styles.Container}>
                <SortableContext items={columnsId}>
                  {columns.map((column) => (
                    <ColumnContainer
                      key={column.id}
                      column={column}
                      newTextTask={newTextTask}
                      setNewTextTask={setNewTextTask}
                      requestSuccessCreateTask={requestSuccessCreateTask}
                      deleteColumn={deleteColumn}
                      updateColumn={updateColumn}
                      deleteCard={deleteCard}
                      updateTask={updateTask}
                      tasks={tasks.filter((task) => task.column === column.id)}
                    />
                  ))}
                </SortableContext>
              </div>

              <div>
                <CreateNewBoardItem
                  className={showForm ? styles.none : ''}
                  buttonText={'Добавить колонку'}
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
                  addColumnAction={createNewColumn}
                  newColName={columns}
                />
              </div>

              <div
                className={
                  showForm ?
                    styles.BtnCreateNewColumn__Wrap
                    :
                    styles.none
                }
              >
                <Button
                  clickAction={onShowFormAddColumn}
                  className={'BtnCreateNewColumn'}
                >
                  <Icons
                    name={'AddIcon'}
                    class_name={'IconCreateNewColumn'}
                    sizeWidth={''}
                    sizeHeight={''}
                  />
                  Добавьте еще одну колонку
                </Button>
              </div>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    newTextTask={newTextTask}
                    setNewTextTask={setNewTextTask}
                    requestSuccessCreateTask={requestSuccessCreateTask}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    deleteCard={deleteCard}
                    updateTask={updateTask}
                    tasks={tasks.filter(
                      (task) => task.column === activeColumn.id
                    )}
                  />
                )}
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                    deleteCard={deleteCard}
                    updateTask={updateTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div >
      </Default >
    
  );

}
