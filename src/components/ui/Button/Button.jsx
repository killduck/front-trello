import styles from "../Button/Button.module.scss";
export default function Button(props) {
    return (
        <button className={styles.Btn}>
            {props.children}
        </button>
    )
};
