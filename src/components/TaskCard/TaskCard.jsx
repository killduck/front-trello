import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useState } from "react";

import styles from './TaskCard.module.scss';
// import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import WindowPortal from "../WindowPortal/WindowPortal";
import Button from "../ui/Button/Button";


export default function TaskCard(props) {
  // console.log('TaskCard ->')
  // console.log(props)

  // let deleteTask = props.deleteTask;

  let task = props.task;
  let column = props.column;
  let updateTask = props.updateTask;

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  let [label, setLabel] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = (evt) => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  function writeNewText(evt) {
    setNewTaskName((newTaskName) => (newTaskName = evt));
  }

  const closeUpdate =  (evt) => {
    if (evt.key === "Enter" && evt.shiftKey || evt.type === "blur") {

      if(newTaskName !== '' && newTaskName !== task.name){
        updateTask(task.id, newTaskName);
        task.name = newTaskName;
      }

      toggleEditMode();
    }
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={styles.DraggingCard}
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={styles.CardEditData}
      >
        <textarea
          className={styles.EditFocus}
          value={ newTaskName === '' ? task.name : newTaskName }
          autoFocus
          onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }// evt.currentTarget.select(evt);
          placeholder="Task content here"
          onBlur={closeUpdate}
          onKeyDown={closeUpdate}
          onChange={(evt) => writeNewText(evt.target.value)}
        />
      </div>
    );
  }

  function onCard_label() {
    console.log('Проверка выполения функции =>', onCard_label.name);
    // TODO Наверное лишнее?
    label ?
      setLabel(false)
      :
      setLabel(true)

  }

  return (

    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className={styles.TaskCard}
    >
      <WindowPortal
        typeElem = {'card'}
        idElem = {task.id}
        task = {task}
        column = {column}
        updateFunc = {updateTask}
      >
        <div className={styles.TaskCard__Wrap}>

          <div className={styles.CardView}>

            <div className={styles.ColorLabel}>
              <div
                className={styles.ColorLabel_Wrap}
                onClick={() => { onCard_label() }}
              >
                <span
                  className={
                    label ?
                      styles.LabelActive
                      :
                      styles.Label
                  } >
                  Важно
                </span>
              </div>
            </div>

            {/* <a className={styles.CardText} href="#">
              {task.name}
            </a> */}
            <span className={styles.CardText} >
              {task.name}
            </span>
            <div className={styles.cardIcon}>
              {mouseIsOver && (
                <Button
                  type={"button"}
                  ariaLabel={"Изменить карточку"}
                  className={"BtnCardNameEdit"}
                  clickAction={toggleEditMode}

                >
                  <Icons
                    name={'pencil-colorless'}
                    class_name={'CardTextPencilLogo'}
                  />   
                </Button>
              )}
            </div>
            

          </div>
        </div>
      </WindowPortal>
    </div>

  );
}
