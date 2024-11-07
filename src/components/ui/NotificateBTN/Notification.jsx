import { URL_API } from "../../../api/config";
import styles from "../NotificateBTN/Notification.module.scss";


export default function Notification(props) {

  let user = props.user;
  let class_name = props.class_name;
  let clickAction = props.clickAction ?? Function.prototype;
  let actionVariable = props.actionVariable;

  return (
    <div
      className={styles.Notificate}
      title={`${user.last_name} ${user.first_name} (${user.username})`}
    >      
      {user.img ?
        (<img 
          // className={styles.memberAvatar} 
          className={`${styles.memberAvatar} ${styles[class_name]}`}
          src={`${URL_API + user.img}`}
          alt={`${user.first_name} (${user.username})`}
          title={`${user.first_name} (${user.username})`}
          onClick={() => clickAction(actionVariable)}
        />)
        :
        (<span 
          // className={styles.memberAvatarSpan} 
          className={`${styles.memberAvatarSpan} ${styles[class_name]}`}
          title={`${user.first_name} (${user.username})`}
          onClick={() => clickAction(actionVariable)}
        >{user.first_letter}</span>)
      }

      {props.children}

    </div>
  )
};
