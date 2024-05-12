import styles from "./ButtonDropMenu.module.scss";


export default function ButtonDropMenu(props) {

  let option = {
    class_name: props.class_name,
    action: props.actionFunction,
  }

  return (
    <div
      className={`${styles.ButtonMenu} ${styles[option.class_name]}`}

      onClick={
        option.action ?
          () => { option.action() }
          :
          () => { }
      }
    >
      {props.children}
    </div >
  )
};
