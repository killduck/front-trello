
import styles from "./SidebarMembersWindow.module.scss";

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import { useState } from "react";
import { URL_API } from "../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setMembersWindow, setShowPreloderAddMember, setShowPreloderDelMember } from "../../main_state/states/modalCardMember/modalCardMember";
import { setCardUsers, setMatchSearch, setSearchNewCardUser } from "../../main_state/states/cardUsersState";
import { setSubscribeState } from "../../main_state/states/subscribeState";
import request from "../../api/request";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";

export default function SidebarMembersWindow(props){

  let dashboardUsers = props.dashboardUsers;

  const authUser = useSelector((state) => state.cardUsersState.authUser); 
  const cardUsers = useSelector((state) => state.cardUsersState.cardUsers);
  const matchSearch = useSelector((state) => state.cardUsersState.matchSearch);
  const searchNewCardUser = useSelector((state) => state.cardUsersState.searchNewCardUser);
  const windowData = useSelector((state) => state.windowData.value);
  const membersWindow = useSelector((state) => state.modalCardMemberState.membersWindow);
  const showPreloderAddMember = useSelector((state) => state.modalCardMemberState.showPreloderAddMember);
  const showPreloderDelMember = useSelector((state) => state.modalCardMemberState.showPreloderDelMember);

  const dispatch = useDispatch();

  const [showNoResult, setShowNoResult]=useState(false);

  function funcMembersWindow(){
    dispatch(onRemoving_onFrames()); 
    dispatch(setMatchSearch(''));
    dispatch(setSearchNewCardUser([]));

    if(membersWindow){
      dispatch(setMembersWindow(false));
    }
    else{
      dispatch(setMembersWindow(true));
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
    if(showPreloderAddMember){ 
      return;
    }
    dispatch(setShowPreloderAddMember(user_id));
    if(chechUserToAdd(user_id)){
      request({
        method:'POST',
        url:`card-user-update/`,
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              dispatch(setShowPreloderAddMember(false));

              let newCardUsersArr = [...cardUsers, response.data];
              dispatch(setCardUsers(newCardUsersArr));
              dispatch(setSubscribeState(newCardUsersArr.filter((cardUser) => cardUser.id === authUser).length));
              
              dispatch(setSearchNewCardUser(searchNewCardUser.filter((elem) => elem.id !==  user_id)));
              dispatch(setMatchSearch((searchNewCardUser.length === 0) ? '' : matchSearch));
            }
          }
        },
        data: {'auth_user': authUser, 'user_id': user_id, 'card_id': windowData.id},
        status:200,
      });
    }
  }

  function funcDelCardUser(user_id){
    if(showPreloderDelMember){
      return;
    } 
    dispatch(setShowPreloderDelMember(user_id));
    cardUsers.forEach(cardUser => {
      if (user_id === cardUser.id){
        request({
          method:'POST',
          url:`card-user-delete/`,
          callback:(response) => { 
            if (response.status === 200) {
              if(response.data){
                dispatch(setShowPreloderDelMember(false));

                let filteredCardUsers = cardUsers.filter((cardUser) => cardUser.id !== user_id);
                dispatch(setCardUsers(filteredCardUsers));

                let filteredCardSubscribedUsers = filteredCardUsers.filter((cardUser) => cardUser.id === authUser).length
                dispatch(setSubscribeState(filteredCardSubscribedUsers));
              }
            }
          },
          data: {'auth_user': authUser, 'user_id': cardUser.id, 'card_id': windowData.id},
          status:200,
        });
      }
    });
  }

  function funcCheckToAddNewCardUser(dashboardUser, item = null){
    let dashboardUserCheck = true;

    cardUsers.forEach(cardUser => {
      if(cardUser[item] === dashboardUser[item]){
        dashboardUserCheck = false;
        return;
      }
    });

    return dashboardUserCheck;
  }

  function funcSearchNewCardUser(evt){
    dispatch(setMatchSearch(evt));

    let  evtLength = evt.length;
    let searchedUsers = [];

    if(evtLength === 0){
      searchedUsers = [];
      setShowNoResult(false);
    }
    else{
      dashboardUsers.forEach(dashboardUser => {
        
        switch(evt){
          case dashboardUser.first_name.toLowerCase().substring(0, evtLength):
            if(funcCheckToAddNewCardUser(dashboardUser, 'first_name')){
              searchedUsers.push(dashboardUser);
            }
            break;
          case dashboardUser.email.toLowerCase().substring(0, evtLength):
            if(funcCheckToAddNewCardUser(dashboardUser, 'email')){
              searchedUsers.push(dashboardUser);
            }
            break;
          case dashboardUser.last_name.toLowerCase().substring(0, evtLength):
            if(funcCheckToAddNewCardUser(dashboardUser, 'last_name')){
              searchedUsers.push(dashboardUser);
            }
            break;
          case dashboardUser.username.toLowerCase().substring(0, evtLength):
            if(funcCheckToAddNewCardUser(dashboardUser, 'username')){
              searchedUsers.push(dashboardUser);
            }
            break;
          default: break;
        }
      });
    }

    if(searchedUsers.length === 0 && evtLength > 0){
      setShowNoResult(true);
      return;
    }
    setShowNoResult(false);
    dispatch(setSearchNewCardUser(searchedUsers));
  }

  const search_new_card_user_item = (
    (searchNewCardUser.length !== 0) ? 
      (
        <div className={styles.itemContentDashboardMember}>
          <ul>
          {searchNewCardUser.map(
            (user)=> 
              <li key={user.id} className={showPreloderAddMember === user.id ? styles.cardMembersWindowGradient: ""}>
                <Button
                  className={'addUserToCard'}
                  type="button"
                  ariaLabel="Добавить пользователя к карточке"
                  actionVariable = {user.id}
                  clickAction = {showPreloderAddMember ? null : funcAddUserToCard}
                  disabled={showPreloderAddMember === user.id ? "disabled" : ""}
                >
                  <div 
                    className={styles.itemContentDashboardMemberImg} 
                  >
                    {user.img ?
                      (<span 
                        title={`${user.first_name} (${user.username})`}
                        style={{ backgroundImage: `url(${URL_API + user.img})`}} />
                      )
                      :
                      (<span 
                        title={`${user.first_name} (${user.username})`}
                      >{user.first_letter}</span>
                      )
                    }
                  </div>
                  <div title={ user.username }>
                    <span>
                      {
                        ((user.first_name && user.last_name) ? 
                          (`${user.first_name} ${user.last_name}`) 
                          : 
                          (user.first_name ? 
                            user.first_name 
                            : 
                            user.username
                          )
                        )
                      }
                    </span>
                  </div>
                </Button>
                
              </li>
            )
          }
          </ul>
        </div>
      )
      :
      ("")
  )

  const card_users_item = (
    (cardUsers.length !== 0) ? 
      (
        <div className={styles.itemContentCardMembers} >
          <div className={styles.itemContentCardMembersTitle} >
            <h4 className={styles.itemContentCardMembersTitle}>Участники карточки</h4>
          </div>
          <div className={styles.itemContentDashboardMember} >
            <ul>
              { cardUsers.map(
                (cardUser) => 
                  <li key={cardUser.id} className={showPreloderDelMember === cardUser.id ? styles.cardMembersWindowGradient: ""}>
                    <Button
                      className={'delUserFromCard'}
                      type={showPreloderDelMember ? "text" : "button"}
                      ariaLabel="Удалить пользователя из карточки"
                      actionVariable={cardUser.id}
                      clickAction={showPreloderDelMember ? null : funcDelCardUser}
                      disabled={showPreloderDelMember === cardUser.id ? "disabled" : ""}
                    >
                      <div className={styles.itemContentDashboardMemberInfo} >

                        <div className={styles.itemContentDashboardMemberImg} >
                          {cardUser.img ?
                            (<span 
                              title={`${cardUser.first_name} (${cardUser.username})`}
                              style={{ backgroundImage: `url(${URL_API + cardUser.img})`}} />
                            )
                            :
                            (<span 
                              // className={styles.memberAvatarSpan} 
                              title={`${cardUser.first_name} (${cardUser.username})`}
                            >{cardUser.first_letter}</span>
                            )
                          }
                        </div>
                        <div className={styles.itemContentDashboardMemberName} title={ cardUser.username }>
                          <span>
                            {
                              ((cardUser.first_name && cardUser.last_name) ? 
                                (`${cardUser.first_name} ${cardUser.last_name}`) 
                                : 
                                (cardUser.first_name ? 
                                  cardUser.first_name 
                                  : 
                                  cardUser.username
                                )
                              )
                            }
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
  )

  const dashboard_users_item = (
    <div className={styles.itemContentDashboardMembers} >
      <div className={styles.itemContentDashboardMembersTitle} >
        <h4 className={''}>Участники доски</h4>
      </div>
      <div className={styles.itemContentDashboardMember}>
        <ul>
        {dashboardUsers.map(
          (user)=> 
            <li key={user.id} className={showPreloderAddMember === user.id ? styles.cardMembersWindowGradient: ""}>
              <Button
                className={'addUserToCard'}
                type={showPreloderAddMember ? "text" : "button"}
                ariaLabel="Добавить пользователя к карточке"
                actionVariable={user.id}
                clickAction={showPreloderAddMember ? null : funcAddUserToCard}
                disabled={showPreloderAddMember === user.id ? "disabled" : ""}
              >
                <div 
                  className={styles.itemContentDashboardMemberImg} 
                >
                  {user.img ?
                    (<span 
                      title={`${user.first_name} (${user.username})`}
                      style={{ backgroundImage: `url(${URL_API + user.img})`}} />
                    )
                    :
                    (<span 
                      title={`${user.first_name} (${user.username})`}
                    >{user.first_letter}</span>
                    )
                  }
                </div>
                <div title={ user.username }>
                  <span>
                    {
                      ((user.first_name && user.last_name) ? 
                        (`${user.first_name} ${user.last_name}`) 
                        : 
                        (user.first_name ? 
                          user.first_name 
                          : 
                          user.username
                        )
                      )
                    }
                  </span>
                </div>
              </Button>
              
            </li>
          )
        }
        </ul>
      </div>
    </div>
  )

  return (

    <div className={styles.smallWindowWrap}>
            
      <div className={styles.itemHeader}>
        <span className={styles.itemHeaderTitle}>Участники</span>
        <div className={styles.iconWrap}>
          <Button
              className={'btnSmallWindow'}
              type={showPreloderAddMember || showPreloderDelMember ? "text" : "button"}
              ariaLabel="Закрыть окно"
              clickAction={showPreloderAddMember || showPreloderDelMember ? null : funcMembersWindow }
              disabled={showPreloderAddMember || showPreloderDelMember ? "disabled" : ""}
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
        <label htmlFor="Поиск участников">
          <input 
            id="Поиск участников"
            className={styles.itemContentInput} 
            autoFocus = {true}
            type="text" 
            placeholder="Поиск участников" 
            value={matchSearch}
            onChange={(evt) => funcSearchNewCardUser(evt.target.value.trim().toLowerCase())}
          />
        </label>
        {(showNoResult)?
            (<p className={styles.noResult}>Нет результатов</p>)
          :
            ("")
        }
        {(!showNoResult)?
            (search_new_card_user_item)
          :
            ("")
        }
        {(!showNoResult)?
            (card_users_item)
          :
            ("")
        }
        {(!showNoResult)?
            (dashboard_users_item)
          :
            ("")
        }

      </div>
    </div>
  )
};

