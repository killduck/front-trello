import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';

import styles from './UserDashboard.module.scss';


export default function UserDashboard(props) {
  // console.log(props);
  let user = props.user;
  let clickAction = props.clickAction;
  // let funcDelCardUser = props.funcDelCardUser;
  let class_name = props.class_name;

  function onAddAdmin(id_user) {
    console.log('Проверка выполения функции =>', onAddAdmin.name, id_user);
  }

  function onDelAdmin(id_user) {
    console.log('Проверка выполения функции =>', onDelAdmin.name, id_user);
  }


  function onLeaveBoard(id_user) {
    console.log('Проверка выполения функции =>', onLeaveBoard.name, id_user);
  }


  return (
    <div className={class_name ? `${styles[class_name]}` : `${styles.UserDashboard}`}>
      <div className={styles.UserDashboardWrap}>

        <div className={styles.UserDashboardButton}>
          <Button
            clickAction={clickAction}
            actionVariable={user.id}
            className={"BtnCloseUserDashboard"}
          >
            <Icons
              name={'CloseIcon'}
              class_name={'IconCloseUserDashboard'}
            />
          </Button>
        </div>

        <div className={styles.UserDashboardInfoUser}>
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

        <ul className={styles.UserDashboardActions} >
          <li>
            <Button
              className={"BtnUserDashboardActions"}
              clickAction={onAddAdmin}
              actionVariable={user.id}
            >
              Добавить на доску как администратора
            </Button>
          </li>
          <li>
            <Button
              className={"BtnUserDashboardActions"}
              clickAction={onDelAdmin}
              actionVariable={user.id}
            >
              Удалить из администраторов
            </Button>
          </li>
          <li>
            <Button
              className={"BtnUserDashboardActions"}
              clickAction={onLeaveBoard}
              actionVariable={user.id}
            >
              Покинуть доску
            </Button>
          </li>
        </ul>

      </div>
    </div>
  )
};
