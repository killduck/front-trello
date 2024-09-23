
import styles from "./WindowModal.module.scss";

import { useCallback, useEffect, useState } from 'react';

// import ReactQuill from 'react-quill'; // старый, нужно будет стереть, но пусть пока будет.
// import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import "./windowQuill.css";

import request from "../../api/request";
import Sidebar from "../Sidebar/Sidebar";
// import { Interweave } from "interweave";
import WindowModalDescription from "../WindowModalDescription/WindowModalDescription";
import WindowModalActivity from "../WindowModalActivity/WindowModalActivity";
import WindowModalSubscribe from "../WindowModalSubscribe/WindowModalSubscribe";
import WindowModalHeaderSection from "../WindowModalHeaderSection/WindowModalHeaderSection";
import WindowModalCardLabel from "../WindowModalCardLabel/WindowModalCardLabel";
import WindowModalCardMember from "../WindowModalCardMember/WindowModalCardMember";
import WindowModalDueDate from "../WindowModalDueDate/WindowModalDueDate";
import WindowModalAttachment from "../WindowModalAttachment/WindowModalAttachment";
// import axios from "axios";
// import { URL_API, URL_ENDPOINT } from './config'
// import { redirect, redirect_status404 } from './redirect'

export default function WindowModal(props){
  console.log(props);

  let dashboardUsers = props.dashboardUsers;
  let typeElem = props.typeElem;
  let idElem = Number(props.idElem);
  let column = props.column;
  let task = props.task;
  let updateFunc = props.updateFunc;
  let deleteFunc = props.deleteFunc;
  let updateCardLabel = props.updateCardLabel;
  let closeModal = props.closeModal;
  let showPreloderLabel = props.showPreloderLabel;
  let setShowPreloderLabel = props.setShowPreloderLabel;

  const [authUser, setAuthUser] = useState(Number);
  const [authUserData, setAuthUserData] = useState(Number);

  let [windowData, setWindowData] = useState({});
  const [startWindowName, setStartWindowName] = useState('');
  let [windowName, setWindowName] = useState('');
  let [newName, setNewNameField] = useState(false);
  let [membersWindow, setMembersWindow] = useState(false);
  let [cardUsers, setCardUsers] = useState([]);
  const [matchSearch, setMatchSearch]=useState('');
  let [searchNewCardUser, setSearchNewCardUser]=useState([]);
  const [showPreloderAddMember, setShowPreloderAddMember] = useState(false);
  const [showPreloderDelMember, setShowPreloderDelMember] = useState(false);


  let [subscribe, setSubscribe] = useState(false);
  let [showUserCard, setShowUserCard] = useState(null);

  let [labelsWindow, setLabelsWindow] = useState(false);
  const [cardLabel, setCardLabel] = useState(false);
  
  let [showReactQuill, setShowReactQuill] = useState(false);
  let [valueDescription, setValueDescription] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  let [activityDetailsShow, setActivityDetailsShow] = useState(true);
  let [activityEditorShow, setActivityEditorShow] = useState(null);
  let [cardActivityComments, setCardActivityComments] = useState([]);
  let [valueEditor, setValueEditor] = useState('');
  const [cardActivity, setCardActivity] = useState('<p><br></p>');
  const [processActivity, setProcessActivity] = useState(false);
  const [delWindow, setDelWindow] = useState(false); 

  let [dueDateWindow, setDueDateWindow] = useState(false);
  let [dueDateCheckbox, setDueDateCheckbox] = useState(false);

  let [attachmentWindow, setAttachmentWindow] = useState(false); 
  const [showPreloderAttachmentWindow, setShowPreloderAttachmentWindow] = useState(false);

  let [updateValue, setUpdateValue] = useState(false);
  
  const [addFiles, setAddFiles] = useState([]);
  const [cardFiles, setCardFiles] = useState(task.card_file);
  const [showPreloderFile, setShowPreloderFile] = useState(false);

  let [showCardOptions, setShowCardOptions] = useState(false);
  const [cardLinks, setCardLinks] = useState(task.card_link);
  let [newLink, setNewLink] = useState('');
  let [startLink, setStartLink] = useState('');
  let [newLinkDesc, setNewLinkDesc] = useState('');
  let [startLinkDesc, setStartLinkDesc] = useState(''); 
  const [showPreloderLink, setShowPreloderLink] = useState(false);

  let [showCardOptionsFileDel, setShowCardOptionsFileDel] = useState(false);
  let [showCardOptionsLinkDel, setShowCardOptionsLinkDel] = useState(false);
  let [showCardOptionsLinkUpdate, setShowCardOptionsLinkUpdate] = useState(false);
  

  const [dragActive, setDragActive] = useState(false);

  const handleChangeAddFiles = (evt) => {
    // setAddFiles([]);
    evt.preventDefault();
    console.log(evt, addFiles);
    if(evt.target.files && evt.target.files[0]){
      // setAddFiles(...addFiles, evt.target.files);
      setAddFiles(evt.target.files);

      console.log(addFiles);

    }
  }

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
    // console.log(evt);
    setAttachmentWindow(true);
    setDragActive(false);
    if(evt.dataTransfer.files && evt.dataTransfer.files[0]){
      setAddFiles(evt.dataTransfer.files);
    }
  }

  const handleAddFilesReset = (evt) => {
    // evt.preventDefault();
    console.log('проверка сброса >>> setAddFiles');
    setNewLink(''); 
    setNewLinkDesc('');
    setAddFiles([]);
  }

  const handleAddFilesSubmit = () => {
    // evt.preventDefault();
    console.log('проверка добавления >>> setAddFiles');
    console.log(addFiles, newLink, newLinkDesc);

    if(addFiles.length === 0 && newLink.length === 0 && newLinkDesc.length === 0){
      console.log('return');
      funcAttachmentWindow();
      return;
    }
    const formData = new FormData();

    formData.append("card_id", idElem);

    formData.append('link_id', startLink);
    formData.append('link', newLink);
    formData.append('linkDesc', newLinkDesc);

    if(addFiles.length > 0){
      Array.from(addFiles).forEach((file) => {
        // console.log(file);
        formData.append('file', file);
      });
    }
    else{
      formData.append('file', addFiles);
    }

    // for (let key of formData.entries()) {
		// 	console.log(key[0], key[1]);
    //   // console.log(key);
		// }
    // console.log(formData);

    setShowPreloderAttachmentWindow(true);

    request({
      method: 'POST',
      url: 'add-file-and-link-to-card/',
      callback: (response) => {
        setTimeout(() => {
          if (response.status === 200) {
            console.log(response.data);
            setShowPreloderAttachmentWindow(false);

            funcAttachmentWindow();
            // setAddFiles(response.data); 
            setNewLink(''); 
            setNewLinkDesc(''); 
            setCardFiles(response.data.card_file);
            setUpdateValue(true);
          }
        }, 1000);
      },
      // data: { 'card_id': idElem, 'file': formData },
      data: formData,
      status: 200,
    });
  }

  function onDeleteCardFile(file_id){
    console.log(file_id);
    if(showPreloderFile){ 
      return;
    }
    setShowPreloderFile(file_id);
    onRemoving_onFrames();
    request({
      method: 'POST',
      url: 'del-file-from-card/',
      callback: (response) => {
        setTimeout(() => {
          
          if (response.status === 200) {
            console.log(response.data);
            setShowPreloderFile(false);

            setCardFiles(response.data.card_file);
            funcShowAttachmentContentCardOptions(false);
            setUpdateValue(true);
          }

        }, 1000);
      },
      data: {'card_id': idElem, 'file_id': file_id},
      status: 200,
    });
  }

  function funcShowDeleteCardFile(file_id){
    onRemoving_onFrames();

    if(showCardOptionsFileDel){
      setShowCardOptionsFileDel(false); 
    }
    else{
      setShowCardOptionsFileDel(showCardOptionsFileDel = file_id);
    }
  }
  

  function onDeleteCardLink(link_id){
    console.log(link_id);
    if(showPreloderLink){ 
      return;
    }
    setShowPreloderLink(link_id);
    onRemoving_onFrames();

    request({
      method: 'POST',
      url: 'del-link-from-card/',
      callback: (response) => {
        setTimeout(() => {
          
          if (response.status === 200) {
            console.log(response.data);
            setShowPreloderLink(false);

            setCardLinks(response.data.card_link);
            funcShowAttachmentContentCardOptions(false);
            setUpdateValue(true);
          }

        }, 1000);

      },
      data: {'card_id': idElem, 'link_id': link_id},
      status: 200,
    });
  }
  
  function funcShowAttachmentContentCardOptions(elem_id){
    console.log(elem_id);
    onRemoving_onFrames();
    
    if(showCardOptions){
      setShowCardOptions(false);
    }
    else{
      setShowCardOptions(showCardOptions = elem_id);
    }
  }

  function funcShowDeleteCardLink(link_id){
    onRemoving_onFrames();

    if(showCardOptionsLinkDel){
      setShowCardOptionsLinkDel(false);
    }
    else{
      setShowCardOptionsLinkDel(showCardOptionsLinkDel = link_id);
    }
  }

  function funcShowUpdateCardLink(link_all){
    onRemoving_onFrames();

    if(attachmentWindow){
      // setAddFiles([]);
      setAttachmentWindow(false);
    }
    else{
      setStartLink(startLink = link_all.id);
      console.log(startLink);
      writeNewLink(link_all.text);
      writeNewLinkDesc(link_all.description);
      setAttachmentWindow(attachmentWindow = 'link');
    }
    // if(showCardOptionsLinkUpdate){
    //   setShowCardOptionsLinkUpdate(false);
    // }
    // else{
    //   setShowCardOptionsLinkUpdate(showCardOptionsLinkUpdate = link_id);
    // }
  }

  // console.log(addFiles);


  function onRemoving_onFrames(){
    setNewNameField(false); 
    setMembersWindow(false); 
    setLabelsWindow(false); 
    setDueDateWindow(false); 
    setShowReactQuill(false); 
    setShowUserCard(null); 
    setActivityEditorShow(null); 
    setAttachmentWindow(false);
    setShowCardOptions(false);
    setShowCardOptionsFileDel(false);
    setShowCardOptionsLinkUpdate(false);
    setShowCardOptionsLinkDel(false);
  }

  const modules = {
    toolbar: [
      [{ header: []}],
      ["bold", "italic", "underline"], //"strike", "blockquote"
      [{color: []}],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
 
  useEffect(() => {
    request({
      method:'POST',
      url:`take-data-card/`,
      callback:(response) => { 
        if (response.status === 200) {
          // console.log(response);
          if(response.data){
            console.log(response.data);
            setAuthUser(response.data.auth_user);
            setWindowData(response.data.card[0]);
            setWindowName(response.data.card[0]['name']);
            setStartWindowName(response.data.card[0]['name']);
            setCardUsers(response.data.card_users_data);
            setSubscribe(response.data.card_users_data.filter((cardUser) => cardUser.id === response.data.auth_user).length);
            setValueDescription(response.data.card[0]['description']); 
            setCardDescription(response.data.card[0]['description']); 
            setAuthUserData((dashboardUsers.filter((cardUser) => cardUser.id === response.data.auth_user))[0]);
            setCardActivityComments(response.data.card[0].activity.reverse());
            setDueDateCheckbox(response.data.card[0]['execute']);
            // console.log(response.data.card[0].activity);
            setCardFiles(response.data.card[0]['card_file']);
            setCardLinks(response.data.card[0]['card_link']);
            setUpdateValue(false);
          }
          if(task.label){
            setCardLabel(true);
          }
        }
      },
      data: {'id': idElem},
      status:200,
    });

  },[typeElem, idElem, task, dashboardUsers, updateValue]);

  function showTextarea() {
    onRemoving_onFrames();

    if(!newName){
      setNewNameField(newName = true);
    }
    else{
      setNewNameField(newName = false);
    }
  }

  function funcShowReactQuill(){
    onRemoving_onFrames();

    if(showReactQuill){
      setShowReactQuill(false);
    }
    else{
      setShowReactQuill(true);
    }
  }

  function saveNewReactQuillText(){
    if(valueDescription === '<p><br></p>'){
      // <p><br></p><p><br></p>
      setValueDescription(valueDescription = null);
    }

    if(cardDescription === valueDescription){
      funcShowReactQuill();
      return;
    }

    if(valueDescription !== cardDescription){
      request({
        method:'POST',
        url:'add-card-description/',
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              setValueDescription(response.data[0].description);
              setCardDescription(response.data[0].description);

              setUpdateValue(true);
            }
          }
        },
        data: {'card_id': windowData.id,'description': valueDescription},
        status:200,
      });
    }
    funcShowReactQuill();
  }

  function showReactQuillHandleKeyPress(evt){
    if(evt.key === 'Enter' && evt.shiftKey){
      setValueDescription(valueDescription = valueDescription.trim().slice(0, -11));
      saveNewReactQuillText();
    }
  }

  function writeNewText(evt) {
    setWindowName((prev) => (prev = evt));
  }

  const windowNameHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey || evt.type === "blur"){
      showTextarea();
      if(windowName !== startWindowName){
        updateFunc(windowData.id, windowName);
        setStartWindowName(windowName);

        setUpdateValue(true);
      }
    }
  }

  function funcSubscribe(){
    onRemoving_onFrames();

    if(subscribe){
      setSubscribe(false);
    }
    else{
      setSubscribe(true);
    }
  }

  function funcMembersWindow(){
    onRemoving_onFrames();

    if(membersWindow){
      setMembersWindow(false);
    }
    else{
      setMembersWindow(membersWindow = true);
    }
  }

  function funcLabelsWindow() {
    onRemoving_onFrames();

    if(labelsWindow){
      setLabelsWindow(false);
    }
    else{
      setLabelsWindow(labelsWindow = true);
    }
  }

  function chechUserToAdd(user_id){
    if(cardUsers.length === 0){
      return true;
    }
    else{
      let addUser = true;

      cardUsers.forEach((cardUser) => {
        if (user_id === cardUser.id){
          addUser = false;
        }
      });
      return addUser;
    }
  }

  function funcAddUserToCard(user_id){
    if(showPreloderAddMember){ 
      return;
    }
    setShowPreloderAddMember(user_id);
    if(chechUserToAdd(user_id)){
      request({
        method:'POST',
        url:`card-user-update/`,
        callback:(response) => { 
          if (response.status === 200) {
            if(response.data){
              setShowPreloderAddMember(false);
              
              setCardUsers((cardUsers) = cardUsers = [...cardUsers, response.data]);
              setSubscribe(cardUsers.filter((cardUser) => cardUser.id === authUser).length);
              
              setSearchNewCardUser(searchNewCardUser = searchNewCardUser.filter((elem) => elem.id !==  user_id));
              setMatchSearch((searchNewCardUser.length === 0) ? '' : matchSearch);

              setUpdateValue(true);
            }
          }
        },
        data: {'auth_user': authUser, 'user_id': user_id, 'card_id': windowData.id},
        status:200,
      });
    }
  }

  function funcDelCardUser(user_id){
    if(showPreloderDelMember){
      return;
    } 
    setShowPreloderDelMember(user_id);
    cardUsers.forEach(cardUser => {
      if (user_id === cardUser.id){
        request({
          method:'POST',
          url:`card-user-delete/`,
          callback:(response) => { 
            if (response.status === 200) {
              if(response.data){
                setShowPreloderDelMember(false);

                let filteredCardUsers = cardUsers.filter((cardUser) => cardUser.id !== user_id);
                setCardUsers(filteredCardUsers);
                setSubscribe(filteredCardUsers.filter((cardUser) => cardUser.id === authUser).length);

                setUpdateValue(true);
              }
            }
          },
          data: {'auth_user': authUser, 'user_id': cardUser.id, 'card_id': windowData.id},
          status:200,
        });
      }
    });
  }
  // console.log(updateValue);
  function onUserCard(id_user = null) {
    console.log('tut', id_user);
    onRemoving_onFrames();

    showUserCard === id_user ?
      setShowUserCard(null)
      :
      setShowUserCard(id_user)
  }

  const useFocusAndSetRef = (ref) => {
    ref = useCallback(
      (node) => {
        if (node !== null) {
          ref.current = node; // it is not done on it's own
          const len = node.unprivilegedEditor.getLength();
          const selection = { index: len, length: len };
          node.setEditorSelection(node.editor, selection);
        }
      },
      [ref]
    );
    return ref;
  };

  let editorRef;
  editorRef = useFocusAndSetRef(editorRef);

  function onDelWindow(comment_id){ 
    if(delWindow){
      setDelWindow(false);
    }
    else{
      setDelWindow(comment_id);
    }
  }

  function onDelActivityReactQuillComment(comment_data){
    // console.log(comment_id);
    setDelWindow(false);
    setProcessActivity(comment_data.date);
    request({
      method:'POST',
      url:'del-card-activity/',
      callback:(response) => { 
        if (response.status === 200) {
          setProcessActivity(false);
          setCardActivityComments(cardActivityComments.filter((comment) => comment.id !== comment_data.id));
        }
      },
      data: {'comment_id': comment_data.id},
      status:200,
    });
  }

  function onSaveActivityReactQuillComment(date){
    // console.log(onSaveActivityReactQuillComment.name, date);
    if(valueEditor === '<p><br></p>'){
      setValueEditor(valueEditor = null);
      // console.log(valueEditor);
    } 

    if(cardActivity === valueEditor){
      // console.log(valueEditor, cardActivity);
      setValueEditor(valueEditor = null)
      funcActivityEditorShow();
      return;
    }

    if(valueEditor !== cardActivity){
      // console.log(valueEditor, cardActivity);
      setProcessActivity(date);
      request({
        method:'POST',
        url:'add-card-activity/',
        callback:(response) => { 
          if (response.status === 200) {
            setProcessActivity(false);
            if(response.data){
              // console.log(response.data);
              setCardActivityComments(response.data);
              setValueEditor('');
            }
          }
        },
        data: {'find_by_date': date, 'card_id': windowData.id, 'author_id': authUser, 'comment': valueEditor.trim(),}, //valueEditor.trim().slice(0, -11)
        status:200,
      });
    }
    funcActivityEditorShow();
  }

  function showActivityReactQuillHandleKeyPress(evt, date){
    // console.log(evt, date);
    if(evt.key === 'Enter' && evt.shiftKey){
      setValueEditor(valueEditor = valueEditor.trim().slice(0, -11));
      onSaveActivityReactQuillComment(date);
    }
  }

  function funcActivityDetailsShow(){
    onRemoving_onFrames();

    if(activityDetailsShow){
      setActivityDetailsShow(false);
    }
    else{
      setActivityDetailsShow(true);
    }
  }

  function funcActivityEditorShow(comment_id = null, commentStartValue){
    onRemoving_onFrames();
    // console.log('asd', comment_id)
    if(activityEditorShow === comment_id){
      setActivityEditorShow(null);
    }
    else{
      setActivityEditorShow(comment_id);
      setCardActivity(commentStartValue);
      setValueEditor(commentStartValue);
    }
  }

  function funcDueDateWindow(){
    onRemoving_onFrames();

    if(dueDateWindow){
      setDueDateWindow(false);
    }
    else{
      setDueDateWindow(dueDateWindow = true);
    }
  }

  function writeNewLinkDesc(evt) {
    console.log(evt);
    setNewLinkDesc(newLinkDesc = evt);
    console.log(newLinkDesc);
  }

  const newLinkDescHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey){ // || evt.type === "blur"
      // funcAttachmentWindow();
      if(newLinkDesc !== startLinkDesc){
        console.log('qwe')
        handleAddFilesSubmit();
        // updateFunc(windowData.id, newLink);
        // setStartnewLink(newLink);
        // startLink, setStartLink
        // setUpdateValue(true);
      }
      funcAttachmentWindow();

    }
  }

  function writeNewLink(evt) {
    console.log(evt);
    setNewLink(newLink = evt);
    console.log(newLink);
  }

  const newLinkHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey){
      funcAttachmentWindow();
      if(newLink !== startLink){
        console.log('asd');
        handleAddFilesSubmit();

        // updateFunc(windowData.id, newLink);
        // setStartnewLink(newLink);
        // startLink, setStartLink
        // setUpdateValue(true);
      }
      funcAttachmentWindow();

    }
  }

  function funcAttachmentWindow(){ 
    onRemoving_onFrames();

    if(attachmentWindow){
      setNewLink(''); 
      setNewLinkDesc('');
      setAddFiles([]);
      setAttachmentWindow(false);
    }
    else{
      setAttachmentWindow(attachmentWindow = true);
    }
  }

  return (
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
          newName ={newName}
          windowName={windowName}
          subscribe={subscribe}
          column={column}
          showTextarea={showTextarea}
          writeNewText={writeNewText}
          windowNameHandleKeyPress={windowNameHandleKeyPress}
        />

        {/* главная колонка */}
        <div className={styles.mainCol}>
          <div className={styles.cardDetails} >
            
            <div className={styles.cardDetailItem}>
              <WindowModalCardMember
                cardUsers={cardUsers}
                authUser={authUser}
                showUserCard={showUserCard}
                funcMembersWindow={funcMembersWindow}
                funcDelCardUser={funcDelCardUser}
                onUserCard={onUserCard}
                onRemoving_onFrames={onRemoving_onFrames}
              />
            </div>

            <div className={styles.cardDetailItem}>
              <WindowModalCardLabel
                task={task}
                cardLabel={cardLabel}
                funcLabelsWindow={funcLabelsWindow}
              />
            </div>

            <div className={styles.cardDetailItem}>
              <WindowModalSubscribe
                subscribe={subscribe}
                funcSubscribe={funcSubscribe}
              />
            </div>

            <div className={styles.cardDetailItem}>
              <WindowModalDueDate
                windowData={windowData} 
                dueDateWindow={dueDateWindow} 
                dueDateCheckbox={dueDateCheckbox}
                setDueDateCheckbox={setDueDateCheckbox}
                funcDueDateWindow={funcDueDateWindow} 
                setUpdateValue={setUpdateValue}
              />
            </div>
            
          </div>

          <WindowModalAttachment 
            funcAttachmentWindow={funcAttachmentWindow}
            handleChangeAddFiles={handleChangeAddFiles}
            showCardOptions={showCardOptions}
            addFiles={addFiles}
            cardFiles={cardFiles}
            setCardFiles={setCardFiles}
            onDeleteCardFile={onDeleteCardFile}
            showPreloderFile={showPreloderFile}
            funcShowDeleteCardFile={funcShowDeleteCardFile}
            showCardOptionsFileDel={showCardOptionsFileDel}

            funcShowAttachmentContentCardOptions={funcShowAttachmentContentCardOptions}
            cardLinks={cardLinks}
            funcShowDeleteCardLink={funcShowDeleteCardLink}
            funcShowUpdateCardLink={funcShowUpdateCardLink}
            showCardOptionsLinkDel={showCardOptionsLinkDel}
            showCardOptionsLinkUpdate={showCardOptionsLinkUpdate}
            onDeleteCardLink={onDeleteCardLink}
            showPreloderLink={showPreloderLink}

            // writeNewLink={writeNewLink}
            // newLinkHandleKeyPress={newLinkHandleKeyPress}
            setStartLink={setStartLink}
          />
          
          <WindowModalDescription 
            showReactQuill={showReactQuill}
            funcShowReactQuill={funcShowReactQuill}
            valueDescription={valueDescription}
            setValueDescription={setValueDescription}
            modules={modules}
            showReactQuillHandleKeyPress={showReactQuillHandleKeyPress}
            editorRef={editorRef}
            saveNewReactQuillText={saveNewReactQuillText}
            cardDescription={cardDescription}
          />

          <WindowModalActivity
            authUserData={authUserData}
            activityDetailsShow={activityDetailsShow}
            activityEditorShow={activityEditorShow}
            processActivity={processActivity}
            valueEditor={valueEditor}
            setValueEditor={setValueEditor}
            cardActivityComments={cardActivityComments}
            modules={modules}
            editorRef={editorRef}
            funcActivityDetailsShow={funcActivityDetailsShow}
            funcActivityEditorShow={funcActivityEditorShow}
            showActivityReactQuillHandleKeyPress={showActivityReactQuillHandleKeyPress}
            onSaveActivityReactQuillComment={onSaveActivityReactQuillComment}
            onDelActivityReactQuillComment={onDelActivityReactQuillComment}
            onUserCard={onUserCard}
            onDelWindow={onDelWindow} 
            delWindow={delWindow} 
            setDelWindow={setDelWindow} 
          />

        </div>

        <Sidebar
          typeElem={typeElem}
          windowData={windowData}
          deleteFunc={deleteFunc}
          funcAddUserToCard={funcAddUserToCard}
          dashboardUsers={dashboardUsers}
          funcDelCardUser={funcDelCardUser}
          cardUsers={cardUsers}
          funcMembersWindow={funcMembersWindow}
          membersWindow={membersWindow}
          funcLabelsWindow={funcLabelsWindow}
          labelsWindow={labelsWindow}
          updateCardLabel={updateCardLabel}
          setCardLabel={setCardLabel}
          matchSearch={matchSearch}
          setMatchSearch={setMatchSearch}
          searchNewCardUser={searchNewCardUser}
          setSearchNewCardUser={setSearchNewCardUser}
          closeModal={closeModal}
          funcDueDateWindow={funcDueDateWindow} 
          dueDateWindow={dueDateWindow}
          setUpdateValue={setUpdateValue}
          showPreloderAddMember={showPreloderAddMember}
          showPreloderDelMember={showPreloderDelMember}
          showPreloderLabel={showPreloderLabel}
          setShowPreloderLabel={setShowPreloderLabel}
          attachmentWindow={attachmentWindow} 
          funcAttachmentWindow={funcAttachmentWindow}

          showPreloderAttachmentWindow={showPreloderAttachmentWindow}
          handleChangeAddFiles={handleChangeAddFiles}
          addFiles={addFiles}
          handleAddFilesReset={handleAddFilesReset}
          handleAddFilesSubmit={handleAddFilesSubmit}

          newLink={newLink}
          newLinkDesc={newLinkDesc}
          writeNewLink={writeNewLink}
          newLinkHandleKeyPress={newLinkHandleKeyPress}
          writeNewLinkDesc={writeNewLinkDesc}
          newLinkDescHandleKeyPress={newLinkDescHandleKeyPress}
          // setStartLink={setStartLink}
          startLink={startLink}
          
        ></Sidebar>

    </div>
  )
};

