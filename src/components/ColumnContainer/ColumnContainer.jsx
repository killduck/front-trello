import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useMemo, useState } from "react";

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import TaskCard from "../TaskCard/TaskCard";

import styles from './ColumnContainer.module.scss';


export default function ColumnContainer(props) {

  let column = props.column;
  let deleteColumn = props.deleteColumn;
  let updateColumn = props.updateColumn;
  let createTask = props.createTask;
  let tasks = props.tasks;
  let deleteTask = props.deleteTask;
  let updateTask = props.updateTask;

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={styles.Dragging}
      />
      // </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.Column}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className={styles.ColumnTitleWrap}
      >
        <div
          className={styles.ColumnTitle}
        >
          {!editMode && column.name}
          {editMode && (
            <input
              className={styles.EditeColumnTitle}
              value={column.name}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <Button
          clickAction={deleteColumn}
          actionVariable={column.id}
          className={'BtnDeleteColumn'}
        >
          <Icons
            name={'Trash'}
            class_name={'IconDeletColumnn'}
          />
        </Button>
      </div>

      {/* Column task container */}
      <div
      className={styles.ColumnCardsWrap}
      >
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <div className={styles.BtnCreateTaskWrap}>
        <Button
          clickAction={createTask}
          actionVariable={column.id}
          className={'BtnCreateTask'}
        >
          <Icons
            name={'Plus'}
            class_name={'IconCreateTask'}
          />
          Добавить карточку
        </Button>
      </div>
    </div>
  );
}
