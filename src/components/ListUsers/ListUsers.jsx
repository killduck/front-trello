import { useEffect, useState } from 'react'

import request from "../../api/request";

import styles from './ListUsers.module.scss';

export default function ListUsers(props) {

  let dashboardId = props.dashboardId;


  // useEffect(() => {
  //   request({
  //     method: 'POST',
  //     url: 'invit-board/select-users/',
  //     callback: (response) => {
  //     },
  //     data: {},
  //     status: 200,
  //   });
  // }, []);

  return(
    <div className={styles.ListUsers}>

    </div>

  )
};
