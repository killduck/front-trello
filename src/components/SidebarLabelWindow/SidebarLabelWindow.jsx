import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarLabelWindow.module.scss";
import request from "../../api/request";


export default function SidebarLabelWindow(props){
  // console.log(props);
  let windowData = props.windowData;
  let funcLabelsWindow = props.funcLabelsWindow;
  let labelsWindow = props.labelsWindow;
  let updateCardLabel = props.updateCardLabel;
  let setCardLabel = props.setCardLabel;

  const [checkbox, setCheckbox] = useState(false);
  const [coloredLabels, setColoredLabels] = useState([]);
  const [coloredLabel_id, setColoredLabel_id] = useState(Number);


  useEffect(() => {
    request({
      method:'GET',
      url:'label-data',
      callback:(response) => { 
        if (response.status === 200) {
          // console.log(response.data);
          if(response.data){
            setColoredLabels(response.data);
          }

          if(labelsWindow && windowData.label){
            onTakeColor(windowData.label);
          }
        }
      },
      data: {},
      status:200,
    });
  },[]);


  function onTakeColor(label){
    if(!checkbox){
      setCheckbox(true);
      setColoredLabel_id(label.id);
      // console.log(windowData.id, label);
      updateCardLabel(windowData.id, label);
    }
    else{
      setCheckbox(false);
      updateCardLabel(windowData.id, {'id': null});
      setCardLabel(false);
    }
  }

  return (
    <div className={styles.smallWindowWrap}>
      <header className={styles.itemHeader}>
        <h2 className={styles.itemHeaderTitle} title="Метки">Метки</h2>
        <div className={styles.iconWrap}>
          <Button
              className={'btnSmallWindow'}
              type="dutton"
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
              <label className={styles.labelItem}>
                <input className={styles.labelItemInput} type="checkbox"/>
                
                <span className={styles.labelItemCheckboxWrap}>
                  <span 
                    className={`${styles.labelItemCheckbox} ${(checkbox && coloredLabel_id === coloredLabel.id) ? styles.checked : "" }`}
                    // onClick={onTakeColor}
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
                      style={{backgroundColor: coloredLabel.color_hex}} 
                      // onClick={onTakeColor}
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

