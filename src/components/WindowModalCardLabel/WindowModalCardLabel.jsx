import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalCardLabel.module.scss";
import { setShowLabelsWindow } from "../../main_state/states/modalCardLabel/modalCardLabel";

export default function WindowModalCardLabel(props){

  let task = props.task; //это прилетает из дашборда
  let onRemoving_onFrames = props.onRemoving_onFrames; 

  const showLabelsWindow = useSelector((state) => state.modalCardLabelState.showLabelsWindow); 
  const cardLabelStatus = useSelector((state) => state.modalCardLabelState.cardLabelStatus); 
  // console.log(showLabelsWindow);

  const dispatch = useDispatch();


  function funcLabelsWindow() {
    onRemoving_onFrames();
    if(showLabelsWindow){
      dispatch(setShowLabelsWindow(false));
    }
    else{
      dispatch(setShowLabelsWindow(true));
    }
  }

  return (
    <>
    {cardLabelStatus && (
      <div className={styles.cardDetailNotifications}>
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
      </div>)
    }
    </> 
  )
};
