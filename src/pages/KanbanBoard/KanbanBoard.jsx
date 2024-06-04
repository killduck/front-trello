import axios from "axios";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import Default from "../../layouts/default/Default";

import PlusIcon from "../../components/ui/Icons/PlusIcon";
import ColumnContainer from "../../components/ColumnContainer/ColumnContainer";
import TaskCard from "../../components/TaskCard/TaskCard";
import request from "../../api/request";

import styles from "./KanbanBoard.module.scss";


// const defaultCols = [
//   {
//     id: 1,
//     name: "backlog",
//     order: 0,
//   },
//   {
//     id: 2,
//     name: "in progress",
//     order: 1,
//   },
// ];

// const defaultTasks = [
//   {
//     id: "1",
//     column: 1,
//     name: "Лёня хреначит реакт компоненты",
//     author: 1,
//     order: 2,
//   },
//   {
//     id: "2",
//     column: 1,
//     name: "Максим es lint",
//     author: 3,
//     order: 3,
//   },
//   {
//     id: "3",
//     column: 2,
//     name: "Кнопки меню",
//     author: 2,
//     order: 1,
//   }
// ];

export default function KanbanBoard() {

  const [columns, setColumns] = useState([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState([]);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    request("GET", 'columns/', (response) => {
      setColumns(response);

      /* Эта гр....я библиотека @dnd kit начинает катастрофически глючить если мы пытаемся перетаскивать объекты с одинаковыми id.
        Т.е. если на дашборде встречается хотя бы одна пара -  колонка и карточка с одинаковым id, то работа DnD полностью падает.
       <<Из оф. документации - Аргумент id представляет собой string или number и должен быть уникальным идентификатором.
        Это означает, что в пределах DndContext не должно быть других перетаскиваемых элементов, имеющих тот же идентификатор.>>
        Поэтому я придумал только такой костыль - на фронте подменить у карточек id с типа number на string.
      */
      let data_card = [];
      response.map((column) => (
        data_card = [...data_card, ...column.cards]
      ))

      data_card.map(card =>
        card.id = card.id.toString()
      );

      setTasks(data_card);
    })
  }, []);



  // Библиотека @dnd kit
  function onDragStart(event) {
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

    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((column) => column.id === active.id);

      const overColumnIndex = columns.findIndex((column) => column.id === over.id);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {

    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);
        const overIndex = tasks.findIndex((task) => task.id === over.id);

        if (tasks[activeIndex].column !== tasks[overIndex].column) {
          // Fix introduced after video recording
          tasks[activeIndex].column = tasks[overIndex].column;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);

        tasks[activeIndex].column = over.id;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }


  // Интерфейсы для работы с колонками и карточками
  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      name: `Column ${columns.length + 1}`,
      order: columns.length,
    };

    setColumns([...columns, columnToAdd]);
  }

  function createTask(columnId) {
    const newTask = {
      id: generateId().toString(),
      column: columnId,
      name: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
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

  function deleteColumn(id) {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.column !== id);
    setTasks(newTasks);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
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
            <div className="flex gap-4">
              <div className="flex gap-4">
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
              <button
                onClick={() => {
                  createNewColumn();
                }}
                className="
                  h-[60px]
                  w-[350px]
                  min-w-[350px]
                  cursor-pointer
                  rounded-lg
                  bg-mainBackgroundColor
                  border-2
                  border-columnBackgroundColor
                  p-4
                  ring-rose-500
                  hover:ring-2
                  flex
                  gap-2
                "
              >
                <PlusIcon />
                Add Column
              </button>
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
        </div>
      </Default>
    </>
  );

}
