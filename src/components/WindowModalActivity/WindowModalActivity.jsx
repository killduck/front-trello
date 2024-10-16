import ReactQuill from "react-quill-new";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalActivity.module.scss";
import { Interweave } from "interweave";
import { URL_API } from "../../api/config";
import { useFocusAndSetRef } from "../../hooks/useFocusAndSetRef";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserCard } from "../../main_state/states/modalCardMember/modalCardMember";
import { useState } from "react";
import request from "../../api/request";
import { setActivityEditorShow, setCardActivityComments } from "../../main_state/states/modalActivity/modalActivity";


export default function WindowModalActivity(props){

  let onRemoving_onFrames = props.onRemoving_onFrames;

  const windowData = useSelector((state) => state.windowData.value);
  const authUser = useSelector((state) => state.cardUsersState.authUser); 
  const authUserData = useSelector((state) => state.cardUsersState.authUserData); 
  const activityEditorShow = useSelector((state) => state.modalActivityState.activityEditorShow);
  const cardActivityComments = useSelector((state) => state.modalActivityState.cardActivityComments);
  const cardActivitymodules = useSelector((state) => state.modalActivityState.cardActivitymodules);
  const showUserCard = useSelector((state) => state.modalCardMemberState.showUserCard);

  const dispatch = useDispatch();

  const [delWindow, setDelWindow] = useState(false); 
  const [processActivity, setProcessActivity] = useState(false);
  const [cardActivity, setCardActivity] = useState('<p><br></p>');
  let [activityDetailsShow, setActivityDetailsShow] = useState(true);
  let [valueEditor, setValueEditor] = useState('');


  let editorRef;
  editorRef = useFocusAndSetRef(editorRef);

  function onUserCard(id_user = null) {
    console.log('tut', id_user);
    onRemoving_onFrames();

    showUserCard === id_user ?
      // setShowUserCard(null);
      dispatch(setShowUserCard(null))
      :
      // setShowUserCard(id_user)
      dispatch(setShowUserCard(id_user))
  }

    function onDelWindow(comment_id){ 
    if(delWindow){
      setDelWindow(false);
    }
    else{
      setDelWindow(comment_id);
    }
  }

  function onDelActivityReactQuillComment(comment_data){
    // console.log(comment_id);
    setDelWindow(false);
    setProcessActivity(comment_data.date);
    request({
      method:'POST',
      url:'del-card-activity/',
      callback:(response) => { 
        if (response.status === 200) {
          setProcessActivity(false);
          dispatch(setCardActivityComments(cardActivityComments.filter((comment) => comment.id !== comment_data.id)));
        }
      },
      data: {'comment_id': comment_data.id},
      status:200,
    });
  }

  function onSaveActivityReactQuillComment(date){
    if(valueEditor === '<p><br></p>'){
      setValueEditor(valueEditor = null);
    } 

    if(cardActivity === valueEditor){
      setValueEditor(valueEditor = null)
      funcActivityEditorShow();
      return;
    }

    if(valueEditor !== cardActivity){
      setProcessActivity(date);
      
      request({
        method:'POST',
        url:'add-card-activity/',
        callback:(response) => { 
          if (response.status === 200) {
            setProcessActivity(false);
            if(response.data){
              // console.log(response.data);
              dispatch(setCardActivityComments(response.data));
              setValueEditor('');
            }
          }
        },
        data: {'find_by_date': date, 'card_id': windowData.id, 'author_id': authUser, 'comment': valueEditor.trim(),}, //valueEditor.trim().slice(0, -11)
        status:200,
      });
    }
    funcActivityEditorShow();
  }

  function showActivityReactQuillHandleKeyPress(evt, date){
    if(evt.key === 'Enter' && evt.shiftKey){
      setValueEditor(valueEditor = valueEditor.trim().slice(0, -11));
      onSaveActivityReactQuillComment(date);
    }
  }

  function funcActivityDetailsShow(){
    onRemoving_onFrames();
    if(activityDetailsShow){
      setActivityDetailsShow(false);
    }
    else{
      setActivityDetailsShow(true);
    }
  }

  function funcActivityEditorShow(comment_id = null, commentStartValue){
    onRemoving_onFrames();
    if(activityEditorShow === comment_id){
      dispatch(setActivityEditorShow(null));
    }
    else{
      dispatch(setActivityEditorShow(comment_id));
      setCardActivity(commentStartValue);
      setValueEditor(commentStartValue);
    }
  }

  return (
    
    <div  className={styles.cardActivity}>
      <div className={styles.cardActivityWrap} data-testid="card-back-activity">
        <div className={styles.cardActivityHeader}>
          <Icons
            name={'card-activity'}
            class_name={'IconWindowModalMainColActivity'}
          />
          <h3 className={styles.cardActivityHeaderTitle}>Действия</h3>
          <div className={styles.cardActivityHeaderBtns}>
            {activityDetailsShow ? 
              <Button 
                className = {'BtnCardActivity'}
                clickAction = {funcActivityDetailsShow}
              >Показать подробности</Button>
              :
              <Button 
                className = {'BtnCardActivity'}
                clickAction = {funcActivityDetailsShow}
              >Скрыть подробности</Button>
            }
          </div>
        </div>

        <div className={styles.cardActivityNewComment}>
          <div className={styles.cardActivityMemberAvatar}>
            {authUserData.img ?(
              <img 
                className={styles.cardActivityMemberAvatarImg} 
                src={`${URL_API + authUserData.img}`}
                alt={`${authUserData.first_name} (${authUserData.username})`}
                title={`${authUserData.first_name} (${authUserData.username})`}
                // onClick={()=> onUserCard(authUserData.id)}
              />
              ):(
              <span 
                className={styles.cardActivityMemberAvatarSpan} 
                title={`${authUserData.first_name} (${authUserData.username})`}
                // onClick={()=> onUserCard(authUserData.id)}
              >{authUserData.first_letter}</span>
            )}
          </div>
          {(activityEditorShow !== 'newComment') ? (
            <div className={styles.cardActivityNewCommentContent}>
              <input 
                className={
                  processActivity !== 'no' ? 
                  styles.cardActivityNewCommentInput
                  :
                  `${styles.cardActivityNewCommentInput} ${styles.cardActivityNewCommentInputGradient}`
                } 
                type="text" 
                placeholder={"Напишите комментарий…"}
                aria-label="Написать комментарий" 
                readOnly 
                value={""} 
                onClick={ (processActivity !== 'no') ? ()=>funcActivityEditorShow('newComment', '') : null }
              />
              
              {processActivity === 'no' ?
              <span className={styles.cardActivityCommentSending}>
                <span className={styles.cardActivityCommentSendingImg}></span> В процессе…&nbsp;
              </span>
              :
              ""
              }
                  
              
            </div>
            ):(
            <div>
              <ReactQuill 
                className={styles.reactQuill}
                theme="snow"
                value={valueEditor ? valueEditor : ''} 
                onChange={setValueEditor} 
                placeholder={"Напишите комментарий..."}
                modules={cardActivitymodules}
                onKeyDown={(evt)=>showActivityReactQuillHandleKeyPress(evt, 'no')}
                onBlur={(evt)=>showActivityReactQuillHandleKeyPress(evt, 'no')}
                ref={editorRef}
              />
              <div className={styles.cardEditorButtonWrap}>
                <Button
                  className={'cardEditorSave'}
                  actionVariable={'no'}
                  clickAction = {onSaveActivityReactQuillComment}
                >Сохранить</Button>
                <Button
                  className={'cardDescriptionCancel'}
                  actionVariable={null}
                  clickAction = {funcActivityEditorShow}
                >Отмена</Button>
              </div>
            </div>
          )}
        </div>
        
        {cardActivityComments.map((comment) => 
          <div key={comment.id}>
          {comment.comment === null ?
            (
              <>
                {!activityDetailsShow ?
                  (
                    <div className={styles.cardActivityNewComment} key={comment.id}>
                      <div className={styles.cardActivityMemberAvatar}>
                        {comment.author.img ?(
                          <img 
                            className={styles.cardActivityMemberAvatarImg} 
                            src={`${URL_API + comment.author.img}`}
                            alt={`${comment.author.first_name} (${comment.author.username})`}
                            title={`${comment.author.first_name} (${comment.author.username})`}
                            onClick={()=> onUserCard(comment.author.id)}
                          />
                          ):(
                          <span 
                            className={styles.cardActivityMemberAvatarSpan}  
                            title={`${comment.author.first_name} (${comment.author.username})`}
                            onClick={()=> onUserCard(comment.author.id)}
                          >{comment.author.first_letter}</span>
                        )}
                      </div>
                      <div className={styles.cardActivityNewCommentContent}>
                        <span className={styles.cardActivityMemberName} title={comment.author.first_name}>
                          {comment.author.first_name} {comment.author.last_name}
                        </span> 
                        <span className={styles.cardActivityMemberCommentAction}>
                          {/* {comment.action}  */}
                          <Interweave content={comment.action}></Interweave>
                        </span>
                        <p className={styles.cardActivityMemberCommentDate}
                          data-date={comment.date} 
                          title={comment.date} 
                        >
                          {new Date(comment.date).toLocaleString("ru", {month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})}
                        </p>
                      </div>
                    </div>
                  )
                  :
                  ("")
                }
              </>
            )
            :
            (
              <div className={styles.cardActivityNewComment} key={comment.id}>
                <div className={styles.cardActivityMemberAvatar}>
                  {comment.author.img ?(
                    <img 
                      className={styles.cardActivityMemberAvatarImg} 
                      src={`${URL_API + comment.author.img}`}
                      alt={`${comment.author.first_name} (${comment.author.username})`}
                      title={`${comment.author.first_name} (${comment.author.username})`}
                      onClick={()=> onUserCard(comment.author.id)}
                    />
                    ):(
                    <span 
                      className={styles.cardActivityMemberAvatarSpan}  
                      title={`${comment.author.first_name} (${comment.author.username})`}
                      onClick={()=> onUserCard(comment.author.id)}
                    >{comment.author.first_letter}</span>
                  )}
                </div>
                <div className={styles.cardActivityNewCommentContent}>
                  <span className={styles.cardActivityMemberName} title={comment.author.first_name}>
                    {comment.author.first_name} {comment.author.last_name}
                  </span> 
                  <span className={styles.cardActivityMemberCommentDate}
                    data-date={comment.date} 
                    title={comment.date} 
                  >
                    {new Date(comment.date).toLocaleString("ru", {month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})}
                  </span>
                  {(activityEditorShow !== comment.id) ? (
                    <div
                      className={
                        processActivity !== comment.date ? 
                        styles.cardActivityNewCommentInput
                        :
                        `${styles.cardActivityNewCommentInput} ${styles.cardActivityNewCommentInputGradient}`
                      } 
                      type="text" 
                      readOnly 
                      onClick={ (processActivity !== comment.date) ? ()=>funcActivityEditorShow(comment.id, comment.comment) : null } 
                    >
                      <Interweave content={comment.comment}></Interweave>
                    </div>
                    ):(
                    <div>
                      <ReactQuill
                        className={styles.reactQuill}
                        theme="snow"
                        value={valueEditor ? valueEditor : comment.comment} 
                        onChange={setValueEditor} 
                        placeholder={"Напишите комментарий..."}
                        modules={cardActivitymodules}
                        onKeyDown={(evt)=>showActivityReactQuillHandleKeyPress(evt, comment.date)}
                        onBlur={(evt)=>showActivityReactQuillHandleKeyPress(evt, comment.date)}
                        ref={editorRef}
                      />
                      <div className={styles.cardEditorButtonWrap}>
                        <Button
                          className={'cardEditorSave'}
                          actionVariable={comment.date}
                          clickAction = {onSaveActivityReactQuillComment}
                          disabled={valueEditor === '<p><br></p>'}
                        >Сохранить</Button>
                        <Button
                          className={'cardDescriptionCancel'}
                          actionVariable={null}
                          clickAction = {funcActivityEditorShow}
                        >Отмена</Button>
                      </div>
                    </div>
                  )}
                  {activityEditorShow !== comment.id ? (
                    <div>
                      {processActivity === comment.date ? 
                        (
                        <span className={styles.cardActivityCommentSending}>
                          <span className={styles.cardActivityCommentSendingImg}></span> В процессе…&nbsp;
                        </span>
                        ):(
                        <span className={styles.cardEditorButtonWrap}>
                          <Button
                              className={'cardActivityCommentUpdate'}
                              actionVariable={comment.id}
                              clickAction = {funcActivityEditorShow}
                          >Изменить</Button>
                          • 
                          <Button
                              className={'cardActivityCommentDelete'}
                              actionVariable={comment.id}
                              clickAction = {onDelWindow}
                          >Удалить</Button>
                        </span>
                        )
                      } 
                    </div>):("")
                  }
                </div>
                {delWindow === comment.id ? 
                  (<div className={styles.smallWindowWrap}>
                    <header className={styles.itemHeader}>
                      <h2 className={styles.itemHeaderTitle} title="Удаление комментария">Удаление комментария</h2>
                      
                      <div className={styles.iconWrap}>
                        <Button
                            className={'btnSmallWindow'}
                            type="button"
                            ariaLabel="Закрыть окно"
                            clickAction={onDelWindow} //onDelActivityReactQuillComment
                        >
                          <Icons
                              class_name={'btnModalCloseIcon'}
                              name={'CloseIcon'}
                          />
                        </Button>
                      </div>
                    </header>
                    <div className={styles.delButtonWrap}>
                      <p className={styles.delButtonWrapText}>
                          Комментарий удаляется навсегда. Отмена невозможна.
                      </p>
                      <Button
                        className={'btnDelComment'}
                        type="button"
                        ariaLabel="Удалить комментарий"
                        actionVariable={comment}
                        clickAction={onDelActivityReactQuillComment} 
                      >Удалить комментарий</Button>
                    </div>
                  </div>):("")
                }
              </div>
            )
          }
          </div>
        )}
      </div>
    </div>

  )
};

