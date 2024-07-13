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

  let task = props.task;
  // let column = props.column;

  // let deleteTask = props.deleteTask;
  let updateTask = props.updateTask;


  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const [cardFunc, setCardFunc] = useState(false);

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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        // className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative"
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
          value={task.name}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
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

  // function cardFunctions(){

  // }

  return (

    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className={styles.TaskCard}
    >
      <WindowPortal
        typeElem={'card'}
        idElem={task.id}
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

            <a className={styles.CardText} href="#">
              {task.name}
            </a>
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
