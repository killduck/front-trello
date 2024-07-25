
import styles from "./SidebarMembersWindow.module.scss";

import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";

export default function SidebarMembersWindow(props){

  let dashboardUsers = props.dashboardUsers;
  let cardUsers = props.cardUsers;
  let funcAddUserToCard = props.funcAddUserToCard;
  let funcDelCardUser = props.funcDelCardUser;
  let funcMembersWindow = props.funcMembersWindow;

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
          />
        </label>
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
        }

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
      </div>
    </div>

  )
};

