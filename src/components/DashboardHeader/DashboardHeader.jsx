import { useEffect, useState } from 'react'

import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import styles from './DashboardHeader.module.scss';
import './DashboardHeader.css';
import UserDashboard from '../UserDashboard/UserDashboard';

import Select from 'react-select';

import request from "../../api/request";
import ListUsers from '../ListUsers/ListUsers';

export default function DashboardHeader(props) {

  let name_dashboard = props.name_dashboard;
  let dashboardId = props.dashboardId;
  let dashboardUsers = props.dashboardUsers;
  let updateComponent = props.updateComponent;
  let setUpdateComponent = props.setUpdateComponent;

  let [showUserDashboard, setShowUserDashboard] = useState(null);
  let [showFormShare, setShowFormShare] = useState(false);
  let [fieldData, setFieldData] = useState("");
  let [selectedOption, setSelectedOption] = useState(null);
  let [optionList, setOptionList] = useState([]);

  const components = {
    DropdownIndicator: null,
  };

  function onUserDashboard(id_user = null) {

    showUserDashboard === id_user ?
      setShowUserDashboard(null)
      :
      setShowUserDashboard(id_user)
  }

  function onShareDashboard() {

    setSelectedOption(null);

    showFormShare ?
      setShowFormShare(false)
      :
      setShowFormShare(true)
  }


  useEffect(() => {
    request({
      method: 'POST',
      url: 'invit-board/select-users/',
      callback: (response) => {
        setOptionList(response.data);
      },
      data: { fieldData, dashboardId },
      status: 200,
    });
  }, [fieldData]);

  function writeEmail(evt) {
    setFieldData((fieldData) => (fieldData = evt));
  }

  function SubmitFormShare() {

    request({
      method: 'POST',
      url: 'invit-board/invit-users/',
      callback: (response) => {
      },
      data: { selectedOption, dashboardId },
      status: 200,
    });

    onShareDashboard();
    setSelectedOption(null);
  }


  // function onRemoving_all_menu(event) {
  //   console.log('Проверка выполения функции =>', onRemoving_all_menu.name, event);

  // }

  function handleSelect(data) {
    setSelectedOption(data);
  }


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

            <div
              className={
                showFormShare ?
                  `${styles.FormShare}`
                  :
                  styles.DisplayNone
              }
            >
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
                <div onChange={(evt) => writeEmail(evt.target.value)}>
                  <Select
                    placeholder="поиск пользователя"
                    components={components}
                    options={optionList}
                    value={selectedOption}
                    onChange={handleSelect}
                    openMenuOnClick={false}
                    isMulti
                    getOptionValue={option => option.username}
                    getOptionLabel={option => option.email}
                    noOptionsMessage={() => "Пользователи не найдены"}
                  />
                </div>
                <Button
                  id="form-sharedashboard"
                  type="button"
                  className={"BtnFormShareInput"}
                  clickAction={SubmitFormShare}
                >
                  Поделиться
                </Button>
              </form>

              <div className={styles.LineSeparator} />

              <div className={styles.Title_ListUsers}>
                Приглашенные пользователи
              </div >
              <ListUsers
                dashboardId={dashboardId}
                SubmitFormShare={SubmitFormShare}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
