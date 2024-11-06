import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import styles from './TaskCard.module.scss';
import Icons from "../ui/Icons/Icons";
import WindowPortal from "../WindowPortal/WindowPortal";
import Button from "../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setDNDIsOn } from "../../main_state/states/taskCardState";

export default function TaskCard(props) {

  let dashboardUsers = props.dashboardUsers; 
  let task = props.task;
  let column = props.column;
  let updateTask = props.updateTask;
  let deleteCard = props.deleteCard;
  let updateSetCardLabel = props.updateSetCardLabel;
  let showPreloderCard = props.showPreloderCard;

  const DNDIsOn = useSelector((state) => state.taskCardState.DNDIsOn); 
  const modalIsOpen = useSelector((state) => state.windowModalState.modalIsOpen); 
  const dispatch = useDispatch();

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

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

  function toggleEditMode(task_id) {
    if(editMode){
      setEditMode(false);
    }
    else{
      setEditMode(task_id);
    }
    if(mouseIsOver){
      setMouseIsOver(false);
    }
    else{
      setMouseIsOver(task_id); 
    }
    // setEditMode((prev) => !prev);
    // setMouseIsOver((prev) => !prev);
  };

  function writeNewText(evt) {
    setNewTaskName((newTaskName) => (newTaskName = evt));
  }

  const closeUpdate =  (evt) => {
    if (evt.key === "Enter" && evt.shiftKey || evt.type === "blur") {

      if(newTaskName !== '' && newTaskName !== task.name){
        updateTask(task.id, newTaskName);
        dispatch(setDNDIsOn(false));
        // task.name = newTaskName;
      }

      toggleEditMode(false);
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

  const editNewText = (
    <>
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
    </>
  );
  
  return (
    <>
      {String(showPreloderCard) !== task.id || modalIsOpen ? 
      <>
        {DNDIsOn !== task.id ? (
          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onMouseEnter={() => {
              setMouseIsOver(task.id);
            }}
            onMouseLeave={() => {
              setMouseIsOver(false);
            }}
            className={styles.TaskCard}
            onClick={() => dispatch(setDNDIsOn(task.id))}
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
                      {task.label_text}
                    </div>
                  </div>

                  {editMode === task.id ? (
                    <>
                      {editNewText}
                    </>
                    ):(  
                    <span className={styles.CardText} title={`карточка: "${task.name}"`}>
                      {task.name}
                    </span>
                    )
                  }
                 
                </div>
              </div>
            </WindowPortal>

            <div className={styles.cardIcon} title={`изменить имя карточки: "${task.name}"`}>
              {mouseIsOver === task.id && (
                <Button
                  type={"button"}
                  ariaLabel={"Изменить карточку"}
                  className={"BtnCardNameEdit"}
                  clickAction={() => toggleEditMode(task.id)}
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
            >
              <div className={styles.TaskCard__Wrap}>
                <div className={styles.CardView}>
                  <div className={styles.ColorLabel}>
                    <div
                      className={styles.ColorLabelWrap}
                      style={{backgroundColor: task.label ? task.label.color_hex : "grey"}}
                    >
                      {task.label_text}
                    </div>
                  </div>

                  {editMode === task.id ? (
                    <>
                      {editNewText}
                    </>
                    ):(  
                    <span className={styles.CardText} title={`карточка: "${task.name}"`}>
                      {task.name}
                    </span>
                    )
                  }
                </div>
              </div>
            </WindowPortal>

            <div className={styles.cardIcon} title={`изменить имя карточки: "${task.name}"`}>
              {mouseIsOver === task.id && (
                <Button
                  type={"button"}
                  ariaLabel={"Изменить карточку"}
                  className={"BtnCardNameEdit"}
                  clickAction={() => toggleEditMode(task.id)}
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
