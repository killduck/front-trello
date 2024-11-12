import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import styles from './TaskCard.module.scss';
import Icons from "../ui/Icons/Icons";
import WindowPortal from "../WindowPortal/WindowPortal";
import Button from "../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setDNDIsOn } from "../../main_state/states/taskCardState";
import { URL_API } from "../../api/config";

export default function TaskCard(props) {

  let dashboardUsers = props.dashboardUsers; 
  let task = props.task;
  let column = props.column;
  let updateTask = props.updateTask;
  let deleteCard = props.deleteCard;
  let updateSetCardLabel = props.updateSetCardLabel;
  let showPreloderCard = props.showPreloderCard;
  let setUpdateComponent = props.setUpdateComponent;

  const DNDIsOn = useSelector((state) => state.taskCardState.DNDIsOn); 
  const modalIsOpen = useSelector((state) => state.windowModalState.modalIsOpen); 
  const usersOfCard = useSelector((state) => state.userState.usersOfCards);
  const user_of_card = usersOfCard.filter((elem) =>  elem.card_id === Number(task.id));
  
  const dispatch = useDispatch();

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name ? task.name : '');

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
  };

  function writeNewText(evt) {
    setNewTaskName((newTaskName) => newTaskName = evt);
  }

  const closeUpdate =  (evt) => {
    if (evt.key === "Enter" && evt.shiftKey || evt.type === "blur") {

      if(newTaskName.trim() !== '' && newTaskName.trim() !== task.name){
        updateTask(task.id, newTaskName.trim());
      }
      
      dispatch(setDNDIsOn(false));
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
        <input
          className={styles.EditFocus}
          value={ newTaskName }
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
              editMode={editMode}
              setUpdateComponent={setUpdateComponent}
            >
              <div className={styles.TaskCard__Wrap}>
                <div className={styles.CardView}>
                  <div className={styles.ColorLabel}>
                    <div
                      className={styles.ColorLabelWrap}
                      style={{backgroundColor: task.label ? task.label.color_hex : "grey"}}
                    >
                      {task.label_text}
                      {/* <span className={styles.ColorLabeltext}>
                        {task.label_text}
                      </span> */}
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

                  <div className={styles.membersList}>
                    {user_of_card.length > 0 && user_of_card[0].card_users.map(
                      (cardUser, index) => ( index < 5 &&
                        <div key={cardUser.id} className={styles.memberMenu}>
                          {cardUser.img ? (
                            <img 
                              className={styles.memberAvatar} 
                              src={`${URL_API + cardUser.img}`}
                              alt={`${cardUser.first_name} (${cardUser.username})`}
                              title={`${cardUser.first_name} (${cardUser.username})`}
                            />)
                            :
                            (<span 
                              className={styles.memberAvatarSpan} 
                              title={`${cardUser.first_name} (${cardUser.username})`}
                            >{cardUser.first_letter}</span>
                          )}
                        </div> 
                      ) 
                    )}
                  </div>
                 
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
              editMode={editMode}
              setUpdateComponent={setUpdateComponent}
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
