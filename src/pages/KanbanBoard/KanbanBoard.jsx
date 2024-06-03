import axios from "axios";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";


import Default from "../../layouts/default/Default";
import ColumnContainer from "../../components/ColumnContainer/ColumnContainer";
import TaskCard from "../../components/TaskCard/TaskCard";
import PlusIcon from "../../components/ui/Icons/PlusIcon";
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

const defaultTasks = [
  {
    id: "1",
    column: 1,
    name: "Лёня хреначит реакт компоненты",
    author: 1,
    order: 2,
  },
  {
    id: "2",
    column: 1,
    name: "Максим es lint",
    author: 3,
    order: 3,
  },
  {
    id: "3",
    column: 2,
    name: "Кнопки меню",
    author: 2,
    order: 1,
  },
];


export default function KanbanBoard() {
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(defaultTasks);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);


  useEffect(() => {
    request("GET", 'columns/', (response) => {
      console.log("GET columns =>", response);
      setColumns(response);
    })
  }, []);


  useEffect(() => {
    request("GET", 'cards/', (response) => {
      console.log("GET cards =>", response);
      // setTasks(response);
    })
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

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

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].column != tasks[overIndex].column) {
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
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].column = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
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
      id: generateId(),
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
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.column !== id);
    setTasks(newTasks);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function generateId() {
    /* Generate a random number between 0 and 10000 */
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
            <div className="flex gap-3">
              <div className="flex gap-3">
                <SortableContext items={columnsId}>
                  {columns.map((col) => (
                    <ColumnContainer
                      key={col.id}
                      column={col}
                      deleteColumn={deleteColumn}
                      updateColumn={updateColumn}
                      createTask={createTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      tasks={tasks.filter((task) => task.column === col.id)}
                    />
                  ))}
                </SortableContext>
              </div>
              <button
                onClick={() => {
                  createNewColumn();
                }}
                className="
                  h-[48px]
                  w-[272px]
                  cursor-pointer
                  bg-mainBackgroundColor
                  border-2
                  border-columnBackgroundColor
                  p-3
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
                    tasks={tasks.filter((task) => task.column === activeColumn.id)}
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
