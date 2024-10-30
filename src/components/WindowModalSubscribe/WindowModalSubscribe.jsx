import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalSubscribe.module.scss";

export default function WindowModalSubscribe(props){

  let subscribe = props.subscribe;
  let funcSubscribe = props.funcSubscribe;

  return (
    <div className={styles.cardDetailNotifications} >
      <h3  className={styles.cardDetailsTitle}>
        Уведомления
      </h3>
      
      { (!subscribe) ? (
        <Button
          className = {'BtnCardSubscribe'}
          ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
          clickAction = {funcSubscribe}
        >
          
          <Icons
            name={'eye-open'}
            class_name={'iconCardSubscribe'}
            sizeWidth={"14"}
            sizeHeight={"14"}
          /> 
          <span>Подписаться</span>
        </Button>
        ):(
        <Button
          className = {'BtnCardSubscribe'}
          ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
          clickAction = {funcSubscribe}
          style={{paddingRight: "32px", width: "138px"}}
        >
          <Icons
            name={'eye-open'}
            class_name={'iconCardSubscribe'}
            sizeWidth={"14"}
            sizeHeight={"14"}
          /> 
          <span className={styles.cardDetailsInfo}>Вы подписаны</span>
          <span style={{paddingLeft: "5px"}}>...</span>
          <span className={styles.simbolSubscribed}>
            <Icons 
              name={'selected'}
              class_name={'iconSelected'}
            />
          </span>
        </Button>
        )
      }
    </div>       
  )
};
