import { useState } from 'react'

import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import styles from './DashboardHeader.module.scss';
import UserDashboard from '../UserDashboard/UserDashboard';


export default function DashboardHeader(props) {

  let name_dashboard = props.name_dashboard;

  let dashboardUsers = props.dashboardUsers;

  let updateComponent = props.updateComponent;

  let setUpdateComponent = props.setUpdateComponent;

  let [showUserDashboard, setShowUserDashboard] = useState(null);

  let [showFormShare, setShowFormShare] = useState(false);

  let [fieldEmailData, setFieldEmailData] = useState("");


  function onUserDashboard(id_user = null) {

    showUserDashboard === id_user ?
      setShowUserDashboard(null)
      :
      setShowUserDashboard(id_user)
  }

  function onShareDashboard() {

    showFormShare ?
      setShowFormShare(false)
      :
      setShowFormShare(true)
  }

  function writeEmail(evt) {
    setFieldEmailData((fieldEmailData) => (fieldEmailData = evt));
  }

  function SubmitFormShare() {
    console.log('Проверка выполения функции =>', SubmitFormShare.name);
    console.log('email>>>', fieldEmailData);
  }


  // function onRemoving_all_menu(event) {
  //   console.log('Проверка выполения функции =>', onRemoving_all_menu.name, event);

  // }


  return (
    <div
      className={styles.DashboardHeader}
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
              dashboardUsers.map((user) => (
                <div className={styles.User} key={user.id}>
                  <Notification
                    user={user}
                    class_name={'HeaderUsers'}
                    clickAction={onUserDashboard}
                    actionVariable={user.id}
                  />
                  <div
                    className={
                      showUserDashboard === user.id ?
                        `${styles.UserDashboardWrap}`
                        :
                        styles.DisplayNone
                    }
                    key={user.id}
                  >
                    <UserDashboard
                      user={user}
                      clickAction={onUserDashboard}
                      updateComponent={updateComponent}
                      setUpdateComponent={setUpdateComponent}

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

            <div className={
              showFormShare ?
                `${styles.FormShare}`
                :
                styles.DisplayNone
            }>
              <div className={styles.FormShareTitle}>
                <span>Поделиться доской</span>
                <Button
                  clickAction={onShareDashboard}
                  className={"BtnFormShareDashboard"}
                >

                  <Icons
                    name={'CloseIcon'}
                    class_name={'IconCloseFormShare'}
                  />
                </Button>
              </div>
              <form id="form-sharedashboard" className={styles.FormShareInput}>
                <input
                  type="email"
                  value={(fieldEmailData) ? fieldEmailData : ""}
                  onChange={(evt) => writeEmail(evt.target.value)}
                />
                <Button
                  id="form-sharedashboard"
                  type="button"
                  className={"BtnFormShareInput"}
                  clickAction={SubmitFormShare}
                >
                  Поделиться
                </Button>
              </form>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
};
