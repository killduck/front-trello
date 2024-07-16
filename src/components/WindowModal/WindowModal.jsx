
import styles from "./WindowModal.module.scss"

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import request from "../../api/request";

export default function WindowModal(props){
  console.log(props);
  let typeElem = props.typeElem;
  let idElem = Number(props.idElem);
  // let task = props.task;
  let column = props.column;
  let updateFunc = props.updateFunc;
  console.log(column);

  // const [mainState, setMainState] = useState(false);

  const [value, setValue] = useState('');

  let [windowData, setWindowData] = useState({});
  const [startWindowName, setStartWindowName] = useState('');
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
            setStartWindowName(response.data[0]['name']);
          }
        }
      },
      data: { 'id': idElem },
      status:200,
    });

  },[typeElem, idElem]);
  console.log(windowData);
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
              <p className="u-inline-block">В колонке "{column.name}".</p>
              <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" role="presentation">
                    <g fill="currentColor" fillRule="evenodd">
                      <path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"></path>
                      <path d="M11.977 13.984c-1.103 0-2-.897-2-2s.897-2 2-2c1.104 0 2 .897 2 2s-.896 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.207 0 4-1.794 4-4s-1.793-4-4-4"></path>
                    </g>
                  </svg>
                </span>
          </div>

          участники в колонке/карточке "название"

        </div>
        {/* главная колонка */}
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

