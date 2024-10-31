import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalDueDate.module.scss";
import Button from "../ui/Button/Button";
import request from "../../api/request";
import { useDispatch, useSelector } from "react-redux";
import { setDueDateCheckbox, setDueDatePreloder, setDueDateWindow } from "../../main_state/states/modalDueDate/modalDueDate";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import openCloseFrameFunction from "../../helpers/openCloseWindowFunction";

export default function WindowModalDueDate(props){

  const windowData = useSelector((state) => state.windowData.value);
  const dueDateWindow = useSelector((state) => state.modalDueDateState.dueDateWindow);
  const dueDateCheckbox = useSelector((state) => state.modalDueDateState.dueDateCheckbox);
  const dueDatePreloder = useSelector((state) => state.modalDueDateState.dueDatePreloder);

  const dispatch = useDispatch();

  function funcDueDateWindow(){
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: dueDateWindow, 
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setDueDateWindow, 
      dispatch: dispatch,
    });
    // if(dueDateWindow){
    //   dispatch(setDueDateWindow(false));
    // }
    // else{
    //   dispatch(setDueDateWindow(true));
    // }
  }

  function sendExecute(card_execute){
    dispatch(setDueDatePreloder(true));

    request({
      method:'POST',
      url:'add-card-due-date-execute/',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            dispatch(setDueDateCheckbox(response.data[0]['execute']));
            dispatch(setDueDatePreloder(false));
          }
        }
      },
      data: {'card_id': windowData.id, 'card_execute': card_execute},
      status:200,
    });
  } 

  return (
    <>
    {windowData.date_end ?
      <div className={styles.cardDetailNotifications}>
        <h3 className={styles.cardDetailsTitle}>Срок</h3>
        <div className={ dueDatePreloder ? `${styles.cardDueDateWindowGradient} ${styles.dueDateItemWrap}` : styles.dueDateItemWrap}>
          
          <label className={styles.dueDateItem}>
            <input className={styles.dueDateItemInput} type="checkbox" />
            
            <span className={styles.dueDateItemCheckboxWrap}>
              <span 
                className={`${styles.dueDateItemCheckbox} ${dueDateCheckbox ? styles.checked : "" }`}
                onClick={dueDatePreloder ? null : ()=>{ sendExecute(dueDateCheckbox ? false : true) } }
              >
                <Icons 
                  name={'selected_label'}
                  class_name={'iconSelectedLabel'}
                  fill={"#1d2125"}
                />
              </span>
            </span>
          </label>

          <div>
            <div 
              className={styles.itemDueDate}
              onClick={funcDueDateWindow}
            />
            <Button
              className = {'BtnCardSubscribe'}
              ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
              clickAction={ dueDatePreloder ? null : funcDueDateWindow }
            >
              <span>
                {new Date(windowData.date_end).toLocaleString("ru", {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})}
              </span>
              {dueDateCheckbox ? 
                <span className={styles.itemDueDateExecute}>Выполнить</span>
                :
                ""
              }
              <Icons
                name={'ArrowDown'}
                class_name={'BtnDropMenuIcon'}
              />
            </Button>
          </div>
        </div>
      </div>
      :
      ""
    }
    </>
  )
};
