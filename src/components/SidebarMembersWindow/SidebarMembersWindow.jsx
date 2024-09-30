
import styles from "./SidebarMembersWindow.module.scss";

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import { useState } from "react";
import { URL_API, URL_ENDPOINT } from "../../api/config";

export default function SidebarMembersWindow(props){
  console.log(props);
  let dashboardUsers = props.dashboardUsers;
  let cardUsers = props.cardUsers;
  let funcAddUserToCard = props.funcAddUserToCard;
  let funcDelCardUser = props.funcDelCardUser;
  let funcMembersWindow = props.funcMembersWindow;
  let matchSearch = props.matchSearch;
  let setMatchSearch = props.setMatchSearch;
  let searchNewCardUser = props.searchNewCardUser;
  let setSearchNewCardUser = props.setSearchNewCardUser;
  let showPreloderAddMember = props.showPreloderAddMember;
  let showPreloderDelMember = props.showPreloderDelMember;

  // const [searchNewCardUser, setSearchNewCardUser]=useState([]);
  const [showNoResult, setShowNoResult]=useState(false);

  function funcCheckToAddNewCardUser(dashboardUser, item = null){
    // console.log(`funcCheckToAddNewCardUser => ${dashboardUser}, ${item}`);
    let dashboardUserCheck = true;

    cardUsers.forEach(cardUser => {
      console.log(cardUser[item], dashboardUser[item]);
      if(cardUser[item] === dashboardUser[item]){
        // console.log(`funcCheckToAddNewCardUser => ${cardUser[item]}, ${dashboardUser[item]}`);
        dashboardUserCheck = false;
        return;
      }
    });

    return dashboardUserCheck;
  }

  function funcSearchNewCardUser(evt){
    // console.log(`funcSearchNewCardUser => ${evt}`);
    setMatchSearch(evt);
    let  evtLength = evt.length;
    // console.log(evtLength);
    let searchedUsers = [];

    if(evtLength === 0){
      searchedUsers = [];
      setShowNoResult(false);
    }
    else{
      dashboardUsers.forEach(dashboardUser => {
        
        switch(evt){
          case dashboardUser.first_name.toLowerCase().substring(0, evtLength):
            // console.log(dashboardUser.first_name); 
            if(funcCheckToAddNewCardUser(dashboardUser, 'first_name')){
              searchedUsers.push(dashboardUser);
            }
            break;
          case dashboardUser.email.toLowerCase().substring(0, evtLength):
            // console.log(dashboardUser.first_name); 
            if(funcCheckToAddNewCardUser(dashboardUser, 'email')){
              searchedUsers.push(dashboardUser);
            }
            break;
          case dashboardUser.last_name.toLowerCase().substring(0, evtLength):
            // console.log(dashboardUser.first_name); 
            if(funcCheckToAddNewCardUser(dashboardUser, 'last_name')){
              searchedUsers.push(dashboardUser);
            }
            break;
          case dashboardUser.username.toLowerCase().substring(0, evtLength):
            // console.log(dashboardUser.first_name); 
            if(funcCheckToAddNewCardUser(dashboardUser, 'username')){
              searchedUsers.push(dashboardUser);
            }
            break;
          default: break;
        }
      });
    }
    // console.log(searchedUsers.length, evtLength);

    if(searchedUsers.length === 0 && evtLength > 0){
      setShowNoResult(true);
      return;
    }
    setShowNoResult(false);
    setSearchNewCardUser(searchedUsers);
    // console.log(searchNewCardUser);
  }

  const search_new_card_user_item = (
    (searchNewCardUser.length !== 0) ? 
      (
        <div className={styles.itemContentDashboardMember}>
          <ul>
          {searchNewCardUser.map(
            (user)=> 
              <li key={user.id} className={showPreloderAddMember === user.id ? styles.cardActivityNewCommentInputGradient: ""}>
                <Button
                  className={'addUserToCard'}
                  type="button"
                  ariaLabel="Добавить пользователя к карточке"
                  actionVariable = {user.id}
                  clickAction = {funcAddUserToCard}
                  disabled={showPreloderAddMember === user.id ? "disabled" : ""}
                >
                  <div 
                    className={styles.itemContentDashboardMemberImg} 
                  >
                    {user.img ?
                      (<span 
                        title={`${user.first_name} (${user.username})`}
                        style={{ backgroundImage: `url(${URL_API + URL_ENDPOINT + user.img})`}} />
                      )
                      :
                      (<span 
                        title={`${user.first_name} (${user.username})`}
                      >{user.first_letter}</span>
                      )
                    }
                    {/* <span style={{ backgroundImage: user.img ? `${URL_API + URL_ENDPOINT + user.img})` : user.first_letter }} /> */}
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
                  <li key={cardUser.id} className={showPreloderDelMember === cardUser.id ? styles.cardActivityNewCommentInputGradient: ""}>
                    <Button
                      className={'delUserFromCard'}
                      type={showPreloderDelMember ? "text" : "button"}
                      ariaLabel="Удалить пользователя из карточки"
                      actionVariable={cardUser.id}
                      clickAction={funcDelCardUser}
                      disabled={showPreloderDelMember === cardUser.id ? "disabled" : ""}
                    >
                      <div className={styles.itemContentDashboardMemberInfo} >

                        <div className={styles.itemContentDashboardMemberImg} >
                          {cardUser.img ?
                            (<span 
                              title={`${cardUser.first_name} (${cardUser.username})`}
                              style={{ backgroundImage: `url(${URL_API + URL_ENDPOINT + cardUser.img})`}} />
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
            <li key={user.id} className={showPreloderAddMember === user.id ? styles.cardActivityNewCommentInputGradient: ""}>
              <Button
                className={'addUserToCard'}
                type={showPreloderAddMember ? "text" : "button"}
                ariaLabel="Добавить пользователя к карточке"
                actionVariable={user.id}
                clickAction={funcAddUserToCard}
                disabled={showPreloderAddMember === user.id ? "disabled" : ""}
              >
                <div 
                  className={styles.itemContentDashboardMemberImg} 
                >
                  {user.img ?
                    (<span 
                      title={`${user.first_name} (${user.username})`}
                      style={{ backgroundImage: `url(${URL_API + URL_ENDPOINT + user.img})`}} />
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
              type="button"
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

