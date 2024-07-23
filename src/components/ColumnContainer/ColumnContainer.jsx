import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useMemo, useState } from "react";

import request from "../../api/request";

import Button from "../ui/Button/Button";
import CreateNewBoardItem from "../ui/CreateNewBoardItem/CreateNewBoardItem";
import Icons from "../ui/Icons/Icons";
import TaskCard from "../TaskCard/TaskCard";

import styles from './ColumnContainer.module.scss';
import WindowPortal from "../WindowPortal/WindowPortal";


export default function ColumnContainer(props) {

  let column = props.column;
  let newTextTask = props.newTextTask;
  let setNewTextTask = props.setNewTextTask;
  let requestSuccessCreateTask = props.requestSuccessCreateTask;
  let deleteColumn = props.deleteColumn;
  let updateColumn = props.updateColumn;
  let tasks = props.tasks;
  let deleteCard = props.deleteCard;
  let updateTask = props.updateTask;

  const [editMode, setEditMode] = useState(false);

  const [showForm, setShowForm] = useState(true);

  const [newColName, setNewColName] = useState('');

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

  function writeNewText(evt) {
    setNewColName((newColName) => (newColName = evt));
  }
  const closeUpdate = (evt) => {
    if (evt.key === "Enter" && evt.shiftKey || evt.type === "blur") {

      if (newColName !== '' && newColName !== column.name) {
        updateColumn(column.id, newColName);
        column.name = newColName;
      }

      setEditMode(false);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.Column}
    >
      {/* Column title */}
      <div className={styles.topWrap}>
        <div
          {...attributes}
          {...listeners}
          onClick={() => {
            setEditMode(true);
            setNewColName(column.name);
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
                value={!editMode ? column.name : newColName}
                autoFocus
                onFocus={(evt) => evt.target.selectionStart = evt.target.value.length}
                placeholder="Введите имя колонки"
                onBlur={closeUpdate}
                onKeyDown={closeUpdate}
                onChange={(evt) => writeNewText(evt.target.value)} //updateColumn
              />
            )}
          </div>
        </div>

        <WindowPortal
          typeElem={'column'}
          idElem={column.id}
          column={column}
          updateFunc={updateColumn}
          deleteFunc={deleteColumn}
        >
          <div className={styles.iconWrap}>
            <Icons
              name={'three_dots'}
              class_name={'IconKebabColumnn'}
              sizeWidth={"24px"}
              sizeHeight={"24px"}
              viewBox={"0 0 24 24"}
            />
          </div>

        </WindowPortal>
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
              column={column}
              updateTask={updateTask}
              deleteCard={deleteCard}
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
            autoFocus
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
