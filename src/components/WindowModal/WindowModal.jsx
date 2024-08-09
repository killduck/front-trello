
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
  let [value, setValue] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  let [activityDetailsShow, setActivityDetailsShow] = useState(false);

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
            setAuthUser(response.data.auth_user);
            setWindowData(response.data.card[0]);
            setWindowName(response.data.card[0]['name']);
            setStartWindowName(response.data.card[0]['name']);
            setCardUsers(response.data.card_users_data);
            setSubscribe(response.data.card_users_data.filter((cardUser) => cardUser.id === response.data.auth_user).length);
            setValue(response.data.card[0]['description']); 
            setCardDescription(response.data.card[0]['description']); 
            setAuthUserData((dashboardUsers.filter((cardUser) => cardUser.id === response.data.auth_user))[0]);
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
    if(!newName){
      setNewNameField(newName = true);
    }
    else{
      setNewNameField(newName = false);
    }
  }

  function funcShowReactQuill(){
    if(showReactQuill){
      setShowReactQuill(false);
    }
    else{
      setShowReactQuill(true);
    }
  }

  function saveNewReactQuillText(){
    if(value === '<p><br></p><p><br></p>'){
      setValue(value = null);
    }

    if(cardDescription === value){
      funcShowReactQuill();
      return;
    }

    if(value !== cardDescription){
      request({
        method:'POST',
        url:'add-card-description/',
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              setValue(response.data[0].description);
              setCardDescription(response.data[0].description);
            }
          }
        },
        data: {'card_id': windowData.id,'description': value},
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
    if(subscribe){
      setSubscribe(false);
    }
    else{
      setSubscribe(true);
    }
  }

  function funcMembersWindow(){
    if(membersWindow){
      setMembersWindow(false);
    }
    else{
      setMembersWindow(membersWindow = true);
    }
  }

  function funcLabelsWindow() {
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
        data: { 'user_id': user_id, 'card_id': windowData.id},
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
          data: { 'user_id': cardUser.id, 'card_id': windowData.id},
          status:200,
        });
      }
    });
  }

  function onUserCard(id_user = null) {
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


  function funcActivityDetailsShow(){
    if(activityDetailsShow){
    setActivityDetailsShow(false);
    }
    else{
      setActivityDetailsShow(true);
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
                  theme="snow"
                  value={value ? value : ''} 
                  onChange={setValue} 
                  placeholder="Введите текст..."
                  modules={modules}
                  onKeyDown={(evt)=>showReactQuillHandleKeyPress(evt)}
                  onBlur={(evt)=>showReactQuillHandleKeyPress(evt)}
                  autoFocus
                  ref={editorRef}
                />
                <div className={styles.cardDescriptionButtonWrap}>
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
                      // dangerouslySetInnerHTML={{ __html: cardDescription }} 
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
                  {authUserData.img ?
                    (<img 
                      className={styles.cardActivityMemberAvatarImg} 
                      src={authUserData.img ? `/img/users/${authUserData.img}` : '/img/no_photo1.png'}
                      // srcSet="/img/no_photo.png 1x, /img/no_photo.png 2x" 
                      alt={`${authUserData.first_name} (${authUserData.username})`}
                      title={`${authUserData.first_name} (${authUserData.username})`}
                      // onClick={()=> onUserCard(authUserData.id)}
                    />
                    )
                    :
                    (<span 
                      className={styles.cardActivityMemberAvatarSpan} 
                      title={`${authUserData.first_name} (${authUserData.username})`}
                      // onClick={()=> onUserCard(authUserData.id)}
                    >{authUserData.first_letter}</span>
                    )
                  }
                </div>
                {/* <div className="js-new-comment-react-root"> */}
                  {/* <div className="js-react-root"> */}
                    {/* <div aria-live="polite" role="region"></div> */}
                    {/* <div className="c3OsZHKSpXeMAD"> */}
                      <input 
                        className={styles.cardActivityNewCommentInput} 
                        type="text" 
                        placeholder="Напишите комментарий…" 
                        // data-testid="card-back-new-comment-input-skeleton" 
                        // aria-placeholder="Напишите комментарий…" 
                        aria-label="Написать комментарий" 
                        readOnly 
                        value="" 
                      />
                    {/* </div> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
              <div className="js-list-actions mod-card-back">
                <div className="phenom mod-comment-type">
                  <div className="phenom-creator">
                    <div className="member js-show-mem-menu js-member-avatar-root" idmember="662bd7222422de983bbab209">
                      <div className="js-react-root">
                        <button className="B1uWdim9Jd0dJ9 Y73NuAT7seZfmx bxgKMAm3lq5BpA SEj5vUdI3VvxDc" type="button" data-testid="action-view-member-avatar" title="Leo (killduck)">
                          <span aria-label="Leo (killduck)" role="img" title="Leo (killduck)" className="DweEFaF5owOe02 u0XUHdMJe85h0q S7RWiPL9Qgl9P9 kFZ3hS99jGmKWk" style={{backgroundImage: "url(&quot;https://trello-members.s3.amazonaws.com/662bd7222422de983bbab209/68699ec7e84b2530faa3447a45c09236/170.png&quot;)", height: "32px", width: "32px", lineHeight: "32px"}}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="phenom-desc">
                    <span className="inline-member js-show-mem-menu" idmember="662bd7222422de983bbab209">
                      <span className="u-font-weight-bold">Leo</span>
                    </span> 
                    <span className="inline-spacer"> </span>
                    <span className="phenom-date quiet">
                      <a className="date js-hide-on-sending js-highlight-link past" dt="2024-08-02T13:38:12.367Z" href="/c/MVBbEJOn/1-%D0%BD%D0%B0-%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-leo#comment-66ace14448665e344c76001c" data-date="Fri Aug 02 2024 16:38:12 GMT+0300 (Москва, стандартное время)" title="2 августа 2024 г., 16:38">2 авг. 2024 г., 16:38</a>
                    </span>
                    <div className="comment-container">
                      <div className="action-comment can-edit can-view-video markeddown js-comment is-comments-rewrite" dir="auto">
                        <div className="current-comment js-friendly-links js-open-card">
                          <p>фыв</p>
                        </div>
                        <div className="js-edit-comment-react-root"></div>
                      </div>
                    </div>
                    <div className="js-embed-previews"></div>
                    <div className="hide unfurled-comment comment-preview"></div>
                  </div>
                  <div className="phenom-reactions">
                    <div className="js-reaction-piles reaction-piles-container last">
                      <div className="reaction-piles reaction-piles-empty">
                        <span className="inline-add-reaction meta-add-reaction quiet">
                          <span className="reactions-add">
                            <span title="Добавить реакцию" className="icon-sm icon-add-reaction reactions-add-icon"></span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="phenom-meta quiet">
                      <span className="js-spinner hide">
                        <span className="spinner spinner--inline mod-left small"></span> Отправка…&nbsp;
                      </span>
                      <span className="js-hide-on-sending middle">
                        <button className="js-edit-action" >Изменить</button> 
                        • 
                        <button className="js-confirm-delete-action" >Удалить</button>
                        <span className="edits-warning quiet"> • В этом поле есть несохранённые изменения.</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spinner loading js-loading-card-actions" style={{display: "none"}}></div>
              <p>
                <button className="nch-button hide js-show-all-actions" >Показать все действия…</button>
              </p>
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

