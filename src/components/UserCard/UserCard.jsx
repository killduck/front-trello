import styles from './UserCard.module.scss';

export default function UserCard(props) {

  let user = props.user;

  return (
    <div
      className={styles.UserCard}
    >
      {user.username}
    </div>
  )
};
