import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { registerLocale } from  "react-datepicker";
import { ru } from 'date-fns/locale/ru';

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarDueDate.module.scss";
import { useState } from "react";
import request from "../../api/request";


export default function SidebarDueDate(props){
  // console.log(props);
  let windowData = props.windowData;
  let windowData_date_end = windowData.date_end;
  let funcDueDateWindow = props.funcDueDateWindow; 
  let setUpdateValue = props.setUpdateValue;

  const [checkbox, setCheckbox] = useState(true);

  // const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(windowData_date_end ? new Date(windowData_date_end) : new Date());
  let [arrDate, setArrDate] = useState([]);
  let [newDate, setNewDate] = useState(String);

  registerLocale('ru', ru);

  function takeDate(){
    let date = startDate.getDate();
    let month = startDate.getMonth();
    let year = startDate.getFullYear();
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

  function newStartDate(){
    startDate.setDate(arrDate[0]);
    startDate.setMonth(Number(arrDate[1]) -1);
    startDate.setFullYear(arrDate[2]);
    setStartDate(startDate);
  }

  function takeInputDateValue(evt){
    setNewDate(newDate = evt.target.value);
    setArrDate(arrDate = newDate.split('.'));

    if(arrDate.length === 3){
      newStartDate();
    }
  }

  function createNewDate(evt){
    if(evt.key === "Enter" && evt.shiftKey || evt.type === "blur"){
      if(arrDate.length === 3){
        newStartDate();
      }
    }
  }
  

  function funcEraseDates(){
    setStartDate(new Date());
    // setEndDate('');
    setCheckbox(false);
  }

  function onDeteWindow(){
    if(!checkbox){
      setCheckbox(true);
    }
    else{
      setCheckbox(false);
    }
  }

  function onSaveDueDate(){
    let sendind_end_date = '';
    let sendind_start_date = '';

    let end_day = startDate.getDate();
    let end_month = startDate.getMonth()+1;
    let end_year = startDate.getFullYear();
    let end_hours = startDate.getHours();
    let end_minutes = startDate.getMinutes();

    let chekking_date_format = new Date(end_year,end_month-1,end_day,end_hours,end_minutes,'00');
    console.log(chekking_date_format);
    sendind_end_date = `${end_day}-${end_month}-${end_year} ${end_hours}:${end_minutes}:00`;
    
    // пока что не ясно что с этим делать...
    // if(chekking_date_format.getTime() === startDate.getTime()){
    //   return;
    // }
    
    request({
      method:'POST',
      url:'add-card-due-date/',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            setStartDate(new Date(response.data[0].date_end));
            setUpdateValue(true);
            funcDueDateWindow();
          }
        }
      },
      data: {'card_id': windowData.id, 'start_date_time': sendind_start_date, 'end_date_time': sendind_end_date},
      status:200,
    });

  }

  function onDelDueDate(){

    request({
      method:'POST',
      url:'del-card-due-date/',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            setCheckbox(false);
            setUpdateValue(true);
            setStartDate(new Date());
          }
        }
      },
      data: {'card_id': windowData.id},
      status:200,
    });

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
          showPopperArrow = {false}
          selected={startDate}
          onChange={(date) => handleChange(date)}
          startDate={startDate}
          // minDate={new Date()}
          // endDate={endDate}
          // selectsRange
          // showTimeSelect
          showTimeInput={checkbox? true : false}
          // timeClassName={checked}
          locale='ru'
          timeInputLabel=""
          dateFormat="d.m.yyyy h:mm aa"
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
              type="text" placeholder="дд.мм.гггг" 
              aria-placeholder="дд.мм.гггг" 
              name="date" 
              onChange={(evt)=>takeInputDateValue(evt)}
              onKeyDown={(evt)=>createNewDate(evt)}
              onBlur={(evt)=>createNewDate(evt)}
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
          clickAction = {onSaveDueDate}
        >Сохранить</Button>

        <Button
          className={'dueDateCancel'} 
          // actionVariable={null}
          clickAction = {funcEraseDates}
        >Сброс даты</Button>
        
        <div className={styles.actionDeleteCard}>
          <Button
              // clickAction={deleteColumn}
              // actionVariable={column.id}
              // className={'BtnDeleteColumn'}
              clickAction={onDelDueDate}
              // actionVariable={windowData.id}
              className={'BtnDeleteDueDate'}
            >
              <span className={styles.actionDeleteCardText}>
                Удалить дату
              </span>
              <Icons
                name={'Trash'}
                class_name={'IconDeleteColumnn'}
              />
          </Button>
        </div>

      </div>

    </div>
  )
};

