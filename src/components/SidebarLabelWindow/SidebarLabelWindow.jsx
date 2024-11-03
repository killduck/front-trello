import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarLabelWindow.module.scss";
import request from "../../api/request";
import { useDispatch, useSelector } from "react-redux";
import { 
  setCardLabelStatus, 
  setShowLabelsWindow, 
  setShowLabelsWindowText, 
  setShowPreloderLabel } from "../../main_state/states/modalCardLabel/modalCardLabel";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import openCloseFrameFunction from "../../helpers/openCloseWindowFunction";

export default function SidebarLabelWindow(props){
  
  let updateSetCardLabel = props.updateSetCardLabel; //это прилетает из дашборда
  
  const windowData = useSelector((state) => state.windowData.value);
  const showLabelsWindow = useSelector((state) => state.modalCardLabelState.showLabelsWindow); 
  const showLabelsWindowText = useSelector((state) => state.modalCardLabelState.showLabelsWindowText); 
  const showPreloderLabel = useSelector((state) => state.modalCardLabelState.showPreloderLabel); 
  const labelWindowText = useSelector((state) => state.modalCardLabelState.labelWindowText); 

  const [checkbox, setCheckbox] = useState(false);
  const [coloredLabels, setColoredLabels] = useState([]);
  const [coloredLabel_id, setColoredLabel_id] = useState(Number);
  const [labelWindowTextNew, setLabelWindowTextNew] = useState(labelWindowText ? labelWindowText : '');

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
          }
          dispatch(setShowLabelsWindowText(false));
        }
      },
      data: {},
      status:200,
    });
  },[showLabelsWindow, windowData]);


  function funcLabelsWindow() {
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: showLabelsWindow, 
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setShowLabelsWindow, 
      dispatch: dispatch,
    });
  }

  function onTakeColor(label){
    if(showPreloderLabel){
      return;
    }
    
    dispatch(setShowPreloderLabel(label.id));

    if(!checkbox){
      updateCardLabel(label, labelWindowTextNew !== '' ? labelWindowTextNew : 'null' );
    }
    else{
      updateCardLabel({'id': 'null'}, 'null');
      dispatch(setCardLabelStatus(false));
    }
  }

  function updateCardLabel(label, labelText) {
    if(showPreloderLabel){
      return;
    }
    
    request({
      method: "POST",
      url: 'add-label-to-card/',
      callback: (response) => {
        if (response.status === 200) {
          let new_card_id = response.data[0]['id'];
          let new_label = response.data[0]['label'];
          let new_label_text = response.data[0]['label_text'];
          updateSetCardLabel(new_card_id, new_label, new_label_text);
          dispatch(setShowPreloderLabel(false)); 
        }
      },
      data: { "card_id": windowData.id, "label_id": label.id, "label_text": labelText},
      status: 200,
    });
  }

  function onTakeLabelText(label){
    if(showPreloderLabel){
      return;
    }
    
    dispatch(setShowPreloderLabel(label.id));

    if(labelWindowTextNew !== labelWindowText){
      updateCardLabel(label, labelWindowTextNew);
      funkLabelText();
    }
    else{
      setLabelWindowTextNew(labelWindowText ? labelWindowText : ''); 
      dispatch(setCardLabelStatus(false));
      dispatch(setShowPreloderLabel(false));
      funkLabelText();
    }
  }

  function labelTextHandleKeyPress(evt, label){
    if(evt.key === 'Enter' && evt.shiftKey){
      onTakeLabelText(label);
    }
  }

  function funkLabelText(){
    openCloseFrameFunction({
      variable: showLabelsWindowText, 
      ifVariableTrue: false, 
      ifVariableFalse: windowData.label.id, 
      method: setShowLabelsWindowText, 
      dispatch: dispatch,
    });
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
            <li key={coloredLabel.id} className={showLabelsWindowText === coloredLabel.id ? styles.labelListLi : ""}>
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
                    >{checkbox && coloredLabel_id === coloredLabel.id && labelWindowText}</span>

                    {checkbox && coloredLabel_id === coloredLabel.id && (
                      <Button
                        clickAction={funkLabelText}
                        className={'BtnLabelText'}
                      >
                        <Icons
                          name={'icon-editIcon'}
                          class_name={'iconSelectedLabel'}
                        />
                      </Button>)
                    }
                  </div>
                </span>
              </label>
              
              {showLabelsWindowText === coloredLabel.id && (
                <div className={styles.labeTextButtonWrap}>
                  <div className={styles.labeTextInputWrap}>
                    <input 
                      disabled={showPreloderLabel ? 'disabled' : ""}
                      id="labelText" 
                      name="labelText" 
                      placeholder="Текст для метки" 
                      className={styles.labeTextInput} 
                      value={labelWindowTextNew}
                      autoFocus={true}
                      // onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }
                      onChange={(evt) => setLabelWindowTextNew(evt.target.value)}
                      onKeyDown={(evt)=>labelTextHandleKeyPress(evt, coloredLabel)}
                      onBlur={(evt)=>labelTextHandleKeyPress(evt, coloredLabel)}
                    />
                  </div>
                  <Button
                    className={'cardLabeTextSave'}
                    clickAction = {showPreloderLabel ? null : () => onTakeLabelText(coloredLabel)}
                  >Сохранить</Button>
                  <Button
                    className={'cardLabeTextCancel'} 
                    actionVariable={false}
                    clickAction = {showPreloderLabel ? null : funkLabelText}
                  >Отмена</Button>
                </div>
              )}
            </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
};
