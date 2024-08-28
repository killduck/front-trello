import { useState } from "react";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalDueDate.module.scss";
import Button from "../ui/Button/Button";


export default function WindowModalDueDate(props){
  console.log(props);

  let windowData = props.windowData; 
  let dueDateWindow = props.dueDateWindow; 
  let funcDueDateWindow = props.funcDueDateWindow; 

  const [checkbox, setCheckbox] = useState(true);

  function onDeteWindow(){
    if(!checkbox){
      setCheckbox(true);
    }
    else{
      setCheckbox(false);
    }
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
                className={`${styles.dueDateItemCheckbox} ${checkbox ? styles.checked : "" }`}
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
              {checkbox ? 
                <span class={styles.itemDueDateExecute}>Выполнить</span>
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

