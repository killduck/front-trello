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
          {/* <li>
            <label className={styles.labelItem}>
              <input className={styles.labelItemInput} type="checkbox"/>
              
              <span className={styles.labelItemCheckboxWrap}>
                <span 
                  className={`${styles.labelItemCheckbox} ${checkbox ? styles.checked : "" }`}
                  onClick={onTakeColor}
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
                    style={{backgroundColor: "#216e4e"}} 
                    onClick={onTakeColor}
                  ></span>
                  <button class="f25eUBXWNIVzAd bxgKMAm3lq5BpA iUcMblFAuq9LKn HAVwIqCeMHpVKh SEj5vUdI3VvxDc" type="button" tabindex="0">
                    <span class="nch-icon A3PtEe1rGIm_yL neoUEAwI0GETBQ fAvkXZrzkeHLoc">
                      <span data-testid="EditIcon" aria-hidden="true" class="css-snhnyn" style={{}}>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path>
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </span>
            </label>
          </li> */}
        </ul>
      </div>
    </div>
  )
};

