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

import request from "../../api/request"; // времянка

import Button from "../../components/ui/Button/Button";
import ColumnContainer from "../../components/ColumnContainer/ColumnContainer";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import Icons from "../../components/ui/Icons/Icons";
import TaskCard from "../../components/TaskCard/TaskCard";

import styles from "./KanbanBoard.module.scss";


export default function KanbanBoard() {

  const [columns, setColumns] = useState([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState([]);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const [showForm, setShowForm] = useState(true);

  const [newName, setText] = useState('Новая колонка');

  let { dashboardId } = useParams();


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );


  useEffect(() => {
    request("POST", 'columns/', (response) => {
      setColumns(response);

      let data_card = [];
      response.map((column) => (
        data_card = [...data_card, ...column.cards]
      ))

      data_card.map(card =>
        card.id = card.id.toString()
      );

      setTasks(data_card);
    }, { 'dashboardId': dashboardId })
  }, []);


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
      request("POST", 'swap-columns/', (response) => { }, { columns, dashboardId });
    }


    if (active_order_element === "Task") {
      console.log('Сортируем карточки');

      let order_cards = editOrderCards(tasks);

      request("POST", 'swap-cards/', (response) => { }, { order_cards, dashboardId });
    }
  }

  function editOrderColumns(active, over) {
    const activeColumnIndex = columns.findIndex((column) => column.id === active.id);
    const overColumnIndex = columns.findIndex((column) => column.id === over.id);

    let copy = arrayMove(columns, activeColumnIndex, overColumnIndex);

    copy.map((column, index) => {
      column.order = index;
    })

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
          // return arrayMove(tasks, activeIndex, overIndex - 1); // пока оставить на всякий случай - библиотека чудит (:
          return arrayMove(tasks, activeIndex, overIndex);
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
      const columnToAdd = response;

      setColumns([...columns, columnToAdd]);
      setShowForm(true);
    }
  }

  function createNewColumn() {

    let columnToAdd = {
      nameNewColumn: newName,
      idWorkSpace: 1, //TODO переделать на конкретное рабочее пространство
      idDashboard: dashboardId
    }

    request("POST", 'create-column/', (request) => { requestSuccessCreateColumn(request) }, columnToAdd);
  }


  function requestSuccessCreateTask(response) {

    if (response) {
      const cardToAdd = response;

      setTasks([...tasks, cardToAdd]);
    }

  }

  function createTask(columnId) {

    let newTask = {
      name: `Task ${tasks.length + 1}`,
      author: 1,
      column: columnId,
    };

    request("POST", 'create-card/', (request) => { requestSuccessCreateTask(request) }, newTask);
  }

  function updateColumn(id, name) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, name };
    });

    setColumns(newColumns);
  }

  function updateTask(id, name) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, name };
    });

    setTasks(newTasks);
  }


  function requestSuccessDeletColumn(response, id) {

    if (response) {
      const filteredColumns = columns.filter((column) => column.id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter((task) => task.column !== id);
      setTasks(newTasks);
    }

  }

  function deleteColumn(id) {

    let idColumnDeleted = { id_column: id }

    request("POST", 'delete-column/', (request) => { requestSuccessDeletColumn(request, id) }, idColumnDeleted);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }


  return (
    <>
      <Default>
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
                      deleteColumn={deleteColumn}
                      updateColumn={updateColumn}
                      createTask={createTask}
                      deleteTask={deleteTask}
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
                  // autoFocus={showForm ? false : true}
                  autoFocus={true}
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
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter(
                      (task) => task.column === activeColumn.id
                    )}
                  />
                )}
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div >
      </Default >
    </>
  );

}
