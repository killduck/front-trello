
import styles from "./WindowModal.module.scss"

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import request from "../../api/request";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";

export default function WindowModal(props){
  // console.log(props);
  let typeElem = props.typeElem;
  let idElem = Number(props.idElem);
  // let task = props.task;
  let column = props.column;
  let updateFunc = props.updateFunc;
  let deleteFunc = props.deleteFunc;
  // console.log(column);

  // const [mainState, setMainState] = useState(false);

  const [value, setValue] = useState('');

  let [windowData, setWindowData] = useState({});
  const [startWindowName, setStartWindowName] = useState('');
  let [windowName, setWindowName] = useState('');
  let [newName, setNewNameField] = useState(false);

  let [ membersWindow, setMembersWindow] = useState(false);

  let [cardUsers, setCardUsers] = useState([]);
  let [dashboardUsers, setDashboardUsers] = useState([]);

  // let [newText, setNewTextData] = useState('');

  let [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    request({
      method:'POST',
      url:`take-data-${typeElem}/`,
      callback:(response) => { 
        if (response.status === 200) {
          // console.log(response.data);
          if(response.data){
            setWindowData(response.data[0]);
            setWindowName(response.data[0]['name']);
            setStartWindowName(response.data[0]['name']);
          }
        }
      },
      data: { 'id': idElem },
      status:200,
    });

  },[typeElem, idElem]);

  function showTextarea() {
    if(!newName){
      setNewNameField(newName = true);
    }
    else{
      setNewNameField(newName = false);
    }
  }

  function writeNewText(evt) {
    // console.log(evt);
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

  function requestUsers() {
    request({
      method:'POST',
      url:`dashboard-user/`,
      callback:(response) => { 
        if (response.status === 200) {
          console.log(response.data);
          if(response.data){
            setDashboardUsers(response.data);
          }
        }
      },
      data: { 'dashboard_id': column.dashboard },
      status:200,
    });
  }

  function funcMembersWindow(){
    if(membersWindow){
      setMembersWindow(false);
    }
    else{
      setMembersWindow(membersWindow = true);
      requestUsers();
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
        if (user_id === cardUser.user_id){
          addUser = false;
        }
      });
      // console.log(addUser);
      return addUser;
    }
  }

  function addUserToCard( user_id ){
    // console.log(user_id, cardUsers.length);
    if(chechUserToAdd(user_id)){
      request({
        method:'POST',
        url:`card-user-update/`,
        callback:(response) => { 
          if (response.status === 200) {
            console.log(response.data);
            if(response.data){
              setCardUsers( [...cardUsers, response.data] );
            }
          }
        },
        data: { 'user_id': user_id, 'card_id': windowData.id},
        status:200,
      });
    }
  }

  function funcDelCardUser (user_id){
    // console.log(user_id);
    cardUsers.forEach(cardUser => {
      if (user_id === cardUser.user_id){
        // console.log(user_id, cardUser.user_id);
        request({
          method:'POST',
          url:`card-user-delete/`,
          callback:(response) => { 
            if (response.status === 200) {
              // console.log(response.data);
              if(response.data){
                // console.log('ответ пришёл');
                let filteredCardUsers = cardUsers.filter((cardUser) => cardUser.user_id !== user_id);
                setCardUsers(filteredCardUsers);
              }
            }
          },
          data: { 'user_id': cardUser.user_id, 'card_id': cardUser.card_id},
          status:200,
        });
      }
    });
  }

  const headerSection = (
  <>
    <span className={styles.headerIcon}></span>
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
    "участники в колонке/карточке"
  )

  const columnLabels = (
    "метки"
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

          <div  className={styles.cardDescription}>
            Описание:
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            Добавить более подробное описание…
          </div>
          
          <div  className={styles.cardAttachmentsSection}>
            Действия (Тут же: показать подробности, напишите комментарий…)
          </div>

        </div>
        {/* сайдбар */}
        <div className={styles.sidebar}>
          {/* sidebar */}
          <div className={styles.addItemsWrap}>
            <h3 class={styles.cardTitle}>Добавить на карточку:</h3>
            <div className={styles.itemsWrap}>
              
              <div 
                className={styles.itemMembers}
                onClick={ funcMembersWindow }
              >
                <Icons //нужна другая иконка
                  name={'icon-date'}
                  class_name={'itemDueDateIcon'}
                />
                <span>Участники</span>
              </div>
              
              {membersWindow ?
              
              (<div 
                className={styles.smallWindowWrap}
              >
                {/* <div className={styles.itemHeader}> */}
                <div className={styles.itemHeader}>
                  <span class={styles.itemHeaderTitle}>Участники</span>
                  <div className={styles.iconWrap}>
                    <Button
                        className={'btnSmallWindow'}
                        type="dutton"
                        ariaLabel="Закрыть окно"
                        clickAction={ funcMembersWindow }
                    >
                      {/* <div className={styles.iconWrap}> */}
                        <Icons
                            class_name={'btnModalCloseIcon'}
                            name={'CloseIcon'}
                        />
                      {/* </div> */}
                    </Button>
                  </div>
                </div>
                <div className={styles.itemContent}>
                  <input 
                    className={styles.itemContentInput} 
                    autoFocus = {true}
                    type="text" 
                    placeholder="Поиск участников" 
                  />
                  {(cardUsers.length !== 0) ? (
                  <div className={styles.itemContentCardMembers} >
                    <div className={styles.itemContentCardMembersTitle} >
                      <h4 className={styles.itemContentCardMembersTitle}>Участники карточки</h4>
                    </div>
                    <div className={styles.itemContentDashboardMember} >
                      <ul>
                        { cardUsers.map(
                          (cardUser) => 
                            <li key={cardUser.id}>
                              <Button
                                className={'delUserFromCard'}
                                type="dutton"
                                ariaLabel="Удалить пользователя из карточки"
                                actionVariable={ cardUser.user_id }
                                clickAction={ funcDelCardUser }
                              >
                                <div className={styles.itemContentDashboardMemberInfo} >

                                  <div className={styles.itemContentDashboardMemberImg} >
                                    <span />
                                  </div>
                                  <div className={styles.itemContentDashboardMemberName} title={ cardUser.user_data.username }>
                                    <span>
                                      { cardUser.user_data.username }
                                    </span>
                                  </div>
                                  <div>
                                    <Icons
                                      class_name={'delUserFromCardIcon'}
                                      name={'CloseIcon'}
                                    />
                                  </div>
                                </div>
                              </Button>
                            </li>
                          )
                        }
                      </ul>
                    </div>
                  </div>
                  )
                  :
                  ("")
                  }

                  <div className={styles.itemContentDashboardMembers} >
                    <div className={styles.itemContentDashboardMembersTitle} >
                      <h4 className={''}>Участники доски</h4>
                    </div>
                    <div className={styles.itemContentDashboardMember}>
                      <ul>
                      {dashboardUsers.map
                        ((user)=> 
                          <li key={user.id} >
                            <Button
                              className={'addUserToCard'}
                              type="dutton"
                              ariaLabel="Добавить пользователя к карточке"
                              actionVariable = {user.id}
                              clickAction = { addUserToCard }
                            >
                              <div className={styles.itemContentDashboardMemberImg} >
                                <span />
                              </div>
                              <div title={ user.username }>
                                <span>{user.username}</span>
                              </div>
                            </Button>
                            
                          </li>
                        )
                      }
                      </ul>
                    </div>
                  </div>

                </div>
                {/* </div> */}
              </div>
              )
              :
              ("")
              }
              

              <div className={styles.itemLabels}>
                <Icons  //нужна другая иконка
                  name={'icon-date'}
                  class_name={'itemDueDateIcon'}
                />
                <span>Метки</span>
              </div>

              <div className={styles.itemDueDate}>
                <Icons
                  name={'icon-date'}
                  class_name={'itemDueDateIcon'}
                />
                <span>Даты</span>
              </div>

              <div className={styles.itemAttachments}>
                <Icons  //нужна другая иконка
                  name={'icon-date'}
                  class_name={'itemDueDateIcon'}
                />
                <span>Прикрепить</span>
              </div>

            </div>

          </div>

          <div className={styles.actionsWrap}>
            <h3 className={styles.actionsTitle}>Действия:</h3>
            <div className={styles.actionsWrap}>
              <div className={styles.actionDeleteCard}>
                
                <Button
                    // clickAction={deleteColumn}
                    // actionVariable={column.id}
                    // className={'BtnDeleteColumn'}
                    clickAction={deleteFunc}
                    actionVariable={windowData.id}
                    className={'BtnDeleteCard'}
                  >
                    <Icons
                      name={'Trash'}
                      class_name={'IconDeletColumnn'}
                    />
                    <span className={styles.actionDeleteCardText}>
                      Удалить {typeElem === 'column' ? 'колонку' : 'карточку'}
                    </span>
                </Button>
              </div>
            </div>

          </div>

          
        </div>

    </div>
  )
};

