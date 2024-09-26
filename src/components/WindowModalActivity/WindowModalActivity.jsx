import ReactQuill from "react-quill-new";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalActivity.module.scss";
import { Interweave } from "interweave";
import { useState } from "react";
import { URL_API, URL_ENDPOINT } from "../../api/config";


export default function WindowModalActivity(props){

  let authUserData = props.authUserData;
  let activityDetailsShow = props.activityDetailsShow;
  let activityEditorShow = props.activityEditorShow;
  let processActivity = props.processActivity;
  let valueEditor = props.valueEditor;
  let setValueEditor = props.setValueEditor;
  let cardActivityComments = props.cardActivityComments;
  let modules = props.modules;
  let editorRef = props.editorRef;
  let funcActivityDetailsShow = props.funcActivityDetailsShow;
  let funcActivityEditorShow = props.funcActivityEditorShow;
  let showActivityReactQuillHandleKeyPress = props.showActivityReactQuillHandleKeyPress;
  let onSaveActivityReactQuillComment = props.onSaveActivityReactQuillComment;
  let onDelActivityReactQuillComment= props.onDelActivityReactQuillComment;
  let onUserCard = props.onUserCard;
  let onDelWindow = props.onDelWindow;
  let delWindow = props.delWindow; 
  // let setDelWindow = props.setDelWindow; 


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
                src={`${URL_API + URL_ENDPOINT + authUserData.img}`}
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
                modules={modules}
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
                            src={`${URL_API + URL_ENDPOINT + comment.author.img}`}
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
                      src={`${URL_API + URL_ENDPOINT + comment.author.img}`}
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
                        modules={modules}
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

