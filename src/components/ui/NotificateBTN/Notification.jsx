import { URL_API } from "../../../api/config";
import styles from "../NotificateBTN/Notification.module.scss";


export default function Notification(props) {

  let user = props.user;
  let funkMemberMenu = props.funkMemberMenu ?? Function.prototype;

  return (
    <div
      className={styles.Notificate}
      title={`${user.last_name} ${user.first_name} (${user.username})`}
    >      
      {user.img ?
        (<img 
          className={styles.memberAvatar} 
          src={`${URL_API + user.img}`}
          alt={`${user.first_name} (${user.username})`}
          title={`${user.first_name} (${user.username})`}
          onClick={() => funkMemberMenu()}
        />)
        :
        (<span 
          className={styles.memberAvatarSpan} 
          title={`${user.first_name} (${user.username})`}
          onClick={() => funkMemberMenu()}
        >{user.first_letter}</span>)
      }

      {props.children}

    </div>
  )
};
