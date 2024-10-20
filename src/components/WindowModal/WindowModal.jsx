import styles from "./WindowModal.module.scss";
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import "./windowQuill.css";
import request from "../../api/request";
import Sidebar from "../Sidebar/Sidebar";
import WindowModalDescription from "../WindowModalDescription/WindowModalDescription";
import WindowModalActivity from "../WindowModalActivity/WindowModalActivity";
import WindowModalSubscribe from "../WindowModalSubscribe/WindowModalSubscribe";
import WindowModalHeaderSection from "../WindowModalHeaderSection/WindowModalHeaderSection";
import WindowModalCardLabel from "../WindowModalCardLabel/WindowModalCardLabel";
import WindowModalCardMember from "../WindowModalCardMember/WindowModalCardMember";
import WindowModalDueDate from "../WindowModalDueDate/WindowModalDueDate";
import WindowModalAttachment from "../WindowModalAttachment/WindowModalAttachment";

import { useDispatch, useSelector } from "react-redux";

import { setWindowData } from "../../main_state/states/windowData";
import { setSubscribeState } from "../../main_state/states/subscribeState";
import { 
  setWindowModalReloadBlur, 
  setWindowModalReloadState } from "../../main_state/states/windowModalReload";
import { 
  setNewCardDescriptionState, 
  setStartCardDescriptionState } from "../../main_state/states/description/cardDescriptionState";
import { 
  setNewWindowName, 
  setStatrtWindowName } from "../../main_state/states/modalHeader/windowName";
import { 
  setAuthUser, 
  setAuthUserData, 
  setCardUsers } from "../../main_state/states/cardUsersState";
import { setCardLabelStatus } from "../../main_state/states/modalCardLabel/modalCardLabel";
import { setDueDateCheckbox } from "../../main_state/states/modalDueDate/modalDueDate";
import { setCardActivityComments } from "../../main_state/states/modalActivity/modalActivity";
import { 
  setAddFiles, 
  setAttachmentWindow, 
  setCardFiles, 
  setCardLinks } from "../../main_state/states/modalAttachment/modalAttachment";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";


export default function WindowModal(props){

  let dashboardUsers = props.dashboardUsers; //это прилетает из дашборда
  let typeElem = props.typeElem; //это прилетает из дашборда
  let idElem = Number(props.idElem); //это прилетает из дашборда
  let column = props.column; //это прилетает из дашборда
  let task = props.task; //это прилетает из дашборда
  let updateFunc = props.updateFunc; //это прилетает из дашборда
  let deleteFunc = props.deleteFunc; //это прилетает из дашборда
  let updateSetCardLabel = props.updateSetCardLabel; //это прилетает из дашборда
  let closeModal = props.closeModal; // это прилетает из WindowPortal
  
  const [dragActive, setDragActive] = useState(false);

  const windowModalReloadState = useSelector((state) => state.windowModalReloadState.value); 
  const windowModalReloadBlur = useSelector((state) => state.windowModalReloadState.blur); 
  const cardFiles = useSelector((state) => state.modalAttachmentState.cardFiles); 
  const cardLinks = useSelector((state) => state.modalAttachmentState.cardLinks); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWindowModalReloadState(true));

    request({
      method:'POST',
      url:`take-data-card/`,
      callback:(response) => { 
        if (response.status === 200) {
          if(response.data){
            dispatch(setAuthUser(response.data.auth_user));
            dispatch(setNewWindowName(response.data.card[0]['name']));
            dispatch(setStatrtWindowName(response.data.card[0]['name']));
            dispatch(setWindowData(response.data.card[0]));
            dispatch(setCardUsers(response.data.card_users_data));
            dispatch(setSubscribeState(
              response.data.card_users_data.filter(
                (cardUser) => cardUser.id === response.data.auth_user).length
              )
            );
            dispatch(setStartCardDescriptionState(response.data.card[0]['description']));
            dispatch(setNewCardDescriptionState(response.data.card[0]['description']));
            dispatch(setAuthUserData(
              (dashboardUsers.filter((cardUser) => cardUser.id === response.data.auth_user))[0])
            );
            dispatch(setCardActivityComments(response.data.card[0].activity));
            dispatch(setDueDateCheckbox(response.data.card[0]['execute']));
            dispatch(setCardFiles(response.data.card[0]['card_file']));
            dispatch(setCardLinks(response.data.card[0]['card_link']));
            dispatch(setWindowModalReloadState(false));
          }
          if(task.label){
            dispatch(setCardLabelStatus(true));
          }
          if(windowModalReloadBlur){
            dispatch(onRemoving_onFrames());
            dispatch(setWindowModalReloadBlur(false));
          }
        }
      },
      data: {'id': idElem},
      status:200,
    });
  },[typeElem, idElem, task, dashboardUsers, dispatch]);

  const handleDragAddFiles = (evt) => {
    evt.preventDefault();
    setDragActive(true);
  }
  const handleDragLeaveAddFiles = (evt) => {
    evt.preventDefault();
    setDragActive(false);
  }
  const handleDragDropAddFiles = (evt) => {
    evt.preventDefault();

    dispatch(setAttachmentWindow(true));
    setDragActive(false);
    if(evt.dataTransfer.files && evt.dataTransfer.files[0]){
      dispatch(setAddFiles(evt.dataTransfer.files));
    }
  }

  return (
    <>
    {windowModalReloadState ? (
      <div className={`${styles.wrap} ${styles.wimdowModalGradient}`}>
        {props.children}
        <WindowModalHeaderSection 
          column={column} //это прилетает из дашборда
        />
      </div>
      ):(
      <div 
        className={`${styles.wrap} ${dragActive ? styles.dragging : ""}`} 
        onDragEnter={handleDragAddFiles}
        onDragOver={handleDragAddFiles}
        onDragLeave={handleDragLeaveAddFiles}
        onDrop={handleDragDropAddFiles}
        // onReset={handleAddFilesReset}
        // onSubmit={handleAddFilesSubmit}
      >
          {props.children}

          {/* header */}
          <WindowModalHeaderSection
            updateFunc={updateFunc} //это прилетает из дашборда
            column={column} //это прилетает из дашборда
          />

          {/* главная колонка */}
          <div className={styles.mainCol}>
            <div className={styles.cardDetails} >
              
              <div className={styles.cardDetailItem}>
                <WindowModalCardMember />
              </div>

              <div className={styles.cardDetailItem}>
                <WindowModalCardLabel
                  task={task} //это прилетает из дашборда
                />
              </div>

              <div className={styles.cardDetailItem}>
                <WindowModalSubscribe />
              </div>

              <div className={styles.cardDetailItem}>
                <WindowModalDueDate />
              </div>
              
            </div>

            <WindowModalDescription />

            {(cardFiles.length > 0 || cardLinks.length > 0) &&
              <WindowModalAttachment />
            }

            <WindowModalActivity />
          </div>

          <Sidebar
            deleteFunc={deleteFunc} //это прилетает из дашборда
            dashboardUsers={dashboardUsers} //это прилетает из дашборда
            updateSetCardLabel={updateSetCardLabel} //это прилетает из дашборда
            closeModal={closeModal} //это прилетает из WindowPortal
          />

      </div>)
    }
    </>
  )
};

