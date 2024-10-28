import { useEffect, useState } from 'react'

import { useParams, useLocation } from 'react-router-dom';

import request from "../../api/request";

import styles from "./InviteUserBoard.module.scss";

export default function InviteUserBoard(props) {

  let { alias } = useParams();

  let [statusConfirm, setStatusConfirm] = useState(false);

  let [data, setData] = useState({});

  const location = useLocation();

  const URL = window.location;

  const FULL_URL = `${URL.protocol}${URL.hostname}${location.pathname}`;

   useEffect(() => {

    request({
      method: 'POST',
      url: 'invit-board/pending-confirmations/',
      callback: (response) => {
        console.log('pending_confirmation>>>', response);
        if (response.data.status) {

          setStatusConfirm(true);

          setData({
            board_name: response.data.board_name,
          });

        }
      },
      data: { alias },
      status: 200,
    });
  }, []);




  return (
    <div className={styles.InviteUserBoard}>
      <div className={styles.Wrap}>

        {
          statusConfirm ?
            <div className={styles.Title}>
              <div>Ваше приглашение на доску</div>
              <div className={styles.Link}>"{data.board_name}"</div>
              <div>подтверждено!!!</div>
            </div>
            :
            <div className={styles.Title}>
              <div>Ваше приглашение на доску</div>
              <div className={styles.Link}>{FULL_URL}</div>
              <div>протухло</div>

            </div>
        }
      </div>
    </div>
  )
};
