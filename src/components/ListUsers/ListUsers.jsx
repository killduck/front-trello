import { useEffect, useState } from 'react'

import request from "../../api/request";

import UserSmallCard from '../UserSmallCard/UserSmallCard';

import styles from './ListUsers.module.scss';


export default function ListUsers(props) {

  let dashboardId = props.dashboardId;

  let SubmitFormShare = props.SubmitFormShare;

  let [invitedUsers, setInvitedUsers] = useState([]);


  useEffect(() => {

    request({
      method: 'POST',
      url: 'invit-board/list-invited-users/',
      callback: (response) => {
        console.log('list-invited-users>>>', response.data);
        setInvitedUsers(response.data);
      },
      data: { dashboardId },
      status: 200,
    });
  }, [SubmitFormShare]);

  return (
    <div className={styles.ListUsers}>

      {
        invitedUsers.map((user) => (
          <div className={styles.User} key={user.id}>
            <UserSmallCard
              user={user}
            />
          </div>
        ))
      }

    </div>
  )
};
