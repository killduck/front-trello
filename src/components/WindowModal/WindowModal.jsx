
import styles from "./WindowModal.module.scss"

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import request from "../../api/request";

export default function WindowModal(props){
  console.log(props.data);
  let typeElem = props.data.typeElem;
  let idElem = Number(props.data.idElem);
  // let idTask = Number(props.data.idTask);
  // console.log(typeElem, idColumn, idTask);
  const [value, setValue] = useState('');
  let [windowData, setWindowData] = useState({});
  let [windowName, setWindowname] = useState('');

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
            setWindowData(windowData = response.data[0]);
            setWindowname(windowName = response.data[0]['name'])
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
    console.log(evt);
    setWindowname((newText) => (newText = evt));
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
              onChange={(evt) => writeNewText(evt.target.value)}
              // onKeyDown={handleKeyPress}

              className={''} dir="auto" 
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

