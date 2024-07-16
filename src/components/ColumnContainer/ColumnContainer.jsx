import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useMemo, useState } from "react";

import request from "../../api/request";

import Button from "../ui/Button/Button";
import CreateNewBoardItem from "../ui/CreateNewBoardItem/CreateNewBoardItem";
import Icons from "../ui/Icons/Icons";
import TaskCard from "../TaskCard/TaskCard";

import styles from './ColumnContainer.module.scss';
import ModalWindow from "../WindowPortal/WindowPortal";


export default function ColumnContainer(props) {

  let column = props.column;
  let newTextTask = props.newTextTask;
  let setNewTextTask = props.setNewTextTask;
  let requestSuccessCreateTask = props.requestSuccessCreateTask;
  // let deleteColumn = props.deleteColumn;
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
      // author: 4,
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
      <div className={styles.topWrap}>
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
        </div>
          
        <ModalWindow
          typeElem={'column'}
          idElem={column.id}
          updateFunc={updateColumn}
        >
          <Icons
            name={'three_dots'}
            class_name={'IconKebabColumnn'}
            sizeWidth={"24px"}
            sizeHeight={"24px"}
            viewBox={"0 0 24 24"}
          />
        </ModalWindow>
      </div>

      {/* <Button
          // clickAction={deleteColumn}
          // actionVariable={column.id}
          // className={'BtnDeleteColumn'}
          clickAction={deleteColumn}
          actionVariable={column.id}
          className={'BtnKebabColumnn'}
        > */}
          {/* <Icons
            name={'Trash'}
            class_name={'IconDeletColumnn'}
          /> */}
      {/* </Button> */}
      

      {/* <button class="x7x105F0Ex0A7R bxgKMAm3lq5BpA iUcMblFAuq9LKn HAVwIqCeMHpVKh SEj5vUdI3VvxDc" type="button" data-testid="list-edit-menu-button" aria-haspopup="true">
        <span class="nch-icon A3PtEe1rGIm_yL neoUEAwI0GETBQ fAvkXZrzkeHLoc">
          <span data-testid="OverflowMenuHorizontalIcon" aria-hidden="true" class="css-snhnyn" style="--icon-primary-color: currentColor; --icon-secondary-color: inherit;">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path>
            </svg>
          </span>
        </span>
      </button> */}

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
