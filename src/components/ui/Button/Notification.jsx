import styles from "../Button/Notification.module.scss";
export default function Notification(props) {
    return (
        <button className={styles.Notificate}>
            N
            {props.children}
        </button>
    )
};
