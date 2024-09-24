import styles from './UserSmallCard.module.scss';

export default function UserSmallCard(props) {

  let user = props.user;

  return (
    <div className={styles.UserSmallCard}>
      <div className={styles.FullName}>
        {user.last_name} {user.first_name}
      </div>
      <div className={styles.UserName}>
        <div>@{user.username}</div>
        <div className={styles.PointSeparator}/>
        <div>{user.email}</div>
      </div>
    </div>
  )
};
