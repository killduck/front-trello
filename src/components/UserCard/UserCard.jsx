import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

import request from "../../api/request";

import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';

import styles from './UserCard.module.scss';


export default function UserCard(props) {

  let updateComponent = props.updateComponent;

  let setUpdateComponent = props.setUpdateComponent;

  let user = props.user;

  let clickAction = props.clickAction;

  let { dashboardId } = useParams();

  let [roleData, setRoleData] = useState({});

  // let [updateComponent, setUpdateComponent] = useState(false);


  useEffect(() => {
    request({
      method: 'POST',
      url: 'search-role-board/',
      callback: (response) => {

        if (response.status === 200) {
          setRoleData(response.data)
          setUpdateComponent(false);
        }

      },
      data: { 'user_id': user['id'], 'dashboard_id': dashboardId },
      status: 200,
    });
  }, [updateComponent]);


  function onСhangeRole(action) {

    request({
      method: 'POST',
      url: 'change-role-board/',
      callback: (response) => {

        if (response.status === 200) setUpdateComponent(true);

      },
      data: { 'user_id': user['id'], 'dashboard_id': dashboardId, 'action': action },
      status: 200,
    });

  }


  function СheckBtnAddAdmin() {

    if (

      roleData['role_card_user'] !== 'admin' &&
      roleData['role_auth_user'] === 'admin'
    ) return true;

    return false;
  }

  function СheckBtnDelAdmin() {

    if (
      roleData['role_auth_user'] === 'admin' &&
      roleData['count_admin_on_board'] > 1 &&
      roleData['role_card_user'] === 'admin'
    ) return true;

    return false;
  }

  function СheckBtnDelUser() {

    if (roleData['count_user_on_board'] > 1) return true;

    return false;
  }


  return (
    <div className={styles.UserCard}>
      <div className={styles.UserCardWrap}>

        <div className={styles.UserCardButton}>
          <Button
            clickAction={clickAction}
            actionVariable={user.id}
            className={"BtnCloseUserCard"}
          >
            <Icons
              name={'CloseIcon'}
              class_name={'IconCloseUserCard'}
            />
          </Button>
        </div>

        <div className={styles.UserCardInfoUser}>
          <div className={styles.Logo}>
            <span>{user.first_letter}</span>
            {
              roleData['role_card_user'] === 'admin' ?
                <Icons
                  name={'ArrowsUp'}
                  class_name={'IconAdmin'}
                />
                :
                <></>
            }
          </div>

          <div className={styles.InfoUserName}>
            <div className={styles.LastFirstName}>
              {user.last_name} {user.first_name}
            </div>
            <div className={styles.UserName}>
              <span>@{user.username}</span>
              <span className={styles.UserNameRole}>
                {
                  roleData['role_card_user'] === 'admin' ?
                    " (администратор)"
                    :
                    " (участник)"
                }
              </span>
            </div>
          </div>
        </div>

        <hr />

        <ul className={styles.UserCardActions} >
          {
            СheckBtnAddAdmin() ?
              <li>
                <Button
                  className={"BtnUserCardActions"}
                  clickAction={onСhangeRole}
                  actionVariable={'add_admin'}

                >
                  Добавить на доску как администратора
                </Button>
              </li>
              :
              <li />
          }
          {
            СheckBtnDelAdmin() ?
              <li>
                <Button
                  className={"BtnUserCardActions"}
                  clickAction={onСhangeRole}
                  actionVariable={'del_admin'}
                >
                  Удалить из администраторов
                </Button>
              </li>
              :
              <li />
          }
          {
            СheckBtnDelUser() ?
              <li>
                {roleData['user_auth_id'] === user['id'] ?
                  <Button
                    className={"BtnUserCardActions"}
                    clickAction={onСhangeRole}
                    actionVariable={'del_user'}
                  >
                    Покинуть доску
                  </Button>
                  :
                  roleData['role_auth_user'] === 'admin' ?
                    <Button
                      className={"BtnUserCardActions"}
                      clickAction={onСhangeRole}
                      actionVariable={'del_user'}
                    >
                      Удалить с доски
                    </Button>
                    :
                    <></>
                }
              </li>
              :
              <li />
          }
        </ul>

        {/* <div style={{ fontSize: '12px' }}>
          <p>
            <span>user_auth_id = </span>
            <span>{roleData['user_auth_id']}</span>
          </p>
          <p>
            <span>role_auth_user = </span>
            <span>{roleData['role_auth_user']}</span>
          </p>
          <p>
            <span>role_card_user = </span>
            <span>{roleData['role_card_user']}</span>
          </p>
          <p>
            <span>count_admin_on_board = </span>
            <span>{roleData['count_admin_on_board']}</span>
          </p>
          <p>
            <span>count_user_on_board = </span>
            <span>{roleData['count_user_on_board']}</span>
          </p>
        </div> */}

      </div>
    </div>
  )
};
