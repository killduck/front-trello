import { useState } from 'react'

import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import styles from './DashboardHeader.module.scss';
import './DashboardHeader.css';
import UserDashboard from '../UserDashboard/UserDashboard';

import Select from 'react-select';
import AsyncSelect from 'react-select/async'

import request from "../../api/request";


export default function DashboardHeader(props) {

  let name_dashboard = props.name_dashboard;

  let dashboardUsers = props.dashboardUsers;

  let updateComponent = props.updateComponent;

  let setUpdateComponent = props.setUpdateComponent;

  let [showUserDashboard, setShowUserDashboard] = useState(null);

  let [showFormShare, setShowFormShare] = useState(false);

  let [fieldEmailData, setFieldEmailData] = useState("");

  let [selectedOption, setSelectedOption] = useState(null);

  let [optionList, setOptionList] = useState(
    [
      { username: "red", email: "Rad" },
      { username: "green", email: "Green" },
      { username: "yellow", email: "Yellow" },
      { username: "blue", email: "Blue" },
      { username: "white", email: "White" },
    ]
  );

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
    console.log('email>>>', selectedOption);

    // request({
    //   method: 'POST',
    //   url: 'test-mail/',
    //   callback: (response) => {
    //   },
    //   data: {},
    //   status: 200,
    // });
  }


  // function onRemoving_all_menu(event) {
  //   console.log('Проверка выполения функции =>', onRemoving_all_menu.name, event);

  // }

  function handleSelect(data) {
    console.log(data);

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
                {/* <input
                  type="email"
                  value={(fieldEmailData) ? fieldEmailData : ""}
                  onChange={(evt) => writeEmail(evt.target.value)}
                /> */}
                <div>
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
                  />
                </div>
                {/* <AsyncSelect
                  placeholder="поиск пользователя"
                  components={components}
                  options={optionList}
                  value={selectedOption}
                  // onChange={handleSelect}
                  onChange={setSelectedOption}
                  openMenuOnClick={false}
                  isMulti
                  getOptionValue={option => option.user_name}
                  getOptionLabel={option => option.email}
                /> */}

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
