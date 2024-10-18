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

import { setWindowModalReloadBlur, setWindowModalReloadState } from "../../main_state/states/windowModalReload";

import { setNewCardDescriptionState, setStartCardDescriptionState } from "../../main_state/states/description/cardDescriptionState";
import { setShowReactQuillState } from "../../main_state/states/description/showReactQuillState";
import { setNewNameField, setNewWindowName, setStatrtWindowName } from "../../main_state/states/modalHeader/windowName";
import { setMembersWindow, setShowUserCard } from "../../main_state/states/modalCardMember/modalCardMember";
import { setAuthUser, setAuthUserData, setCardUsers, setMatchSearch, setSearchNewCardUser } from "../../main_state/states/cardUsersState";
import { setCardLabelStatus, setShowLabelsWindow } from "../../main_state/states/modalCardLabel/modalCardLabel";
import { setDueDateCheckbox, setDueDateWindow } from "../../main_state/states/modalDueDate/modalDueDate";
import { setActivityEditorShow, setCardActivityComments } from "../../main_state/states/modalActivity/modalActivity";
import { setAddFiles, setAttachmentWindow, setCardFiles, setCardLinks, setNewLink, setNewLinkDesc, setShowCardOptions, setShowCardOptionsFileDel, setShowCardOptionsLinkDel, setShowCardOptionsLinkUpdate, setShowPreloderAttachmentWindow, setShowPreloderLink, setStartLink } from "../../main_state/states/modalAttachment/modalAttachment";
import { setShowCardDel } from "../../main_state/states/modalCardDel";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";


export default function WindowModal(props){
  // console.log(props);

  let dashboardUsers = props.dashboardUsers; //это прилетает из дашборда
  let typeElem = props.typeElem; //это прилетает из дашборда
  let idElem = Number(props.idElem); //это прилетает из дашборда
  let column = props.column; //это прилетает из дашборда
  let task = props.task; //это прилетает из дашборда
  let updateFunc = props.updateFunc; //это прилетает из дашборда
  let deleteFunc = props.deleteFunc; //это прилетает из дашборда
  let updateCardLabel = props.updateCardLabel; //это прилетает из дашборда
  let closeModal = props.closeModal; // ???
  let showPreloderLabel = props.showPreloderLabel; //это прилетает из дашборда
  let setShowPreloderLabel = props.setShowPreloderLabel; //это прилетает из дашборда


  // let [attachmentWindow, setAttachmentWindow] = useState(false); // глобально + 
  // const [showPreloderAttachmentWindow, setShowPreloderAttachmentWindow] = useState(false); // глобально + 

  // let [updateValue, setUpdateValue] = useState(false); // пока нужно
  
  // const [addFiles, setAddFiles] = useState([]);
  // const [cardFiles, setCardFiles] = useState(task.card_file);
  // const [showPreloderFile, setShowPreloderFile] = useState(false);

  // let [showCardOptions, setShowCardOptions] = useState(false);
  // const [cardLinks, setCardLinks] = useState(task.card_link);
  // let [newLink, setNewLink] = useState('');
  // let [startLink, setStartLink] = useState('');
  // let [newLinkDesc, setNewLinkDesc] = useState('');
  // let [startLinkDesc, setStartLinkDesc] = useState(''); 
  // const [showPreloderLink, setShowPreloderLink] = useState(false);

  // let [showCardOptionsFileDel, setShowCardOptionsFileDel] = useState(false);
  // let [showCardOptionsLinkDel, setShowCardOptionsLinkDel] = useState(false);
  // let [showCardOptionsLinkUpdate, setShowCardOptionsLinkUpdate] = useState(false);

  // const [showCardDel, setShowCardDel] = useState(false);
  
  const [dragActive, setDragActive] = useState(false);

  const windowData = useSelector((state) => state.windowData.value);
  console.log(windowData); 
  // const subscribeState = useSelector((state) => state.subscribeState.value); 
  // const cardUsers = useSelector((state) => state.cardUsersState.cardUsers); 
  // const authUser = useSelector((state) => state.cardUsersState.authUser); 
  const windowModalReloadState = useSelector((state) => state.windowModalReloadState.value); 
  console.log(windowModalReloadState);
  const windowModalReloadBlur = useSelector((state) => state.windowModalReloadState.blur); 
  console.log(windowModalReloadBlur); 

  const attachmentWindow = useSelector((state) => state.modalAttachmentState.attachmentWindow);
  const addFiles = useSelector((state) => state.modalAttachmentState.addFiles);
  const cardFiles = useSelector((state) => state.modalAttachmentState.cardFiles); 
  const cardLinks = useSelector((state) => state.modalAttachmentState.cardLinks); 
  const startLink = useSelector((state) => state.modalAttachmentState.startLink); 
  const newLink = useSelector((state) => state.modalAttachmentState.newLink); 
  const newLinkDesc = useSelector((state) => state.modalAttachmentState.newLinkDesc); 

  

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('110'); 
    dispatch(setWindowModalReloadState(true));
    console.log('112'); 
    request({
      method:'POST',
      url:`take-data-card/`,
      callback:(response) => { 
        if (response.status === 200) {
          console.log(response);
          setTimeout(() => {

            if(response.data){
              console.log(response.data);

              // setAuthUser(response.data.auth_user);
              dispatch(setAuthUser(response.data.auth_user));

              // setWindowName(response.data.card[0]['name']);
              dispatch(setNewWindowName(response.data.card[0]['name']));
              // setStartWindowName(response.data.card[0]['name']);
              dispatch(setStatrtWindowName(response.data.card[0]['name']));

              dispatch(setWindowData(response.data.card[0]));
            
              dispatch(setCardUsers(response.data.card_users_data));
              
              // setSubscribe(response.data.card_users_data.filter((cardUser) => cardUser.id === response.data.auth_user).length);
              dispatch(setSubscribeState(
                response.data.card_users_data.filter(
                  (cardUser) => cardUser.id === response.data.auth_user).length
                )
              );
              
              // setValueDescription(response.data.card[0]['description']); 
              dispatch(setStartCardDescriptionState(response.data.card[0]['description']));
              // setCardDescription(response.data.card[0]['description']); 
              dispatch(setNewCardDescriptionState(response.data.card[0]['description']));

              // setAuthUserData((dashboardUsers.filter((cardUser) => cardUser.id === response.data.auth_user))[0]);
              dispatch(setAuthUserData((dashboardUsers.filter((cardUser) => cardUser.id === response.data.auth_user))[0]));

              // console.log(response.data.card[0].activity);
              dispatch(setCardActivityComments(response.data.card[0].activity));
              // setCardActivityComments(response.data.card[0].activity.reverse());
              
              // setDueDateCheckbox(response.data.card[0]['execute']);
              dispatch(setDueDateCheckbox(response.data.card[0]['execute']));

              dispatch(setCardFiles(response.data.card[0]['card_file']));
              dispatch(setCardLinks(response.data.card[0]['card_link']));
              
              dispatch(setWindowModalReloadState(false));

            }
            if(task.label){
              // setCardLabel(true);
              dispatch(setCardLabelStatus(true));
            }
            if(windowModalReloadBlur){
              dispatch(onRemoving_onFrames());
              dispatch(setWindowModalReloadBlur(false));
            }

          }, 1000)
        }
      },
      data: {'id': idElem},
      status:200,
    });
  },[typeElem, idElem, task, dashboardUsers, dispatch]);
  console.log('179'); 

  // function onRemoving_onFrames(){
  //   // setNewNameField(false); 
  //   dispatch(setNewNameField(false));

  //   // setMembersWindow(false); 
  //   dispatch(setMembersWindow(false));
  //   dispatch(setMatchSearch(''));
  //   dispatch(setSearchNewCardUser([]));

  //   // setLabelsWindow(false); 
  //   dispatch(setShowLabelsWindow(false));

  //   // setDueDateWindow(false); 
  //   dispatch(setDueDateWindow(false));

  //   // setShowReactQuill(false); 
  //   dispatch(setShowReactQuillState(false));

  //   // setShowUserCard(null); 
  //   dispatch(setShowUserCard(null));

  //   // setActivityEditorShow(null); 
  //   dispatch(setActivityEditorShow(null));  

  //   dispatch(setAttachmentWindow(false));
  //   dispatch(setShowCardOptions(false));
  //   dispatch(setShowCardOptionsFileDel(false));
  //   dispatch(setShowCardOptionsLinkUpdate(false));
  //   dispatch(setShowCardOptionsLinkDel(false));
  //   dispatch(setShowCardDel(false));
  // }

  // const handleChangeAddFiles = (evt) => {
  //   evt.preventDefault();
  //   console.log(evt, addFiles);
  //   if(evt.target.files && evt.target.files[0]){
  //     setAddFiles(evt.target.files);
  //   }
  // }

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

  const handleAddFilesReset = (evt) => {
    // evt.preventDefault();
    // console.log('проверка сброса >>> setAddFiles');
    dispatch(setNewLink('')); 
    dispatch(setNewLinkDesc(''));
    dispatch(setAddFiles([]));
  }

  const handleAddFilesSubmit = () => {
    console.log(newLink, newLinkDesc, startLink);

    if(addFiles.length === 0 && newLink.length === 0 && newLinkDesc.length === 0){
      console.log('return');
      funcAttachmentWindow();
      return;
    }

    console.log(`'201', 'newLink =>' ${newLink}, 'newLinkDesc =>' ${newLinkDesc}, 'startLink =>' ${startLink.id}`);
    // console.log(startLink.hasOwnProperty('id'));

    // funcAttachmentWindow();
    if(newLink === startLink.text && newLinkDesc === startLink.description){
      // console.log(newLink, newLinkDesc, startLink);
      // funcAttachmentWindow();
      return;
    }

    if(attachmentWindow !== 'link'){
      // setAttachmentWindow(false);
      dispatch(setStartLink(''));
    }

    const formData = new FormData();

    formData.append("card_id", idElem);

    formData.append('link_id', startLink.hasOwnProperty('id') ? startLink.id : startLink);
    formData.append('link', newLink);
    formData.append('linkDesc', newLinkDesc);

    if(addFiles.length > 0){
      Array.from(addFiles).forEach((file) => {
        formData.append('file', file);
      });
    }
    else{
      formData.append('file', addFiles);
    }

    dispatch(setShowPreloderLink(startLink.id));
    dispatch(setShowPreloderAttachmentWindow(true));

    request({
      method: 'POST',
      url: 'add-file-and-link-to-card/',
      callback: (response) => {
        setTimeout(() => {
          if (response.status === 200) {
            console.log(response.data);
            dispatch(setShowPreloderLink(false));
            dispatch(setShowPreloderAttachmentWindow(false));
            funcAttachmentWindow();
            dispatch(setNewLink(''));
            dispatch(setNewLinkDesc(''));
            dispatch(setStartLink(''));
            dispatch(setCardLinks(response.data.card_link));
            dispatch(setCardFiles(response.data.card_file));
          }
        }, 1000);
      },
      data: formData,
      status: 200,
      content_type: "multipart/form-data",
    });
  }

  // function onDownloadCardFile(file){
  //   if(showPreloderFile){ 
  //     return;
  //   }
  //   setShowPreloderFile(file.id); 
  //   onRemoving_onFrames();

  //   request({
  //     method: 'POST',
  //     url: 'download-file-from-card/',
  //     callback: (response) => {
  //       if (response.status === 200) {
  //         // console.log(response.data);
  //         setShowPreloderFile(false);
  //         // create file link in browser's memory
  //         const href = URL.createObjectURL(response.data);
  //         // create "a" HTML element with href to file & click
  //         const link = document.createElement('a');
  //         link.href = href;
  //         link.setAttribute('download', file.name); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //         // clean up "a" element & remove ObjectURL
  //         document.body.removeChild(link);
  //         URL.revokeObjectURL(href);

  //         funcShowAttachmentContentCardOptions(false);
  //         setUpdateValue(true);//пока нужно
  //         // dispatch(setWindowModalReloadState(true));
  //       }
  //     },
  //     data: {'card_id': idElem, 'file_id': file.id},
  //     status: 200,
  //     response_type: 'blob',
  //   });
  // }

  // function onDeleteCardFile(file_id){
  //   if(showPreloderFile){ 
  //     return;
  //   }
  //   setShowPreloderFile(file_id);
  //   onRemoving_onFrames();
  //   request({
  //     method: 'POST',
  //     url: 'del-file-from-card/',
  //     callback: (response) => {
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         setShowPreloderFile(false);

  //         setCardFiles(response.data.card_file);
  //         funcShowAttachmentContentCardOptions(false);
  //         setUpdateValue(true);//пока нужно
  //         // dispatch(setWindowModalReloadState(true));
  //       }
  //     },
  //     data: {'card_id': idElem, 'file_id': file_id},
  //     status: 200,
  //   });
  // }

  // function funcShowDeleteCardFile(file_id){
  //   onRemoving_onFrames();
  //   if(showCardOptionsFileDel){
  //     setShowCardOptionsFileDel(false); 
  //   }
  //   else{
  //     setShowCardOptionsFileDel(showCardOptionsFileDel = file_id);
  //   }
  // }
  

  // function onDeleteCardLink(link_id){
  //   if(showPreloderLink){ 
  //     return;
  //   }
  //   setShowPreloderLink(link_id);
  //   onRemoving_onFrames();

  //   request({
  //     method: 'POST',
  //     url: 'del-link-from-card/',
  //     callback: (response) => {
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         setShowPreloderLink(false);
  //         setCardLinks(response.data.card_link);
  //         funcShowAttachmentContentCardOptions(false);
  //         setUpdateValue(true);//пока нужно
  //         // dispatch(setWindowModalReloadState(true));
  //       }
  //     },
  //     data: {'card_id': idElem, 'link_id': link_id},
  //     status: 200,
  //   });
  // }
  
  // function funcShowAttachmentContentCardOptions(elem_id){
  //   onRemoving_onFrames();
  //   if(showCardOptions){ 
  //     setShowCardOptions(false);
  //   }
  //   else{
  //     setShowCardOptions(showCardOptions = elem_id);
  //   }
  //   // setShowCardOptions(showCardOptions = elem_id);

  // }

  // function funcShowDeleteCardLink(link_id){
  //   onRemoving_onFrames();
  //   if(showCardOptionsLinkDel){
  //     setShowCardOptionsLinkDel(false);
  //   }
  //   else{
  //     setShowCardOptionsLinkDel(showCardOptionsLinkDel = link_id);
  //   }
  // }

  // function funcShowUpdateCardLink(link_all){
  //   console.log(link_all);
  //   onRemoving_onFrames();
  //   if(attachmentWindow){
  //     setAttachmentWindow(false);
  //   }
  //   else{
  //     setStartLink(startLink = link_all); 

  //     setNewLink(newLink = link_all.text); 
  //     setNewLinkDesc(newLinkDesc = link_all.description); 

  //     // writeNewLink(link_all.text);
  //     // writeNewLinkDesc(link_all.description);
  //     setAttachmentWindow(attachmentWindow = 'link');
  //   }
  // }



  // function onDelWindow(comment_id){ 
  //   if(delWindow){
  //     setDelWindow(false);
  //   }
  //   else{
  //     setDelWindow(comment_id);
  //   }
  // }

  // function onDelActivityReactQuillComment(comment_data){
  //   // console.log(comment_id);
  //   setDelWindow(false);
  //   setProcessActivity(comment_data.date);
  //   request({
  //     method:'POST',
  //     url:'del-card-activity/',
  //     callback:(response) => { 
  //       if (response.status === 200) {
  //         setProcessActivity(false);
  //         setCardActivityComments(cardActivityComments.filter((comment) => comment.id !== comment_data.id));
  //       }
  //     },
  //     data: {'comment_id': comment_data.id},
  //     status:200,
  //   });
  // }

  // function onSaveActivityReactQuillComment(date){
  //   if(valueEditor === '<p><br></p>'){
  //     setValueEditor(valueEditor = null);
  //   } 

  //   if(cardActivity === valueEditor){
  //     setValueEditor(valueEditor = null)
  //     funcActivityEditorShow();
  //     return;
  //   }

  //   if(valueEditor !== cardActivity){
  //     setProcessActivity(date);
  //     request({
  //       method:'POST',
  //       url:'add-card-activity/',
  //       callback:(response) => { 
  //         if (response.status === 200) {
  //           setProcessActivity(false);
  //           if(response.data){
  //             // console.log(response.data);
  //             setCardActivityComments(response.data);
  //             setValueEditor('');
  //           }
  //         }
  //       },
  //       data: {'find_by_date': date, 'card_id': windowData.id, 'author_id': authUser, 'comment': valueEditor.trim(),}, //valueEditor.trim().slice(0, -11)
  //       status:200,
  //     });
  //   }
  //   funcActivityEditorShow();
  // }

  // function showActivityReactQuillHandleKeyPress(evt, date){
  //   if(evt.key === 'Enter' && evt.shiftKey){
  //     setValueEditor(valueEditor = valueEditor.trim().slice(0, -11));
  //     onSaveActivityReactQuillComment(date);
  //   }
  // }

  // function funcActivityDetailsShow(){
  //   onRemoving_onFrames();
  //   if(activityDetailsShow){
  //     setActivityDetailsShow(false);
  //   }
  //   else{
  //     setActivityDetailsShow(true);
  //   }
  // }

  // function funcActivityEditorShow(comment_id = null, commentStartValue){
  //   onRemoving_onFrames();
  //   if(activityEditorShow === comment_id){
  //     setActivityEditorShow(null);
  //   }
  //   else{
  //     setActivityEditorShow(comment_id);
  //     setCardActivity(commentStartValue);
  //     setValueEditor(commentStartValue);
  //   }
  // }

  // function funcDueDateWindow(){
  //   onRemoving_onFrames();

  //   if(dueDateWindow){
  //     setDueDateWindow(false);
  //   }
  //   else{
  //     setDueDateWindow(dueDateWindow = true);
  //   }
  // }

  // function writeNewLinkDesc(evt) { 
  //   console.log(evt);
  //   setNewLinkDesc(evt);
  //   console.log(newLinkDesc);
  // }

  // const newLinkDescHandleKeyPress = (evt) => {
  //   if(evt.key === 'Enter' && evt.shiftKey){ 
  //     console.log(newLinkDesc, startLink.description);
      
  //     handleAddFilesSubmit();
  //   }
  // }

  // function writeNewLink(evt) {
  //   setNewLink(newLink = evt);
  // }

  // const newLinkHandleKeyPress = (evt) => {
  //   if(evt.key === 'Enter' && evt.shiftKey){
      
  //     handleAddFilesSubmit();
  //   }
  // }

  function funcAttachmentWindow(){ 
    dispatch(onRemoving_onFrames());
    if(attachmentWindow){
      dispatch(setNewLink('')); 
      dispatch(setNewLinkDesc(''));

      dispatch(setAddFiles([]));
      dispatch(setAttachmentWindow(false));
    }
    else{
      dispatch(setAttachmentWindow(true));
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
        onReset={handleAddFilesReset}
        onSubmit={handleAddFilesSubmit}
      >
          {props.children}

          {/* header */}
          <WindowModalHeaderSection
            // onRemoving_onFrames={onRemoving_onFrames}
            updateFunc={updateFunc} //это прилетает из дашборда
            column={column} //это прилетает из дашборда
          />

          {/* главная колонка */}
          <div className={styles.mainCol}>
            <div className={styles.cardDetails} >
              
              <div className={styles.cardDetailItem}>
                <WindowModalCardMember
                  // onRemoving_onFrames={onRemoving_onFrames}
                />
              </div>

              <div className={styles.cardDetailItem}>
                <WindowModalCardLabel
                  task={task} //это прилетает из дашборда
                  // onRemoving_onFrames={onRemoving_onFrames}
                />
              </div>

              <div className={styles.cardDetailItem}>
                <WindowModalSubscribe
                  // onRemoving_onFrames={onRemoving_onFrames}
                />
              </div>

              <div className={styles.cardDetailItem}>
                <WindowModalDueDate
                  // onRemoving_onFrames={onRemoving_onFrames}
                />
              </div>
              
            </div>

            <WindowModalDescription 
              // onRemoving_onFrames={onRemoving_onFrames}
            />

            {(cardFiles.length > 0 || cardLinks.length > 0) &&
              <WindowModalAttachment 
                // onRemoving_onFrames={onRemoving_onFrames}
              />
            }

            <WindowModalActivity
              // onRemoving_onFrames={onRemoving_onFrames}
            />
          </div>

          <Sidebar
            deleteFunc={deleteFunc} //это прилетает из дашборда
            closeModal={closeModal} //это прилетает из дашборда
            dashboardUsers={dashboardUsers} //это прилетает из дашборда
            updateCardLabel={updateCardLabel} //это прилетает из дашборда
            showPreloderLabel={showPreloderLabel} //это прилетает из дашборда
            setShowPreloderLabel={setShowPreloderLabel} //это прилетает из дашборда

            handleAddFilesReset={handleAddFilesReset} // пока тут
            handleAddFilesSubmit={handleAddFilesSubmit} // пока тут

            // onRemoving_onFrames={onRemoving_onFrames}
            
          ></Sidebar>
      </div>)
    }
    </>
  )
};

