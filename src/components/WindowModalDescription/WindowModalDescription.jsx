import styles from "./WindowModalDescription.module.scss";
import ReactQuill from "react-quill-new";
import { Interweave } from "interweave";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import request from "../../api/request";
import { useFocusAndSetRef } from "../../hooks/useFocusAndSetRef";

import { useDispatch, useSelector } from "react-redux";

import { setWindowModalReloadState } from "../../main_state/states/windowModalReload";
import { setNewCardDescriptionState, setStartCardDescriptionState } from "../../main_state/states/description/cardDescriptionState";
import { setShowReactQuillState } from "../../main_state/states/description/showReactQuillState";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";

export default function WindowModalDescription(props){

  const windowData = useSelector((state) => state.windowData.value);
  let cardDescriptionState_newValue = useSelector((state) => state.cardDescriptionState.newValue);
  const cardDescriptionState_startValue = useSelector((state) => state.cardDescriptionState.startValue);
  const showReactQuillState = useSelector((state) => state.showReactQuillState.value);

  const dispatch = useDispatch();

  let editorRef;
  editorRef = useFocusAndSetRef(editorRef);

  const modules = {
    toolbar: [
      [{ header: []}],
      ["bold", "italic", "underline"], //"strike", "blockquote"
      [{color: []}],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  function saveNewReactQuillText(){
    if(cardDescriptionState_newValue === '<p><br></p>'){
      // <p><br></p><p><br></p>
      cardDescriptionState_newValue = null;
      dispatch(setStartCardDescriptionState(''));
    }
    if(cardDescriptionState_newValue === cardDescriptionState_startValue){
      funcShowReactQuill();
      return;
    }

    if(cardDescriptionState_newValue !== cardDescriptionState_startValue){
      dispatch(setWindowModalReloadState(true));

      request({
        method:'POST',
        url:'add-card-description/',
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              dispatch(setStartCardDescriptionState(response.data[0].description));
              dispatch(setNewCardDescriptionState(response.data[0].description));
              dispatch(setWindowModalReloadState(false));
            }
          }
        },
        data: {'card_id': windowData.id,'description': cardDescriptionState_newValue},
        status:200,
      });
    }
    funcShowReactQuill();
  }

  function funcShowReactQuill(){
    dispatch(onRemoving_onFrames());
    if(showReactQuillState){
      dispatch(setShowReactQuillState(false));
    }
    else{
      dispatch(setShowReactQuillState(true));
    }
  }

  function showReactQuillHandleKeyPress(evt){
    if(evt.key === 'Enter' && evt.shiftKey){
      cardDescriptionState_newValue = cardDescriptionState_newValue.trim().slice(0, -11);

      dispatch(setNewCardDescriptionState(cardDescriptionState_newValue));
      saveNewReactQuillText();
    }
  }

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
        {!showReactQuillState ? (
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
      {showReactQuillState ? 
      (
        <>
          <ReactQuill
            className={styles.reactQuill}
            style={{marginLeft: "40px"}}
            theme="snow"
            value={cardDescriptionState_newValue ? cardDescriptionState_newValue : ''} 
            onChange={(evt)=> dispatch(setNewCardDescriptionState(evt))}
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
          {cardDescriptionState_newValue ? 
            (
              <div 
                className={styles.cardDescriptionStub}
                onClick={funcShowReactQuill} 
              >
                <Interweave content={cardDescriptionState_newValue}></Interweave>
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

