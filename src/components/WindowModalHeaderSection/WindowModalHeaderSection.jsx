import styles from "./WindowModalHeaderSection.module.scss";
import Icons from "../ui/Icons/Icons";

export default function WindowModalHeaderSection(props){

  let newName = props.newName;
  let windowName= props.windowName;
  let subscribe= props.subscribe;
  let column = props.column;
  let showTextarea = props.showTextarea;
  let writeNewText = props.writeNewText;
  let windowNameHandleKeyPress = props.windowNameHandleKeyPress;

  return (
    <div className={styles.header}>
      <span className={styles.headerIcon}>
         <Icons
          sizeWidth={"24px"}
          sizeHeight={"24px"}
          name={'card-icon'}
          class_name={'IconWindowModalHeaderIcon'}
        />
      </span>
      <div className={styles.headerTitle}>
      
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
          onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }
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
      <div className={styles.columnTitle}>
        <p className={styles.columnTitleName}>В колонке "{column.name}".</p>
        {subscribe ?
        (<span>
          <Icons
            name={'eye-open'}
            className={''}
            sizeWidth={"14"}
            sizeHeight={"14"}
          /> 
        </span>) : "" } 
      </div>
    </div>
  )
};

