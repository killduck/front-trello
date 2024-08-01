import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';

import styles from './UserCard.module.scss';


export default function UserCard(props) {
  // console.log(props);
  let user = props.user;
  let clickAction = props.clickAction;
  let funcDelCardUser = props.funcDelCardUser;
  let class_name = props.class_name;

  function onChangeProfile(id_user) {
    console.log('Проверка выполения функции =>', onChangeProfile.name, id_user);
  }

  function onToProfile(id_user) {
    console.log('Проверка выполения функции =>', onToProfile.name, id_user);
  }

  return (
    <div className={class_name ? `${styles[class_name]}` : `${styles.UserCard}`}>
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
          <li>
            {(user.is_superuser)?(
              <Button
                className={"BtnUserCardActions"}
                clickAction={onChangeProfile}
                actionVariable={user.id}
              >
                Изменить профиль
              </Button>
            ):(
              <Button
                className={"BtnUserCardActions"}
                clickAction={onToProfile}
                actionVariable={user.id}
              >
                Перейти в профиль
              </Button>
            )}
          </li>
          <li>
            <Button
              className={"BtnUserCardActions"}
              clickAction={funcDelCardUser}
              actionVariable={user.id}
            >
              Удалить из карточки
            </Button>
          </li>
        </ul>

      </div>
    </div>
  )
};
