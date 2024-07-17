
import styles from "./WindowModal.module.scss"

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import request from "../../api/request";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";

export default function WindowModal(props){
  console.log(props);
  let typeElem = props.typeElem;
  let idElem = Number(props.idElem);
  // let task = props.task;
  let column = props.column;
  let updateFunc = props.updateFunc;
  // console.log(column);

  // const [mainState, setMainState] = useState(false);

  const [value, setValue] = useState('');

  let [windowData, setWindowData] = useState({});
  const [startWindowName, setStartWindowName] = useState('');
  let [windowName, setWindowName] = useState('');

  let [newName, setNewNameField] = useState(false);
  // let [newText, setNewTextData] = useState('');

  let [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    request({
      method:'POST',
      url:`${typeElem}/`,
      callback:(response) => { 
        if (response.status === 200) {
          // console.log(response.data);
          if(response.data){
            setWindowData(response.data[0]);
            setWindowName(response.data[0]['name']);
            setStartWindowName(response.data[0]['name']);
          }
        }
      },
      data: { 'id': idElem },
      status:200,
    });

  },[typeElem, idElem]);
  // console.log(windowData);
  function showTextarea() {
    if(!newName){
      setNewNameField(newName = true);
    }
    else{
      setNewNameField(newName = false);
    }
  }

  function writeNewText(evt) {
    // console.log(evt);
    setWindowName((prev) => (prev = evt));
  }

  const windowNameHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey || evt.type === "blur"){
      showTextarea();

      if(windowName !== startWindowName){
        updateFunc(windowData.id, windowName);
        setStartWindowName(windowName);
      }

    }
  }

  function funcSubscribe(){
    if(subscribe){
      setSubscribe(false);
    }
    else{
      setSubscribe(true);
    }
  }

  const headerSection = (
  <>
    <span className={styles.headerIcon}></span>
    <div className={styles.headerTitle}>
    
      {(!newName) ?
      (
      <h2 onClick={ showTextarea } >
        { windowName }
      </h2>
      )
      :
      (
      <textarea 
        autoFocus
        onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }// evt.currentTarget.select(evt);
        onChange={(evt) => writeNewText(evt.target.value)}
        onKeyDown={windowNameHandleKeyPress}
        onBlur={windowNameHandleKeyPress}

        className={''} 
        dir="auto" 
        data-testid="card-back-title-input" 
        data-autosize="true"
        value={ windowName }
        placeholder="введите название"
        style={{overflow: "hidden", overflowWrap: "break-word", height: "35.8889px"}} 
      />
      )
      }

    </div>
    <div className={styles.columnTitle}> {/* "window-header-inline-content quiet js-current-list" */}
      <p className={styles.columnTitleName}>В колонке "{column.name}".</p>
      {subscribe ?
      (<span>
        <Icons
          name={'eye-open'}
          className={''}
          sizeWidth={"14"}
          sizeHeight={"14"}
        /> 
      </span>) : "" } 
    </div>
  </>
  )

  const elementSubscribe = (
    <div className={styles.cardDetailNotifications} >
      <h3  className={styles.cardDetailsTitle}>
        Уведомления
      </h3>
      
      { (!subscribe) ?
      (
      <Button
        className = {'BtnCardSubscribe'}
        ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
        clickAction = {funcSubscribe}
      >
        
        <Icons
          name={'eye-open'}
          class_name={'iconCardSubscribe'}
          sizeWidth={"14"}
          sizeHeight={"14"}
        /> 
        <span>Подписаться</span>
      </Button>
      )
      :
      (
      <Button
        className = {'BtnCardSubscribe'}
        ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
        clickAction = {funcSubscribe}
        style={{paddingRight: "32px", width: "138px"}}
      >
        
        <Icons
          name={'eye-open'}
          class_name={'iconCardSubscribe'}
          sizeWidth={"14"}
          sizeHeight={"14"}
        /> 
        <span className={styles.cardDetailsInfo}>Вы подписаны</span>
        <span style={{paddingLeft: "5px"}}>...</span>
        <span className={styles.simbolSubscribed}>
          <Icons 
            name={'selected'}
            class_name={'iconSelected'}
          />
        </span>
      </Button>
      )
    }
    </div>
  )

  const columnMembers = (
    "участники в колонке/карточке"
  )

  const columnLabels = (
    "метки"
  )

  const columnDueDate = (
    "дата"
  )
   
  return (
    <div className={styles.wrap}>
        {props.children}

        {/* header */}
        <div className={styles.header}>
          { headerSection }
        </div>

        {/* главная колонка */}
        <div className={styles.mainCol}>

          <div className={styles.cardDetails} >
            <div className={styles.cardDetailItem}>
              {columnMembers}
            </div>

            <div className={styles.cardDetailItem}>
              {columnLabels}
            </div>

            <div className={styles.cardDetailItem}>
              {elementSubscribe}
            </div>

            <div className={styles.cardDetailItem}>
              {columnDueDate}
            </div>
            
          </div>

          <div  className={styles.cardDescription}>
            Описание:
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            Добавить более подробное описание…
          </div>
          
          <div  className={styles.cardAttachmentsSection}>
            Действия (Тут же: показать подробности, напишите комментарий…)
          </div>

        </div>
        {/* сайдбар */}
        <div className={styles.sidebar}>
          {/* sidebar */}
          <div className={styles.addItemsWrap}>
            <h3 class={styles.cardTitle}>Добавить на карточку:</h3>
            <div className={styles.itemsWrap}>
              
              <div className={styles.itemMembers}>
                Участники
              </div>

              <div className={styles.itemLabels}>
                Метки
              </div>

              <div className={styles.itemDueDate}>
                Даты
              </div>

              <div className={styles.itemAttachments}>
                Прикрепить
              </div>

            </div>

          </div>

          <div className={styles.actionsWrap}>
            <h3 class={styles.actionsTitle}>Действия:</h3>
            <div className={styles.actionsWrap}>
              <div className={styles.actionDeleteCard}>
                Удалить карточку
              </div>
            </div>

          </div>

          
        </div>

    </div>
  )
};

