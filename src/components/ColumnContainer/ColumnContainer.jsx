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
  // console.log(props);
  let dashboardUsers = props.dashboardUsers;
  let column = props.column;
  let newTextTask = props.newTextTask;
  let setNewTextTask = props.setNewTextTask;
  let requestSuccessCreateTask = props.requestSuccessCreateTask;
  let deleteColumn = props.deleteColumn;
  let updateColumn = props.updateColumn;
  let tasks = props.tasks;
  let deleteCard = props.deleteCard;
  let updateTask = props.updateTask;
  let updateCardLabel = props.updateCardLabel;
  let showPreloderCard = props.showPreloderCard;
  let showPreloderLabel = props.showPreloderLabel;
  let setShowPreloderLabel = props.setShowPreloderLabel;
  let setShowPreloder = props.setShowPreloder;


  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showColumnOptions, setShowColumnOptions] = useState(false);

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

    setShowPreloder(true);

    request({
      method: "POST",
      url: 'create-card/',
      callback: (response) => { 
        if(response.status === 200){
          setShowPreloder(false);
          requestSuccessCreateTask(response);
        }
      },
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

  function funcShowColumnOptions(){
    if(showColumnOptions){
      setShowColumnOptions(false);
    }
    else{
      setShowColumnOptions(true);
    }
  }

  const boardItemCardHandleKeyPress = (evt) => {
    // console.log(evt.key);
    if(evt.key === 'Enter' && evt.shiftKey || evt.type === "blur"){
      // setShowForm(true);
      createNewTask(column.id);
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
            title={`колонка: "${column.name}"`}
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

        <div className={styles.iconWrap}
          onClick={funcShowColumnOptions}
        >
          <Icons
            name={'three_dots'}
            class_name={'IconKebabColumnn'}
            sizeWidth={"24px"}
            sizeHeight={"24px"}
            viewBox={"0 0 24 24"}
          />
        </div>
        {(showColumnOptions) ?(
          <div className={styles.ColumnOptionWindow} >
            <header className={styles.ColumnOptionWindowHeader}>
              <h2 className={styles.ColumnOptionWindowHeaderTitle} title="Действия со списком">Действия с колонкой</h2>
              <span className={styles.ColumnOptionWindowHeaderIcon} onBlur={funcShowColumnOptions}>
                <Button
                className={'btnSmallWindow'}
                type="button"
                ariaLabel="Закрыть окно"
                clickAction={funcShowColumnOptions}
                >
                  <Icons
                    class_name={'btnModalCloseIcon'}
                    name={'CloseIcon'}
                  />
                </Button>
              </span>
            </header>

            <div className={styles.ActionsWrap}>
              <ul className={styles.ActionsWrapUl}>
                <li 
                  className={styles.ActionsWrapLi}
                  onClick={()=> deleteColumn(column.id)}
                >
                  <span>Удалить колонку</span>
                  <Icons
                    name={'Trash'}
                    class_name={'IconDeleteColumnn'}
                  />
                </li>
              </ul>
            </div>

          </div>
        ):(
          ""
        )
        }
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
              dashboardUsers={dashboardUsers}
              updateTask={updateTask}
              deleteCard={deleteCard}
              updateCardLabel={updateCardLabel}
              showPreloderCard={showPreloderCard}
              showPreloderLabel={showPreloderLabel}
              setShowPreloderLabel={setShowPreloderLabel}
            />
          ))}
          {!showForm &&
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
              hideElAction={setShowForm}
              showFlag={true}
              changeAction={setNewTextTask}
              newText={newTextTask}
              addColumnAction={createNewTask}
              newColName={column.id}
              boardItemHandleKeyPress={boardItemCardHandleKeyPress}
            />
          }
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
