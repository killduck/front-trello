
import styles from "./SidebarMembersWindow.module.scss";

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import { useState } from "react";

export default function SidebarMembersWindow(props){

  let dashboardUsers = props.dashboardUsers;
  let cardUsers = props.cardUsers;
  let funcAddUserToCard = props.funcAddUserToCard;
  let funcDelCardUser = props.funcDelCardUser;
  let funcMembersWindow = props.funcMembersWindow;

  // console.log(dashboardUsers);

  const [searchNewCardUser, setSearchNewCardUser]=useState([]);
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
    let  evtLength = evt.length;
    // console.log(evtLength);
    let searchedUsers = []

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
    console.log(searchedUsers.length, evtLength);

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
              <li key={user.id} >
                <Button
                  className={'addUserToCard'}
                  type="dutton"
                  ariaLabel="Добавить пользователя к карточке"
                  actionVariable = {user.id}
                  clickAction = {funcAddUserToCard}
                >
                  <div 
                    className={styles.itemContentDashboardMemberImg} 
                  >
                    <span style={{ backgroundImage: user.img ? `url(/img/users/${user.img})` : 'url(/img/no_photo1.png)' }} />
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
                  <li key={cardUser.id}>
                    <Button
                      className={'delUserFromCard'}
                      type="dutton"
                      ariaLabel="Удалить пользователя из карточки"
                      actionVariable={ cardUser.id }
                      clickAction={ funcDelCardUser }
                    >
                      <div className={styles.itemContentDashboardMemberInfo} >

                        <div className={styles.itemContentDashboardMemberImg} >
                          <span style={{ backgroundImage: cardUser.img ? `url(/img/users/${cardUser.img})` : 'url(/img/no_photo1.png)' }} />
                        </div>
                        <div className={styles.itemContentDashboardMemberName} title={ cardUser.username }>
                          <span>
                            { cardUser.username }
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
            <li key={user.id} >
              <Button
                className={'addUserToCard'}
                type="dutton"
                ariaLabel="Добавить пользователя к карточке"
                actionVariable = {user.id}
                clickAction = { funcAddUserToCard }
              >
                <div 
                  className={styles.itemContentDashboardMemberImg} 
                >
                  <span style={{ backgroundImage: user.img ? `url(/img/users/${user.img})` : 'url(/img/no_photo1.png)' }} />
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
  )

  return (

    <div className={styles.smallWindowWrap}>
            
      <div className={styles.itemHeader}>
        <span className={styles.itemHeaderTitle}>Участники</span>
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
        <label htmlFor="Поиск участников">
          <input 
            id="Поиск участников"
            className={styles.itemContentInput} 
            autoFocus = {true}
            type="text" 
            placeholder="Поиск участников" 
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

