import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarDueDate.module.scss";
import { useState } from "react";


export default function SidebarDueDate(props){

  let funcDueDateWindow = props.funcDueDateWindow; 
  let dueDateWindow = props.dueDateWindow; 

  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };


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
            // style={{style={{}}
            className={styles.DatePicker}
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            // showTimeSelect
            showTimeInput
            autoFocus={true}
          />
        </div>

    </div>
  )
};

