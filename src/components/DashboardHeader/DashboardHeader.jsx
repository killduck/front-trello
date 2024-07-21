import { useState } from 'react'

import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import styles from './DashboardHeader.module.scss';
import UserCard from '../UserCard/UserCard';


export default function DashboardHeader(props) {

  let name_dashboard = props.name_dashboard;

  let users = props.users;

  let [showUserCard, setShowUserCard] = useState(null);


  function onUserCard(id_user = null) {
    console.log('Проверка выполения функции =>', onUserCard.name, id_user);

    showUserCard === id_user ?
      setShowUserCard(null)
      :
      setShowUserCard(id_user)
  }

  function onShareDashboard() {
    console.log('Проверка выполения функции =>', onShareDashboard.name);
  }

  function onRemoving_all_menu(event) {
    console.log('DashboardHeader event->', event);


  }


  return (
    <div
      className={styles.DashboardHeader}
      onClick={(event) => onRemoving_all_menu(event)}
    >
      <div className={styles.DashboardHeaderWrap}>


        <div className={styles.DashboardHeaderLeft}>
          <div className={styles.LeftTitle}>
            <div className={styles.TitleName}>
              {name_dashboard}
            </div>
          </div>
        </div>

        <div className={styles.DashboardHeaderRight}>
          <div className={styles.DashboardHeaderUsers}>
            {
              users.map((user) => (
                <div className={styles.User} key={user.id}>
                  <Notification
                    user={user}
                    class_name={'HeaderUsers'}
                    clickAction={onUserCard}
                    actionVariable={user.id}
                  />
                  <div
                    className={
                      showUserCard === user.id ?
                        `${styles.UserCardWrap}`
                        :
                        styles.DisplayNone
                    }
                    key={user.id}
                  >
                    <UserCard
                      user={user}
                    />
                  </div>
                </div>

              ))
            }
          </div>
          <div className={styles.ButtonShare}>
            <Button
              className={"BtnShare"}
              clickAction={onShareDashboard}
            >
              <Icons
                name={'ManPlus'}
                class_name={'IconShareDashboard'}
              />
              Поделиться
            </Button>
          </div>
        </div>


      </div>
    </div>
  )
};
