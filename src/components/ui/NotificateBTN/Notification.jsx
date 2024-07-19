import styles from "../NotificateBTN/Notification.module.scss";


export default function Notification(props) {

    let authorized_user = props.authorized_user;

    let first_letter = props.first_letter;

    return (
        <button className={styles.Notificate}>
            {props.children}
            <div className={styles.NotificateUserName}>
                {first_letter}
            </div>

        </button>
    )
};
