
import styles from "./WindowModal.module.scss"

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import request from "../../api/request";

export default function WindowModal(props){
  // console.log(props);
  let typeElem = props.typeElem;
  let idElem = Number(props.idElem);
  let updateFunc = props.updateFunc;

  // const [mainState, setMainState] = useState(false);

  const [value, setValue] = useState('');
  let [windowData, setWindowData] = useState({});
  let [windowName, setWindowName] = useState('');

  let [newName, setNewNameField] = useState(false);
  let [newText, setNewTextData] = useState('');

  useEffect(() => {
    request({
      method:'POST',
      url:`${typeElem}/`,
      callback:(response) => { 
        if (response.status === 200) {
          console.log(response.data);
          if(response.data){
            setWindowData(response.data[0]);
            setWindowName(response.data[0]['name']);
          }
        }
      },
      data: { 'id': idElem },
      status:200,
    });

  },[typeElem, idElem]);

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
    setWindowName((newText) => (newText = evt));
  }

  const windowNameHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey || evt.type === "blur"){
      // console.log('"windowNameHandleKeyPress", ура!');
      showTextarea();
      // updateTask(windowData.id, windowName);
      console.log('мы тут');
      updateFunc(windowData.id, windowName);
      // request({
      //   method: "POST",
      //   url: `new-data-${typeElem}/`,
      //   callback: (request) => { responseNewName(request) },
      //   data: {id: windowData.id, name: windowName},
      //   status: 200,
      // });
    }
    // console.log(typeof(windowName));
  }

  function responseNewName(response) {
    // console.log(response);
    if (response) {
      let newName = response.data[0]['name'];

      setWindowName(windowData = newName);

      // setNewTextTask('Новая задача');
    }
  }
  // console.log(windowData);
    
  return (
    <div className={styles.wrap}>
        {props.children}
        <div className={styles.header}>
          {/* header: */}
          <span className={styles.headerIcon}></span>
          <div 
            className={styles.headerTitle}
          >
          
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
              onFocus={(evt) => evt.currentTarget.select(evt)}
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

          
            
            {/* <div class="window-title">
              <h2 id="js-dialog-title" class="card-detail-title-assist js-title-helper" dir="auto">Страница участники</h2>
              <textarea class="mod-card-back-title js-card-detail-title-input" dir="auto" data-testid="card-back-title-input" data-autosize="true" style="overflow: hidden; overflow-wrap: break-word; height: 35.8889px;"></textarea>
            </div> */}
            {/* <div class="window-header-inline-content quiet js-current-list">
              <p class="u-inline-block">в колонке 
                <a href="#" class="js-open-move-from-header">in progress</a>
              </p>
            </div>
            <div class="window-header-inline-content js-subscribed-indicator-header">
              <span class="icon-sm icon-subscribe"></span>
            </div>
          </div> */}

          участники в колонке/карточке "название"

        </div>
        {/* главная коронка */}
        <div className={styles.mainCol}>
          mainCol:
          Описание:
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          Добавить более подробное описание…

          Действия
          Показать подробности
          Напишите комментарий…

        </div>
        {/* сайдбар */}
        <div className={styles.sidebar}>
          sidebar:
          Добавить на карточку
        </div>

    </div>
  )
};

