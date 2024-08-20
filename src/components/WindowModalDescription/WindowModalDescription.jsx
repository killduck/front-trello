import styles from "./WindowModalDescription.module.scss";
import ReactQuill from "react-quill-new";
import { Interweave } from "interweave";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";


export default function WindowModalDescription(props){

  let showReactQuill = props.showReactQuill;
  let funcShowReactQuill = props.funcShowReactQuill;
  let valueDescription = props.valueDescription;
  let setValueDescription=props.setValueDescription;
  let modules = props.modules;
  let showReactQuillHandleKeyPress= props.showReactQuillHandleKeyPress;
  let editorRef = props.editorRef;
  let saveNewReactQuillText = props.saveNewReactQuillText;
  let cardDescription = props.cardDescription;

  return (

    <div className={styles.cardDescription}>
      <div className={styles.cardDescriptionHeader}>
        <span className={styles.cardDescriptionHeaderIcon}>
          <Icons
            name={'icon-description'}
            class_name={'IconWindowModalMainColAddLabel'}
          />
        </span>
        <h3 className={styles.cardDescriptionHeaderTitle}>Описание</h3>
        {!showReactQuill ? (
          <div className={styles.cardDescriptionHeaderBtn}>
            <Button 
              className={'BtnCardDescriptionChange'}
              clickAction = {funcShowReactQuill}
            >Изменить</Button>
          </div>
          )
          :
          ("")
        }
      </div>
      {showReactQuill ? 
      (
        <>
          <ReactQuill
            className={styles.reactQuill}
            style={{marginLeft: "40px"}}
            theme="snow"
            value={valueDescription ? valueDescription : ''} 
            onChange={setValueDescription} 
            placeholder={"Введите текст..."}
            modules={modules}
            onKeyDown={(evt)=>showReactQuillHandleKeyPress(evt)}
            onBlur={(evt)=>showReactQuillHandleKeyPress(evt)}
            autoFocus
            ref={editorRef}
          />
          <div 
            className={styles.cardDescriptionButtonWrap}
            style={{marginLeft: "40px"}}
          >
            <Button
              className={'cardDescriptionSave'}
              // actionVariable={}
              clickAction = {saveNewReactQuillText}
            >Сохранить</Button>
            <Button
              className={'cardDescriptionCancel'}
              actionVariable={false}
              clickAction = {funcShowReactQuill}
            >Отмена</Button>
          </div>
        </>
      )
      :
      (
        <>
          {cardDescription ? 
            (
              <div 
                className={styles.cardDescriptionStub}
                onClick={funcShowReactQuill} 
              >
                <Interweave content={cardDescription}></Interweave>
              </div>
            ):(
              <p 
                className={styles.cardDescriptionStub}
                onClick={funcShowReactQuill}
              >
                Добавить более подробное описание…
              </p>
            )
          }
        </>
      )}
    </div>

  )
};

