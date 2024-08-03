import styles from "../NotificateBTN/Notification.module.scss";


export default function Notification(props) {

    let user = props.user;
    let class_name = props.class_name;
    let clickAction = props.clickAction ?? Function.prototype;
    let actionVariable = props.actionVariable;

    return (
        <button
            className={`${styles.Notificate} ${styles[class_name]} `}
            onClick={() => clickAction(actionVariable)}
            title={`${user.last_name} ${user.first_name} (${user.username})`}
        >
            {props.children}
            <div className={styles.NotificateUserName}>
                {user.first_letter}
            </div>
        </button>
    )
};
