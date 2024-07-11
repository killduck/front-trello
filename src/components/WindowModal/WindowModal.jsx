
import styles from "./WindowModal.module.scss"

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function WindowModal(props){
    // console.log(props.data);
    let typeElem = props.data.typeElem;
    let idColumn = Number(props.data.idColumn);
    let idTask = Number(props.data.idTask);
    // console.log(typeElem, idColumn, idTask);
    const [value, setValue] = useState('');
    
  return (
    <div className={styles.wrap}>
        {props.children}
        {/* хедер */}
        <div className={styles.header}>
          header:
          <h3>
            {typeElem}: { idTask ? <span>{idTask}</span> : <span>{idColumn}</span> }
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

