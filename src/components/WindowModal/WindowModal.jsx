
import styles from "./WindowModal.module.scss"

import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const modules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" },], // { font: [] }
      [{ header: []}],
      // [{ size: []}],
      ["bold", "italic", "underline"], //"strike", "blockquote"
      [{color: []}],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
 
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
  ];

  useEffect(() => {
    request({
      method:'POST',
      url:`take-data-card/`,
      callback:(response) => { 
        if (response.status === 200) {
          // console.log(response.data);
          if(response.data){
            setAuthUser(response.data.auth_user);
            setWindowData(response.data.card[0]);
            setWindowName(response.data.card[0]['name']);
            setStartWindowName(response.data.card[0]['name']);
            setCardUsers(response.data.card_users_data);
            setSubscribe(response.data.card_users_data.filter((cardUser) => cardUser.id === response.data.auth_user).length);
            setValue(response.data.card[0]['description']); 
            setCardDescription(response.data.card[0]['description']); 
          }
          if(task.label){
            setCardLabel(true);
          }
        }
      },
      data: {'id': idElem},
      status:200,
    });

  },[typeElem, idElem, task]);

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
            console.log(response.data);
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
    // console.log(user_id, cardUsers);
    if(cardUsers.length === 0){
      return true;
    }
    else{
      let addUser = true;

      cardUsers.forEach((cardUser) => {
        // console.log(user_id, cardUser.user_id);
        if (user_id === cardUser.id){
          addUser = false;
        }
      });
      // console.log(addUser);
      return addUser;
    }
  }

  function funcAddUserToCard(user_id){
    // console.log(user_id, cardUsers.length);
    if(chechUserToAdd(user_id)){
      request({
        method:'POST',
        url:`card-user-update/`,
        callback:(response) => { 
          if (response.status === 200) {
            console.log(response.data);
            if(response.data){
              setCardUsers((cardUsers) = cardUsers = [...cardUsers, response.data]);
              setSubscribe(cardUsers.filter((cardUser) => cardUser.id === authUser).length);
              
              setSearchNewCardUser(searchNewCardUser = searchNewCardUser.filter((elem) => elem.id !==  user_id));
              console.log(searchNewCardUser);
              setMatchSearch((searchNewCardUser.length === 0) ? '' : matchSearch);
              
              // if(searchNewCardUser.length === 0){
              //   setMatchSearch('');
              // }
              // onUserCard(user_id); // это по ходу лишее, но это не точно.
            }
          }
        },
        data: { 'user_id': user_id, 'card_id': windowData.id},
        status:200,
      });
    }
  }

  function funcDelCardUser(user_id){
    // console.log(user_id);
    cardUsers.forEach(cardUser => {
      if (user_id === cardUser.id){
        // console.log(user_id, cardUser.user_id);
        request({
          method:'POST',
          url:`card-user-delete/`,
          callback:(response) => { 
            if (response.status === 200) {
              // console.log(response.data);
              if(response.data){
                // console.log('ответ пришёл');
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
                  <img 
                    className={styles.memberAvatar} 
                    src={cardUser.img ? `/img/users/${cardUser.img}` : '/img/users/Andrey.png'}
                    // srcSet="/img/no_photo.png 1x, /img/no_photo.png 2x" 
                    alt={`${cardUser.first_name} (${cardUser.username})`}
                    title={`${cardUser.first_name} (${cardUser.username})`}
                    onClick={()=> onUserCard(cardUser.id)}
                  />
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
                <div class={styles.cardDescriptionHeaderBtn}>
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
                  formats={formats}
                  onKeyDown={(evt)=>showReactQuillHandleKeyPress(evt)}
                  onBlur={(evt)=>showReactQuillHandleKeyPress(evt)}
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
          
          <div  className={styles.cardAttachmentsSection}>
            Действия (Тут же: показать подробности, напишите комментарий…)
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

