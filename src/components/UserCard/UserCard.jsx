import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import request from "../../api/request";

import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';

import styles from './UserCard.module.scss';


export default function UserCard(props) {

  let user = props.user;

  let clickAction = props.clickAction;

  let { dashboardId } = useParams();

  let [roleData, setRoleData] = useState({});


  useEffect(() => {
    request({
      method: 'POST',
      url: 'search-role-board/',
      callback: (response) => {

        setRoleData(response.data)

      },
      data: { 'user_id': user['id'], 'dashboard_id': dashboardId },
      status: 200,
    });
  }, []);


  function onAddAdmin(user_id) {
    console.log('Проверка выполения функции =>', onAddAdmin.name, user_id);

    request({
      method: 'POST',
      url: 'change-role-board/',
      callback: (response) => {
      },
      data: { 'user_id': user_id, 'dashboard_id': dashboardId,  'action': 'add_admin'},
      status: 200,
    });

  }

  function onDelAdmin(user_id) {
    console.log('Проверка выполения функции =>', onDelAdmin.name, user_id);
  }


  function onLeaveBoard(user_id) {
    console.log('Проверка выполения функции =>', onLeaveBoard.name, user_id);
  }

  function СheckBtnAddAdmin(){

    if (
      roleData['role_card_user'] !== 'admin' &&
      roleData['role_auth_user'] === 'admin'
    ) return true;

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
          </div>

          <div className={styles.InfoUserName}>
            <div className={styles.LastFirstName}>
              {user.last_name} {user.first_name}
            </div>
            <div className={styles.UserName}>
              @{user.username}
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
              clickAction={onAddAdmin}
              actionVariable={user.id}
            >
              Добавить на доску как администратора
            </Button>
          </li>
          :
          <li/>
          }
          <li>
            <Button
              className={"BtnUserCardActions"}
              clickAction={onDelAdmin}
              actionVariable={user.id}
            >
              Удалить из администраторов
            </Button>
          </li>
          <li>
            <Button
              className={"BtnUserCardActions"}
              clickAction={onLeaveBoard}
              actionVariable={user.id}
            >
              Покинуть доску
            </Button>
          </li>
        </ul>

        <div style={{fontSize: '12px'}}>
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
            <span>count_admin_on_board = </span>
            <span>{roleData['count_admin_on_board']}</span>
          </p>
        </div>

      </div>
    </div>
  )
};
