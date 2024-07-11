
import styles from "./WindowModal.module.scss"


export default function WindowModal(props){
    // console.log(props.data);
    let typeElem = props.data.typeElem;
    let idColumn = Number(props.data.idColumn);
    let idTask = Number(props.data.idTask);
    // console.log(typeElem, idColumn, idTask);
    
  return (
    <div className={styles.wrap}>
        {/* <h2>WindowPortal</h2>
        <p>Текст модального окна</p> */}
        <div className={styles.header}>
          header:
          <h3>
            {typeElem}: { idTask ? <span>{idTask}</span> : <span>{idColumn}</span> }
          </h3>
          участники в колонке/карточке "название"

        </div>
        <div className={styles.mainCol}>
          mainCol:
          Описание
          Добавить более подробное описание…

          Действия
          Показать подробности
          Напишите комментарий…

        </div>
        <div className={styles.sidebar}>
          sidebar:
          Добавить на карточку
        </div>

    </div>
  )
};

