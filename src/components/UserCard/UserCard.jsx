import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';

import styles from './UserCard.module.scss';


export default function UserCard(props) {

  let user = props.user;

  let clickAction = props.clickAction;

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

      </div>
    </div>
  )
};
