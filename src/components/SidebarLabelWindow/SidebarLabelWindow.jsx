import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarLabelWindow.module.scss";
import request from "../../api/request";
import { useDispatch, useSelector } from "react-redux";
import { 
  setCardLabelStatus, 
  setShowLabelsWindow, 
  setShowPreloderLabel } from "../../main_state/states/modalCardLabel/modalCardLabel";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";

export default function SidebarLabelWindow(props){
  // console.log(props);
  
  let updateCardLabel = props.updateCardLabel; //это прилетает из дашборда

  const [checkbox, setCheckbox] = useState(false);
  const [coloredLabels, setColoredLabels] = useState([]);
  const [coloredLabel_id, setColoredLabel_id] = useState(Number);
  
  const windowData = useSelector((state) => state.windowData.value);
  const showLabelsWindow = useSelector((state) => state.modalCardLabelState.showLabelsWindow); 
  const showPreloderLabel = useSelector((state) => state.modalCardLabelState.showPreloderLabel); 

  const dispatch = useDispatch();

  useEffect(() => {
    request({
      method:'GET',
      url:'label-data',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            setColoredLabels(response.data);
          }
          if(showLabelsWindow && windowData.label){
            setCheckbox(true);
            setColoredLabel_id(windowData.label.id);
            // onTakeColor(windowData.label);
          }
        }
      },
      data: {},
      status:200,
    });
  },[]);


  function funcLabelsWindow() {
    dispatch(onRemoving_onFrames());
    if(showLabelsWindow){
      dispatch(setShowLabelsWindow(false));
    }
    else{
      dispatch(setShowLabelsWindow(true));
    }
  }

  function onTakeColor(label){
    if(showPreloderLabel){
      return;
    }
    
    dispatch(setShowPreloderLabel(label.id));

    if(!checkbox){
      // setCheckbox(true);
      // setColoredLabel_id(label.id);
      updateCardLabel(windowData.id, label);
    }
    else{
      // setCheckbox(false);
      updateCardLabel(windowData.id, {'id': 'null'});
      dispatch(setCardLabelStatus(false));
    }
  }

  return (
    <div className={styles.smallWindowWrap}>
      <header className={styles.itemHeader}>
        <h2 className={styles.itemHeaderTitle} title="Метки">Метки</h2>
        <div className={styles.iconWrap}>
          <Button
              className={'btnSmallWindow'}
              type="button"
              ariaLabel="Закрыть окно"
              clickAction={funcLabelsWindow}
          >
            <Icons
                class_name={'btnModalCloseIcon'}
                name={'CloseIcon'}
            />
          </Button>
        </div>
      </header>
      <div className={styles.labelWrap}>
        <ul className={styles.labelList}>
        {coloredLabels.map((coloredLabel) => (
            <li key={coloredLabel.id}>
              <label className={
                `${styles.labelItem} 
                ${showPreloderLabel ? styles.labelItemWait : ""} 
                ${showPreloderLabel === coloredLabel.id ? styles.cardLabelWindowInputGradient: ""}` 
              }>
                <input className={styles.labelItemInput} type="checkbox"/>
                <span className={styles.labelItemCheckboxWrap}>
                  <span 
                    className={`${styles.labelItemCheckbox} ${(checkbox && coloredLabel_id === coloredLabel.id) ? styles.checked : "" }`}
                    onClick={() => onTakeColor(coloredLabel)}
                  >
                    <Icons 
                      name={'selected_label'}
                      class_name={'iconSelectedLabel'}
                      fill={"#1d2125"}
                    />
                  </span>
                </span>

                <span className={styles.labelItemColor}>
                  <div className={styles.labelItemColorDiv}>
                    <span 
                      className={styles.labelItemColorSpan}
                      style={(showPreloderLabel === coloredLabel.id) ? {} : {backgroundColor: coloredLabel.color_hex}} 
                      onClick={() => onTakeColor(coloredLabel)}
                    ></span>
                  </div>
                </span>
              </label>
            </li>
          )
        )}
        </ul>
      </div>
    </div>
  )
};

