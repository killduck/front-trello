import styles from "./WindowModalHeaderSection.module.scss";
import Icons from "../ui/Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setNewNameField, setNewWindowName } from "../../main_state/states/modalHeader/windowName";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import openCloseFrameFunction from "../../helpers/openCloseWindowFunction";

export default function WindowModalHeaderSection(props){

  let updateFunc = props.updateFunc;
  let column = props.column;
  
  const subscribeState = useSelector((state) => state.subscribeState.value);
  const windowData = useSelector((state) => state.windowData.value);
  const startWindowName = useSelector((state) => state.windowNameState.startWindowName);
  const newWindowName = useSelector((state) => state.windowNameState.newWindowName);
  const newNameField = useSelector((state) => state.windowNameState.newNameField);
  const preloaderWindowName = useSelector((state) => state.windowNameState.preloaderWindowName);

  const dispatch = useDispatch();

  function showTextarea() {
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: newNameField, 
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setNewNameField, 
      dispatch: dispatch,
    });
  }

  function writeNewText(evt) {
    dispatch(setNewWindowName(evt));
  }

  const windowNameHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey || evt.type === "blur"){
      showTextarea();
      if(newWindowName !== startWindowName){
        updateFunc(windowData.id, newWindowName);
      }
    }
  }

  return (
    <div className={styles.header}>
      <span className={styles.headerIcon}>
         <Icons
          sizeWidth={"24px"}
          sizeHeight={"24px"}
          name={'card-icon'}
          class_name={'IconWindowModalHeaderIcon'}
        />
      </span>
      <div className={ styles.headerTitle }>
      
        {(!newNameField) ?
        (
        <h2 
          className={ preloaderWindowName ? `${styles.title} ${styles.cardHeaderTitleGradient}` : styles.title}
          onClick={ preloaderWindowName ? null : showTextarea } 
        >
          { startWindowName }
        </h2>
        )
        :
        (
        <textarea 
          autoFocus
          onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }
          onChange={(evt) => writeNewText(evt.target.value)}
          onKeyDown={windowNameHandleKeyPress}
          onBlur={windowNameHandleKeyPress}
          className={''} 
          dir="auto" 
          data-testid="card-back-title-input" 
          data-autosize="true"
          value={ newWindowName }
          placeholder="введите название"
          style={{overflow: "hidden", overflowWrap: "break-word", height: "35.8889px"}} 
        />
        )
        }

      </div>
      <div className={styles.columnTitle}>
        <p className={styles.columnTitleName}>В колонке "{column.name}".</p>
        {subscribeState ?
          (<span>
            <Icons
              name={'eye-open'}
              className={''}
              sizeWidth={"14"}
              sizeHeight={"14"}
            /> 
          </span>
          ):("")
        } 
      </div>
    </div>
  )
};
