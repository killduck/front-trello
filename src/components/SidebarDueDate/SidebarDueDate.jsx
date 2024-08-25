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

  const [checkbox, setCheckbox] = useState(true);

  // const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  // const [endDate, setEndDate] = useState('');
  // let [dateTime, setDateTime] = useState(String);
  let [newDate, setNewDate] = useState(String);


  function takeDate(){
    let month = startDate.getMonth();
    let year = startDate.getFullYear();
    let date = startDate.getDate();

    // let hours = startDate.getHours();
    // let Minutes = startDate.getMinutes();

    
    return `${date}.${month+1}.${year}`;
  }
  

  const handleChange = (date) => {
    // const [startDate, endDate] = range;
    setNewDate('');
    setCheckbox(true);
    setStartDate(date);
    // setEndDate(endDate);
  };

  function createNewDate(evt){
    // let date = {
    //   "date": "",
    //   "month": "",
    //   "year": "",
    // }
    console.log(evt.target.value);
    setNewDate(newDate = evt.target.value);
    console.log(newDate.split('.'));
    let arrDate = newDate.split('.');
    console.log(arrDate);
    // date['date'] = arrDate[0];
    // date['month'] = arrDate[1];
    // date['year'] = arrDate[2];
    console.log(startDate);
    // console.log(`${date}.${month}.${year}`);
    startDate.setDate(arrDate[0]);
    startDate.setMonth(Number(arrDate[1]) -1);
    startDate.setFullYear(arrDate[2]);

    console.log(startDate);
    // handleChange(startDate);
  }
  
  registerLocale('ru', ru);

  function funcEraseDates(){
    setStartDate(new Date());
    // setEndDate('');
    setCheckbox(false);
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
            className={styles.DatePicker}
            selected={startDate}
            onChange={(date) => handleChange(date)}
            startDate={startDate}
            // minDate={new Date()}
            // endDate={endDate}
            // selectsRange
            // showTimeSelect
            showTimeInput
            // autoFocus={true}
            // shouldCloseOnSelect={false}
            locale='ru'
            
            timeInputLabel=""
            dateFormat="d.m.yyyy h:mm aa"
            // timeFormat="HH:mm"
            todayButton="Сегодня"

          >
            <div className={styles.dueDateItemWrap}>
              <label className={styles.dueDateItemTittle}>
                Срок
              </label>
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
                onChange={(evt)=>createNewDate(evt)}
                value={checkbox ? newDate ? newDate : takeDate() : ""}  
                disabled={checkbox ? "" : true}
              />
            </div>
          </DatePicker>
        </div>

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
          >Сброс</Button>
        </div>

    </div>
  )
};

