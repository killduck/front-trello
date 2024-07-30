import { useState } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarLabelWindow.module.scss";


export default function SidebarLabelWindow(props){

  let funcLabelsWindow = props.funcLabelsWindow;
  let labelsWindow = props.labelsWindow;

  let [checkbox, setCheckbox] = useState(false);


  function onTakeColor(){
    console.log('sas');
    console.log(checkbox);

    if(!checkbox){
      console.log('da');
      setCheckbox(true);
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
          <li
            onClick={onTakeColor}
          >
            <label className={styles.labelItem}>
              <input className={styles.labelItemInput} type="checkbox"/>
              
              <span className={styles.labelItemCheckboxWrap}>
                <span className={`${styles.labelItemCheckbox} ${checkbox ? styles.checked : "" }`}>
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
                  ></span>
                  {/* <button class="f25eUBXWNIVzAd bxgKMAm3lq5BpA iUcMblFAuq9LKn HAVwIqCeMHpVKh SEj5vUdI3VvxDc" type="button" tabindex="0">
                    <span class="nch-icon A3PtEe1rGIm_yL neoUEAwI0GETBQ fAvkXZrzkeHLoc">
                      <span data-testid="EditIcon" aria-hidden="true" class="css-snhnyn" style={{}}>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path>
                        </svg>
                      </span>
                    </span>
                  </button> */}
                </div>
              </span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
};

