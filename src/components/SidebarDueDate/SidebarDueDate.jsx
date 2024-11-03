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
import { useDispatch, useSelector } from "react-redux";
import { setDueDatePreloder, setDueDateWindow } from "../../main_state/states/modalDueDate/modalDueDate";
import { setWindowData } from "../../main_state/states/windowData";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import openCloseFrameFunction from "../../helpers/openCloseWindowFunction";

export default function SidebarDueDate(props){

  const windowData = useSelector((state) => state.windowData.value);
  const dueDateWindow = useSelector((state) => state.modalDueDateState.dueDateWindow);
  const dueDatePreloder = useSelector((state) => state.modalDueDateState.dueDatePreloder);
  let windowData_date_end = windowData.date_end;

  const dispatch = useDispatch();

  const [checkbox, setCheckbox] = useState(true);
  const [startDate, setStartDate] = useState(windowData_date_end ? new Date(windowData_date_end) : new Date());
  let [arrDate, setArrDate] = useState([]);
  let [newDate, setNewDate] = useState(String);

  registerLocale('ru', ru);

  function funcDueDateWindow(){
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: dueDateWindow, 
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setDueDateWindow, 
      dispatch: dispatch,
    });
  }

  function takeDate(){
    let date = startDate.getDate();
    let month = startDate.getMonth();
    let year = startDate.getFullYear();
    
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
    if(new Date(windowData_date_end).getTime() === startDate.getTime()){
      funcDueDateWindow();
      return;
    }

    let sendind_end_date = '';
    let sendind_start_date = '';

    let end_day = startDate.getDate();
    let end_month = startDate.getMonth()+1;
    let end_year = startDate.getFullYear();
    let end_hours = startDate.getHours();
    let end_minutes = startDate.getMinutes();

    sendind_end_date = `${end_day}-${end_month}-${end_year} ${end_hours}:${end_minutes}:00`;

    dispatch(setDueDatePreloder(true));

    request({
      method:'POST',
      url:'add-card-due-date/',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            setStartDate(new Date(response.data[0].date_end));
            dispatch(setWindowData(response.data[0]));
            dispatch(setDueDatePreloder(false));

            funcDueDateWindow();
          }
        }
      },
      data: {'card_id': windowData.id, 'start_date_time': sendind_start_date, 'end_date_time': sendind_end_date},
      status:200,
    });
  }

  function onDelDueDate(){
    dispatch(setDueDatePreloder(true));

    request({
      method:'POST',
      url:'del-card-due-date/',
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            setCheckbox(false);
            setStartDate(new Date());
            dispatch(setWindowData(response.data[0]));
            dispatch(setDueDatePreloder(false));
          }
        }
      },
      data: {'card_id': windowData.id},
      status:200,
    });
  }

  return (
    <div className={dueDatePreloder ? `${styles.cardDueDateWindowGradient} ${styles.smallWindowWrap}` : styles.smallWindowWrap}>
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
          clickAction = {onSaveDueDate}
        >Сохранить</Button>
        <Button
          className={'dueDateCancel'} 
          clickAction = {funcEraseDates}
        >Сброс даты</Button>
        
        <div className={styles.actionDeleteCard}>
          <Button
              clickAction={onDelDueDate}
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
