
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

  useEffect(() => {
    request({
      method:'POST',
      url:`${typeElem}/`,
      callback:(response) => { 
        if (response.status === 200) {
          console.log(response.data);
        }
      },
      data: { 'id': idElem },
      status:200,
    });

  },[typeElem, idElem]);
    
  return (
    <div className={styles.wrap}>
        {props.children}
        {/* хедер */}
        <div className={styles.header}>
          header:
          <h3>
            {typeElem}: { idElem ? <span>{idElem}</span> : <span>{idElem}</span> }
          </h3>
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

