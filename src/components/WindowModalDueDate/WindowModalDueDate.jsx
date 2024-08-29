import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalDueDate.module.scss";
import Button from "../ui/Button/Button";
import request from "../../api/request";

export default function WindowModalDueDate(props){
  // console.log(props);

  let windowData = props.windowData; 
  let funcDueDateWindow = props.funcDueDateWindow; 

  let dueDateCheckbox = props.dueDateCheckbox;
  let setDueDateCheckbox = props.setDueDateCheckbox;

  let setUpdateValue = props.setUpdateValue; 


  function sendExecute(card_execute){
    request({
      method:'POST',
      url:'add-card-due-date-execute/',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            setUpdateValue(true);
          }
        }
      },
      data: {'card_id': windowData.id, 'card_execute': card_execute},
      status:200,
    });
  } 

  function onDeteWindow(){
    if(dueDateCheckbox){
      setDueDateCheckbox(dueDateCheckbox = false);
    }
    else{
      setDueDateCheckbox(dueDateCheckbox = true);
    }
    sendExecute(dueDateCheckbox);
  }

  return (
    <>
    {windowData.date_end ?
      <div className={styles.cardDetailNotifications}>
        <h3 className={styles.cardDetailsTitle}>Срок</h3>
        <div className={styles.dueDateItemWrap}>
          
          <label className={styles.dueDateItem}>
            <input className={styles.dueDateItemInput} type="checkbox" />
            
            <span className={styles.dueDateItemCheckboxWrap}>
              <span 
                className={`${styles.dueDateItemCheckbox} ${dueDateCheckbox ? styles.checked : "" }`}
                onClick={onDeteWindow}
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
              clickAction={funcDueDateWindow}
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
