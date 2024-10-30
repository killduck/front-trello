import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalCardLabel.module.scss";

export default function WindowModalCardLabel(props){

  let task = props.task;
  let cardLabel = props.cardLabel;
  let funcLabelsWindow = props.funcLabelsWindow;

  return (
    <>
    {(cardLabel) ?
      (<div className={styles.cardDetailNotifications}>
        <h3 className={styles.cardDetailsTitle}>Метки</h3>
        <div className={styles.labelsList} data-testid="card-back-labels-container">
          <span 
            className={styles.labelElement} 
            style={task.label ? {backgroundColor: task.label.color_hex} : {}}
            tabIndex="0" 
            aria-label={task.label ? `Цвет: ${task.label.name}, название: «без цвета»`: ""}
            data-color={task.label ? task.label.name : ""}
            onClick={funcLabelsWindow}
          />
          <Button
            clickAction={funcLabelsWindow}
            className={'btnWindowModalMainColAddLabel'}
          >
            <Icons
              name={'AddIcon'}
              class_name={'IconWindowModalMainColAddLabel'}
            />
          </Button>
        </div>
      </div>):""
    }
    </> 
  )
};
