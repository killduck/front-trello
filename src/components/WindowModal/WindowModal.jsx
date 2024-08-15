
import styles from "./WindowModal.module.scss";

import { useCallback, useEffect, useState } from 'react';

// import ReactQuill from 'react-quill'; // старый, нужно будет стереть, но пусть пока будет.
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import "./windowQuill.css";

import request from "../../api/request";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import Sidebar from "../Sidebar/Sidebar";
import UserCard from "../UserCard/UserCard";
import { Interweave } from "interweave";

export default function WindowModal(props){
  // console.log(props);

  let dashboardUsers = props.dashboardUsers;
  let typeElem = props.typeElem;
  let idElem = Number(props.idElem);
  let column = props.column;
  let task = props.task;
  let updateFunc = props.updateFunc;
  let deleteFunc = props.deleteFunc;
  let updateCardLabel = props.updateCardLabel;

  const [authUser, setAuthUser] = useState(Number);
  const [authUserData, setAuthUserData] = useState(Number);

  let [windowData, setWindowData] = useState({});
  const [startWindowName, setStartWindowName] = useState('');
  let [windowName, setWindowName] = useState('');
  let [newName, setNewNameField] = useState(false);
  let [membersWindow, setMembersWindow] = useState(false);
  let [cardUsers, setCardUsers] = useState([]);
  const [matchSearch, setMatchSearch]=useState('');
  let [searchNewCardUser, setSearchNewCardUser]=useState([]);

  let [subscribe, setSubscribe] = useState(false);
  let [showUserCard, setShowUserCard] = useState(null);

  let [labelsWindow, setLabelsWindow] = useState(false);
  const [cardLabel, setCardLabel] = useState(false);
  
  let [showReactQuill, setShowReactQuill] = useState(false);
  let [valueDescription, setValueDescription] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  let [activityDetailsShow, setActivityDetailsShow] = useState(false);
  let [activityEditorShow, setActivityEditorShow] = useState(null);
  let [cardActivityComments, setCardActivityComments] = useState([]);
  let [valueEditor, setValueEditor] = useState('');
  const [cardActivity, setCardActivity] = useState('<p><br></p>');
  const [processActivity, setProcessActivity] = useState(false);

  // let [onFrames, setOnFrames] = useState(
  //   {
  //     'membersWindow': membersWindow,
  //     'labelsWindow': labelsWindow,
  //     'showReactQuill': showReactQuill,
  //     'showUserCard': showUserCard,
  //     'activityEditorShow': activityEditorShow,
  //   }
  // );

  // function onRemoving_onFrames(name_state = null, value) {
  //   let state_switch = {};
  //   for (let key in onFrames) {
  //     // console.log(onFrames, key, name_state);
  //     if (name_state === key) {
  //       // console.log(onFrames, onFrames[key], key, name_state, value);
  //       onFrames[key] ?
  //         state_switch[key] = false
  //         :
  //         state_switch[key] = value
  //     }
  //     else {
  //       state_switch[key] = false;
  //     }
  //     console.log(onFrames, onFrames[key], key, name_state, state_switch);
  //   }
  //   setOnFrames(state_switch);
  // }

  function onRemoving_onFrames(){
    setNewNameField(false); 
    setMembersWindow(false); 
    setLabelsWindow(false); 
    setShowReactQuill(false); 
    setShowUserCard(null); 
    setActivityEditorShow(null); 
  }
  console.log(showUserCard);

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
 
  useEffect(() => {
    request({
      method:'POST',
      url:`take-data-card/`,
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            // console.log(response.data);
            setAuthUser(response.data.auth_user);
            setWindowData(response.data.card[0]);
            setWindowName(response.data.card[0]['name']);
            setStartWindowName(response.data.card[0]['name']);
            setCardUsers(response.data.card_users_data);
            setSubscribe(response.data.card_users_data.filter((cardUser) => cardUser.id === response.data.auth_user).length);
            setValueDescription(response.data.card[0]['description']); 
            setCardDescription(response.data.card[0]['description']); 
            setAuthUserData((dashboardUsers.filter((cardUser) => cardUser.id === response.data.auth_user))[0]);
            setCardActivityComments(response.data.card[0].activity.reverse());
            // console.log(response.data.card[0].activity);
          }
          if(task.label){
            setCardLabel(true);
          }
        }
      },
      data: {'id': idElem},
      status:200,
    });

  },[typeElem, idElem, task, dashboardUsers]);

  function showTextarea() {
    onRemoving_onFrames();

    if(!newName){
      setNewNameField(newName = true);
    }
    else{
      setNewNameField(newName = false);
    }
  }

  function funcShowReactQuill(){
    onRemoving_onFrames();

    if(showReactQuill){
      setShowReactQuill(false);
    }
    else{
      setShowReactQuill(true);
    }
  }

  function saveNewReactQuillText(){
    if(valueDescription === '<p><br></p>'){
      // <p><br></p><p><br></p>
      setValueDescription(valueDescription = null);
    }

    if(cardDescription === valueDescription){
      funcShowReactQuill();
      return;
    }

    if(valueDescription !== cardDescription){
      request({
        method:'POST',
        url:'add-card-description/',
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              setValueDescription(response.data[0].description);
              setCardDescription(response.data[0].description);
            }
          }
        },
        data: {'card_id': windowData.id,'description': valueDescription},
        status:200,
      });
    }
    funcShowReactQuill();
  }

  function showReactQuillHandleKeyPress(evt){
    if(evt.key === 'Enter' && evt.shiftKey){
      saveNewReactQuillText();
    }
  }

  function writeNewText(evt) {
    setWindowName((prev) => (prev = evt));
  }

  const windowNameHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey || evt.type === "blur"){
      showTextarea();
      if(windowName !== startWindowName){
        updateFunc(windowData.id, windowName);
        setStartWindowName(windowName);
      }
    }
  }

  function funcSubscribe(){
    onRemoving_onFrames();

    if(subscribe){
      setSubscribe(false);
    }
    else{
      setSubscribe(true);
    }
  }

  function funcMembersWindow(){
    onRemoving_onFrames();

    if(membersWindow){
      setMembersWindow(false);
    }
    else{
      setMembersWindow(membersWindow = true);
    }
  }

  function funcLabelsWindow() {
    onRemoving_onFrames();

    if(labelsWindow){
      setLabelsWindow(false);
    }
    else{
      setLabelsWindow(labelsWindow = true);
    }
  }

  function chechUserToAdd(user_id){
    if(cardUsers.length === 0){
      return true;
    }
    else{
      let addUser = true;

      cardUsers.forEach((cardUser) => {
        if (user_id === cardUser.id){
          addUser = false;
        }
      });
      return addUser;
    }
  }

  function funcAddUserToCard(user_id){
    if(chechUserToAdd(user_id)){
      request({
        method:'POST',
        url:`card-user-update/`,
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              setCardUsers((cardUsers) = cardUsers = [...cardUsers, response.data]);
              setSubscribe(cardUsers.filter((cardUser) => cardUser.id === authUser).length);
              
              setSearchNewCardUser(searchNewCardUser = searchNewCardUser.filter((elem) => elem.id !==  user_id));
              setMatchSearch((searchNewCardUser.length === 0) ? '' : matchSearch);
            }
          }
        },
        data: {'auth_user': authUser, 'user_id': user_id, 'card_id': windowData.id},
        status:200,
      });
    }
  }

  function funcDelCardUser(user_id){
    cardUsers.forEach(cardUser => {
      if (user_id === cardUser.id){
        request({
          method:'POST',
          url:`card-user-delete/`,
          callback:(response) => { 
            if (response.status === 200) {
              if(response.data){
                let filteredCardUsers = cardUsers.filter((cardUser) => cardUser.id !== user_id);
                setCardUsers(filteredCardUsers);
                setSubscribe(filteredCardUsers.filter((cardUser) => cardUser.id === authUser).length);
              }
            }
          },
          data: {'auth_user': authUser, 'user_id': cardUser.id, 'card_id': windowData.id},
          status:200,
        });
      }
    });
  }

  function onUserCard(id_user = null) {
    onRemoving_onFrames();

    showUserCard === id_user ?
      setShowUserCard(null)
      :
      setShowUserCard(id_user)
  }

  const useFocusAndSetRef = (ref) => {
    ref = useCallback(
      (node) => {
        if (node !== null) {
          ref.current = node; // it is not done on it's own
          const len = node.unprivilegedEditor.getLength();
          const selection = { index: len, length: len };
          node.setEditorSelection(node.editor, selection);
        }
      },
      [ref]
    );
    return ref;
  };

  let editorRef;
  editorRef = useFocusAndSetRef(editorRef);

  function onDelActivityReactQuillComment(comment_data){
    // console.log(comment_id);
    setProcessActivity(comment_data.date);
    request({
      method:'POST',
      url:'del-card-activity/',
      callback:(response) => { 

        setTimeout(() => {

          if (response.status === 200) {
            setProcessActivity(false);
            setCardActivityComments(cardActivityComments.filter((comment) => comment.id !== comment_data.id));
          }

        }, 2000);

      },
      data: {'comment_id': comment_data.id},
      status:200,
    });
  }

  function onSaveActivityReactQuillComment(date){
    console.log(onSaveActivityReactQuillComment.name, date);
    if(valueEditor === '<p><br></p>'){
      setValueEditor(valueEditor = null);
      console.log(valueEditor);
    } 

    if(cardActivity === valueEditor){
      console.log(valueEditor, cardActivity);
      setValueEditor(valueEditor = null)
      funcActivityEditorShow();
      return;
    }

    if(valueEditor !== cardActivity){
      console.log(valueEditor, cardActivity);
      setProcessActivity(date);
      request({
        method:'POST',
        url:'add-card-activity/',
        callback:(response) => { 

          setTimeout(() => {
            
            if (response.status === 200) {
              setProcessActivity(false);
              if(response.data){
                console.log(response.data);
                setCardActivityComments(response.data);
                setValueEditor('');
              }
            }

          }, 2000);

        },
        data: {'find_by_date': date, 'card_id': windowData.id, 'author_id': authUser, 'comment': valueEditor.trim(),}, //valueEditor.trim().slice(0, -11)
        status:200,
      });
    }
    funcActivityEditorShow();
  }

  function showActivityReactQuillHandleKeyPress(evt, date){
    console.log(evt, date);
    if(evt.key === 'Enter' && evt.shiftKey){
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
    
    console.log('asd', comment_id)
    if(activityEditorShow === comment_id){
      setActivityEditorShow(null);
    }
    else{
      setActivityEditorShow(comment_id);
      setCardActivity(commentStartValue);
      setValueEditor(commentStartValue);
    }
  }

  const headerSection = (
  <>
    <span className={styles.headerIcon}>
      <Icons
        name={'icon-description'}
        class_name={'IconWindowModalMainColAddLabel'}
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
        onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }// evt.currentTarget.select(evt);
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
    <div className={styles.columnTitle}> {/* "window-header-inline-content quiet js-current-list" */}
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
  </>
  )

  const elementSubscribe = (
    <div className={styles.cardDetailNotifications} >
      <h3  className={styles.cardDetailsTitle}>
        Уведомления
      </h3>
      
      { (!subscribe) ?
      (
      <Button
        className = {'BtnCardSubscribe'}
        ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
        clickAction = {funcSubscribe}
      >
        
        <Icons
          name={'eye-open'}
          class_name={'iconCardSubscribe'}
          sizeWidth={"14"}
          sizeHeight={"14"}
        /> 
        <span>Подписаться</span>
      </Button>
      )
      :
      (
      <Button
        className = {'BtnCardSubscribe'}
        ariaLabel = "Подпишитесь на уведомления об обновлениях этой карточки"
        clickAction = {funcSubscribe}
        style={{paddingRight: "32px", width: "138px"}}
      >
        <Icons
          name={'eye-open'}
          class_name={'iconCardSubscribe'}
          sizeWidth={"14"}
          sizeHeight={"14"}
        /> 
        <span className={styles.cardDetailsInfo}>Вы подписаны</span>
        <span style={{paddingLeft: "5px"}}>...</span>
        <span className={styles.simbolSubscribed}>
          <Icons 
            name={'selected'}
            class_name={'iconSelected'}
          />
        </span>
      </Button>
      )
    }
    </div>
  )

  const columnMembers = (
    <>
    {(cardUsers.length > 0) ?
      (
        <div className={styles.cardDetailNotifications} >
          <h3 className={styles.cardDetailsTitle}>Участники:</h3>
            <div className={styles.membersList}>
            {cardUsers.map(
              (cardUser) => 
                <div 
                  key={cardUser.id} 
                  className={styles.memberMenu} 
                  aria-label={`Действия с профилем участника ${cardUser.first_name}`}
                >
                  {cardUser.img ?
                  (<img 
                    className={styles.memberAvatar} 
                    src={cardUser.img ? `/img/users/${cardUser.img}` : '/img/no_photo.png'}
                    // srcSet="/img/no_photo.png 1x, /img/no_photo.png 2x" 
                    alt={`${cardUser.first_name} (${cardUser.username})`}
                    title={`${cardUser.first_name} (${cardUser.username})`}
                    onClick={()=> onUserCard(cardUser.id)}
                    // onClick={()=> onRemoving_onFrames('showUserCard', cardUser.id)}
                  />)
                  :
                  (<span 
                    className={styles.memberAvatarSpan} 
                    title={`${cardUser.first_name} (${cardUser.username})`}
                    onClick={()=> onUserCard(cardUser.id)}
                  >{cardUser.first_letter}</span>)
                  }
                  {(showUserCard === cardUser.id) ? 
                    <UserCard
                      authUser={authUser}
                      user={cardUser}
                      clickAction={onUserCard}
                      funcDelCardUser = {funcDelCardUser}
                      class_name={'UserCard'}
                    />
                    :
                    ""
                  }
                  

                </div>
              )
            }   
            <Button
              clickAction={funcMembersWindow}
              className={'btnWindowModalMainColAddUser'}
            >
              <Icons
                name={'AddIcon'}
                class_name={'IconWindowModalMainColAddUser'}
              />
            </Button>
          </div>
        </div>
      )
      :
      ("")
    }
    </>
  )

  const columnLabels = (
    <>
    {(cardLabel) ?
      (<div className={styles.cardDetailNotifications}>
        <h3 className={styles.cardDetailsTitle}>Метки</h3>
        <div className={styles.labelsList} data-testid="card-back-labels-container">
          <span 
            className={styles.labelElement} 
            style={{backgroundColor: task.label.color_hex}}
            tabIndex="0" 
            aria-label={`Цвет: ${task.label.name}, название: «без цвета»`}
            data-color={task.label.name}
            onClick={funcLabelsWindow}
          />
          <Button
            clickAction={funcLabelsWindow}
            className={'btnWindowModalMainColAddLabel'}
          >
            <Icons
              name={'AddIcon'}
              class_name={'IconWindowModalMainColAddLabel'}
            />
          </Button>
        </div>
      </div>):""
    }
    </> 
  )

  const columnDueDate = (
    "дата"
  )

  return (
    <div className={styles.wrap} >
        {props.children}

        {/* header */}
        <div className={styles.header}>
          { headerSection }
        </div>

        {/* главная колонка */}
        <div className={styles.mainCol}>

          <div className={styles.cardDetails} >
            <div className={styles.cardDetailItem}>
              {columnMembers}
            </div>

            <div className={styles.cardDetailItem}>
              {columnLabels}
            </div>

            <div className={styles.cardDetailItem}>
              {elementSubscribe}
            </div>

            <div className={styles.cardDetailItem}>
              {columnDueDate}
            </div>
            
          </div>

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
          


          <div  className={styles.cardActivity}>
            <div className={styles.cardActivityWrap} data-testid="card-back-activity">
              <div className={styles.cardActivityHeader}>
                <Icons
                  name={'icon-description'}
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
                      src={authUserData.img ? `/img/users/${authUserData.img}` : '/img/no_photo1.png'}
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
                                  src={comment.author.img ? `/img/users/${comment.author.img}` : '/img/no_photo1.png'}
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
                                {comment.date}
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
                            src={comment.author.img ? `/img/users/${comment.author.img}` : '/img/no_photo1.png'}
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
                          {comment.date}
                        </span>
                        {(activityEditorShow !== comment.id) ? (
                          // <input 
                          //   className={styles.cardActivityNewCommentInput} 
                          //   type="text" 
                          //   // placeholder={comment.comment} 
                          //   // aria-label={comment.comment} 
                          //   placeholder={<Interweave content={comment.comment}></Interweave>}
                          //   aria-label={<Interweave content={comment.comment}></Interweave>}
                          //   readOnly 
                          //   value={""} 
                          //   onClick={ ()=>funcActivityEditorShow(comment.id, comment.comment) }
                          // />
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
                                    actionVariable={comment}
                                    clickAction = {onDelActivityReactQuillComment}
                                >Удалить</Button>
                              </span>
                              )
                            } 
                          </div>):("")
                        }
                      </div>
                    </div>
                  )
                }
                </div>
              )}
              {/* <div className="spinner loading js-loading-card-actions" style={{display: "none"}}></div>
              <p>
                <button className="nch-button hide js-show-all-actions" >Показать все действия…</button>
              </p> */}
            </div>
          </div>

        </div>

        {/* сайдбар */}
        <Sidebar
          typeElem={typeElem}
          windowData={windowData}
          deleteFunc={deleteFunc}
          funcAddUserToCard={funcAddUserToCard}
          dashboardUsers={dashboardUsers}
          funcDelCardUser={funcDelCardUser}
          cardUsers={cardUsers}
          funcMembersWindow={funcMembersWindow}
          membersWindow={membersWindow}
          funcLabelsWindow={funcLabelsWindow}
          labelsWindow={labelsWindow}
          updateCardLabel={updateCardLabel}
          setCardLabel={setCardLabel}
          matchSearch={matchSearch}
          setMatchSearch={setMatchSearch}
          searchNewCardUser={searchNewCardUser}
          setSearchNewCardUser={setSearchNewCardUser}
        ></Sidebar>

    </div>
  )
};

