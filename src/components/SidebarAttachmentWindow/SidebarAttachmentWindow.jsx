import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarAttachmentWindow.module.scss";
import { setAddFiles, setAttachmentWindow, setCardFiles, setCardLinks, setNewLink, setNewLinkDesc, setShowPreloderAttachmentWindow, setShowPreloderLink, setStartLink } from "../../main_state/states/modalAttachment/modalAttachment";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import request from "../../api/request";

export default function SidebarAttachmentWindow(props){

  // let handleAddFilesSubmit = props.handleAddFilesSubmit;

  const showPreloderAttachmentWindow = useSelector((state) => state.modalAttachmentState.showPreloderAttachmentWindow);
  const addFiles = useSelector((state) => state.modalAttachmentState.addFiles);
  const startLink = useSelector((state) => state.modalAttachmentState.startLink);
  const attachmentWindow = useSelector((state) => state.modalAttachmentState.attachmentWindow);
  const newLink = useSelector((state) => state.modalAttachmentState.newLink); 
  const newLinkDesc = useSelector((state) => state.modalAttachmentState.newLinkDesc); 
  const windowData = useSelector((state) => state.windowData.value);

  const dispatch = useDispatch();

  const handleAddFilesSubmit = () => {
    if(addFiles.length === 0 && newLink.length === 0 && newLinkDesc.length === 0){
      funcAttachmentWindow();
      return;
    }

    if(newLink === startLink.text && newLinkDesc === startLink.description){
      return;
    }

    if(attachmentWindow !== 'link'){
      dispatch(setStartLink(''));
    }

    const formData = new FormData();
    formData.append("card_id", windowData.id);
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
        if (response.status === 200) {
          dispatch(setShowPreloderLink(false));
          dispatch(setShowPreloderAttachmentWindow(false));
          funcAttachmentWindow();
          dispatch(setNewLink(''));
          dispatch(setNewLinkDesc(''));
          dispatch(setStartLink(''));
          dispatch(setCardLinks(response.data.card_link));
          dispatch(setCardFiles(response.data.card_file));
        }
      },
      data: formData,
      status: 200,
      content_type: "multipart/form-data",
    });
  }

  const handleAddFilesReset = () => {
    dispatch(setNewLink('')); 
    dispatch(setNewLinkDesc(''));
    dispatch(setAddFiles([]));
  }

  const newLinkDescHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey){ 
      handleAddFilesSubmit();
    }
  }

  function writeNewLinkDesc(evt) { 
    dispatch(setNewLinkDesc(evt));
  }

  const newLinkHandleKeyPress = (evt) => {
    if(evt.key === 'Enter' && evt.shiftKey){
      handleAddFilesSubmit();
    }
  }

  const handleChangeAddFiles = (evt) => {
    evt.preventDefault();
    if(evt.target.files && evt.target.files[0]){
      dispatch(setAddFiles(evt.target.files));
    }
  }

  function writeNewLink(evt) {
    dispatch(setNewLink(evt));
  }

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
      <div className={showPreloderAttachmentWindow ? `${styles.smallWindowWrap} ${styles.sidebarAttachmentGradient}` : styles.smallWindowWrap}>

        <header className={styles.itemHeader}>
          {attachmentWindow !== 'link' ?
            <h2 className={styles.itemHeaderTitle} >Прикрепить</h2>
            :
            <h2 className={styles.itemHeaderTitle} >Изменить</h2>
          }
          <div className={styles.iconWrap}>
            <Button
                className={'btnSmallWindow'}
                type="button"
                ariaLabel="Закрыть окно"
                clickAction={funcAttachmentWindow}
                disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
            >
              <Icons
                  class_name={'btnModalCloseIcon'}
                  name={'CloseIcon'}
              />
            </Button>
          </div>
        </header>

        <div tabIndex="-1" className={styles.attachmentWrap} >
          {attachmentWindow !== 'link' &&
            (
            <>
              <h5 className={styles.attachmentFileTitile}>
                Прикрепите файл с компьютера
              </h5>
              <p className={styles.attachmentFileDescription}>Вы можете просто перетянуть и отпустить файлы, чтобы выгрузить их.</p>
              <label 
                tabIndex="0" 
                className={styles.attachmentFileLabel} 
                htmlFor="card-attachment-file-picker" 
                aria-label="Выбрать файл"
                disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
              >Выбрать файл</label>
              <input 
                disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
                onChange={handleChangeAddFiles}
                type="file" 
                id="card-attachment-file-picker" 
                name="card-attachment-file-picker" 
                className={styles.attachmentFileInput} 
                multiple={true} 
              />
              {addFiles.length > 0 ? 
              ( <>
                <h5 className={styles.attachmentFilesTitle}>Добавленные файлы:</h5>
                <ul className={styles.attachmentFilesList}>
                  {Array.from(addFiles).map(({name}, id)=> (
                    <li key={id} className={styles.attachmentFile}>{id+1}.) {name}</li>
                  ))}
                </ul>
                </>
              )
              :
              ""
              }
            </>
            )
          }
          <div className={styles.attachmentLine}></div>

          <div className={styles.attachmentLinkWrap}>
            <form data-testid="link-picker" className={styles.attachmentLinkForm}>
              <span id="search-recent-links-field-description" className={styles.attachmentLinkFindResult}>Предложения будут появляться по мере ввода текста в поле</span>
              <label className={styles.attachmentLinkLabel} id="url-uid3-label" htmlFor="url-uid3">Найдите или вставьте ссылку</label>
              <div className={styles.attachmentLinkInputWrap} role="presentation" data-ds--text-field--container="true" data-testid="link-url-container">
                <input 
                  disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
                  className={styles.attachmentLinkInput} 
                  id="url-uid3" 
                  name="url" 
                  placeholder="Выполните поиск недавних ссылок или вставьте новую" 
                  value={newLink} 
                  autoFocus
                  onFocus={(evt) => evt.target.selectionStart = evt.target.value.length } 
                  onChange={(evt) => writeNewLink(evt.target.value)}
                  onKeyDown={newLinkHandleKeyPress}
                  onBlur={newLinkHandleKeyPress}
                  />
              </div>
              
              <label className={styles.attachmentLinkLabel} id="displayText-uid15-label" htmlFor="displayText-uid15">Текст для отображения (необязательно)</label>
              <div className={styles.attachmentLinkInputWrap} role="presentation" data-ds--text-field--container="true" data-testid="link-text-container">
                <input 
                  disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
                  id="displayText-uid15" 
                  name="displayText" 
                  placeholder="Текст для отображения" 
                  className={styles.attachmentLinkInput} 
                  value={newLinkDesc}
                  onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }// evt.currentTarget.select(evt);
                  onChange={(evt) => writeNewLinkDesc(evt.target.value)}
                  onKeyDown={newLinkDescHandleKeyPress}
                  onBlur={newLinkDescHandleKeyPress}
                />
              </div>
            </form>
          </div>

          <div className={styles.cardEditorButtonWrap}>
            <Button
              className={'attachmentSave'}
              clickAction = {handleAddFilesSubmit}
              disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
            >Сохранить</Button>
            <Button
              className={'attachmentReset'} 
              clickAction = {handleAddFilesReset}
              disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
            >Сброс</Button>
            <Button
              className={'attachmentCancel'} 
              clickAction = {funcAttachmentWindow}
              disabled={showPreloderAttachmentWindow ? 'disabled' : ""}
            >Отмена</Button>
          </div>
        </div>

      </div>
    </>
  )
};

