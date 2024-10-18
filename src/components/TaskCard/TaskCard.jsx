import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import styles from './TaskCard.module.scss';
import Icons from "../ui/Icons/Icons";
import WindowPortal from "../WindowPortal/WindowPortal";
import Button from "../ui/Button/Button";

export default function TaskCard(props) {

  let dashboardUsers = props.dashboardUsers; 
  let task = props.task;
  let column = props.column;
  let updateTask = props.updateTask;
  let deleteCard = props.deleteCard;
  let updateSetCardLabel = props.updateSetCardLabel;
  let showPreloderCard = props.showPreloderCard;

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [DNDIsOn, setDNDIsOn] = useState(true);

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

  function toggleEditMode() {
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
          placeholder="Введите имя карточки"
          onBlur={closeUpdate}
          onKeyDown={closeUpdate}
          onChange={(evt) => writeNewText(evt.target.value)}
        />
      </div>
    );
  }

  return (
    <>
      {String(showPreloderCard) !== task.id ? 
      <>
        {DNDIsOn ? (
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
            onClick={() => setDNDIsOn(false)}
          >
            <WindowPortal
              typeElem = {'card'}
              idElem = {task.id}
              task = {task}
              column = {column}
              dashboardUsers={dashboardUsers}
              updateFunc = {updateTask}
              deleteFunc={deleteCard}
              updateSetCardLabel={updateSetCardLabel}
            >
              <div className={styles.TaskCard__Wrap}>
                <div className={styles.CardView}>
                  <div className={styles.ColorLabel}>
                    <div
                      className={styles.ColorLabelWrap}
                      style={{backgroundColor: task.label ? task.label.color_hex : "grey"}}
                    >
                    </div>
                  </div>
                  
                  <span className={styles.CardText} title={`карточка: "${task.name}"`}>
                    {task.name}
                  </span>
                  <div className={styles.cardIcon}>
                    {mouseIsOver && (
                      <Button
                        type={"button"}
                        ariaLabel={"Изменить карточку"}
                        className={"BtnCardNameEdit"}
                        clickAction={toggleEditMode}
                        disabled={showPreloderCard ? 'disabled' : ""}
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
        ):(
          <div className={styles.TaskCard}>
            <WindowPortal
              typeElem = {'card'}
              idElem = {task.id}
              task = {task}
              column = {column}
              dashboardUsers={dashboardUsers}
              updateFunc = {updateTask}
              deleteFunc={deleteCard}
              updateSetCardLabel={updateSetCardLabel}
              setDNDIsOn={setDNDIsOn}
            >
              <div className={styles.TaskCard__Wrap}>
                <div className={styles.CardView}>
                  <div className={styles.ColorLabel}>
                    <div
                      className={styles.ColorLabelWrap}
                      style={{backgroundColor: task.label ? task.label.color_hex : "grey"}}
                    />
                  </div>
                  <span className={styles.CardText} title={task.name}>
                    {task.name}
                  </span>
                  <div className={styles.cardIcon}>
                    {mouseIsOver && (
                      <Button
                        type={"button"}
                        ariaLabel={"Изменить карточку"}
                        className={"BtnCardNameEdit"}
                        clickAction={toggleEditMode}
                        disabled={showPreloderCard ? 'disabled' : ""}
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
        )}
      </>
      :
      (
      <div className={styles.TaskCard}>
        <div className={`${styles.cardGradient} ${styles.TaskCard__Wrap}`}>
          <div className={styles.CardView}>
            <div className={styles.ColorLabel}>
              <div
                className={styles.ColorLabelWrap}
                style={{backgroundColor: task.label ? task.label.color_hex : "grey"}}
              >
              </div>
            </div>
            <span className={styles.CardText} title={`карточка: "${task.name}"`}>
              {task.name}
            </span>
          </div>
        </div>
      </div>
      )
      }
    </>
  );
}
