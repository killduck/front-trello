import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { registerLocale } from  "react-datepicker";
import { ru } from 'date-fns/locale/ru';

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarDueDate.module.scss";
import { useState } from "react";


export default function SidebarDueDate(props){

  let funcDueDateWindow = props.funcDueDateWindow; 
  let dueDateWindow = props.dueDateWindow; 

  const [checkbox, setCheckbox] = useState(false);

  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // const pastDate = (date) => new Date() < date-1;

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setCheckbox(true);
    setStartDate(startDate);
    setEndDate(endDate);
  };
  
  registerLocale('ru', ru);

  function funcEraseDates(){
    setStartDate('');
    setEndDate('');
  }

  function onDeteWindow(){
    if(!checkbox){
      setCheckbox(true);
      // setColoredLabel_id(label.id);
      // console.log(windowData.id, label);
      // updateCardLabel(windowData.id, label);
    }
    else{
      setCheckbox(false);
      // updateCardLabel(windowData.id, {'id': null});
      // setCardLabel(false);
    }
  }



  return (

      <div className={styles.smallWindowWrap}>

        <header className={styles.itemHeader}>
          <h2 className={styles.itemHeaderTitle} title="Метки">Даты</h2>
          <div className={styles.iconWrap}>
            <Button
                className={'btnSmallWindow'}
                type="button"
                ariaLabel="Закрыть окно"
                clickAction={funcDueDateWindow}
            >
              <Icons
                  class_name={'btnModalCloseIcon'}
                  name={'CloseIcon'}
              />
            </Button>
          </div>
        </header>
        <div className={styles.dueDateWrap}>
          {/* SidebarDueDate */}
          <DatePicker
            inline
            style={{}}
            className={styles.DatePicker}
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            // showTimeSelect
            showTimeInput
           
            autoFocus={true}
            shouldCloseOnSelect={false}
            locale='ru'
            dateFormat="d.m.yyyy"
            minDate={new Date(1)}

          />
        </div>

        <label className={styles.dueDateItem}>
          <input className={styles.dueDateItemInput} type="checkbox" />
          
          <span className={styles.dueDateItemCheckboxWrap}>
            <span 
              className={`${styles.dueDateItemCheckbox} ${checkbox ? styles.checked : "" }`}
              onClick={onDeteWindow}
            >
              <Icons 
                name={'selected_label'}
                class_name={'iconSelectedLabel'}
                fill={"#1d2125"}
              />
            </span>
          </span>
        </label>
        <input 
          className={styles.dueDateTextInput} 
          type="text" placeholder="Д.М.ГГГГ" 
          aria-placeholder="Д.М.ГГГГ" 
          name="date" 
          value={checkbox ? startDate : ""}  
          disabled={checkbox ? "" : true}
        />



        <div className={styles.cardEditorButtonWrap}>
          <Button
            className={'dueDateSave'} 
            // actionVariable={'no'}
            // clickAction = {onSaveActivityReactQuillComment}
          >Сохранить</Button>
          <Button
            className={'dueDateCancel'} 
            // actionVariable={null}
            clickAction = {funcEraseDates}
          >Отмена</Button>
        </div>

    </div>
  )
};

