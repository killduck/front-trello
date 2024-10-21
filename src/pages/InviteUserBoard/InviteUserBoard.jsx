import { useEffect } from 'react'

import { useParams, useLocation } from 'react-router-dom';

import request from "../../api/request";

import styles from "./InviteUserBoard.module.scss";

export default function InviteUserBoard(props) {

  let { alias } = useParams();

  const URL = window.location;

  console.log('link>>>', alias);

  const location = useLocation();
  console.log('location>>>', `${URL.protocol}//${URL.hostname}/${location.pathname}`);

  useEffect(() => {

    request({
      method: 'POST',
      url: 'invit-board/pending-confirmations/',
      callback: (response) => {
        console.log('pending_confirmation>>>', response);
      },
      data: { alias },
      status: 200,
    });
  }, []);




  return (
    <div className={styles.InviteUserBoard}>
      <div className={styles.Wrap}>
        <div className={styles.Title}>
          Ваше приглашение на доску
        </div>
      </div>
    </div>
  )
};
