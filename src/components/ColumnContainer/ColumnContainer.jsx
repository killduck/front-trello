import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useMemo, useState } from "react";

import request from "../../api/request";

import Button from "../ui/Button/Button";
import CreateNewBoardItem from "../ui/CreateNewBoardItem/CreateNewBoardItem";
import Icons from "../ui/Icons/Icons";
import TaskCard from "../TaskCard/TaskCard";

import styles from './ColumnContainer.module.scss';


export default function ColumnContainer(props) {

  let column = props.column;
  let newTextTask = props.newTextTask;
  let setNewTextTask = props.setNewTextTask;
  let requestSuccessCreateTask = props.requestSuccessCreateTask;
  let deleteColumn = props.deleteColumn;
  let updateColumn = props.updateColumn;
  let tasks = props.tasks;
  let deleteTask = props.deleteTask;
  let updateTask = props.updateTask;

  const [editMode, setEditMode] = useState(false);

  const [showForm, setShowForm] = useState(true);

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
    );
  }

  const onShowFormAddColumn = () => {
    setShowForm(false);
  }

  function createNewTask(columnId) {

    let newTask = {
      name: newTextTask,
      author: 1,
      column: columnId,
    };

    request({
      method: "POST",
      url: 'create-card/',
      callback: (request) => { requestSuccessCreateTask(request) },
      data: newTask,
      status: 200,
    });

    setShowForm(true);
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
          <CreateNewBoardItem
            className={showForm ? styles.none : styles.FormCreateCard}
            buttonText={'Добавить карточку'}
            spellCheck="false"
            dir="auto"
            maxLength="512"
            autoComplete="off"
            name="Ввести заголовок карточки"
            placeholder="Ввести заголовок карточки"
            aria-label="Ввести заголовок карточки"
            data-testid="list-name-textarea"
            autoFocus={showForm ? false : true}
            hideElAction={setShowForm}
            showFlag={true}
            changeAction={setNewTextTask}
            newText={newTextTask}
            addColumnAction={createNewTask}
            newColName={column.id}
          />
        </SortableContext>
      </div>
      {/* Column footer */}
      <div
        className={
          showForm ?
            styles.BtnCreateTaskWrap
            :
            styles.none
        }
      >
        <Button
          clickAction={onShowFormAddColumn}
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
