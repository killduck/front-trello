import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarAttachmentWindow.module.scss";



export default function SidebarAttachmentWindow(props){

  let windowData = props.windowData; 
  let attachmentWindow = props.attachmentWindow; 
  let funcAttachmentWindow = props.funcAttachmentWindow; 
  let setUpdateValue = props.setUpdateValue; 

  let handleChangeAddFiles = props.handleChangeAddFiles;
  let addFiles = props.addFiles;
  let handleAddFilesReset = props.handleAddFilesReset;
  let handleAddFilesSubmit = props.handleAddFilesSubmit;
  
  let newLink = props.newLink;
  let newLinkDesc = props.newLinkDesc;
  let writeNewLink = props.writeNewLink;
  let newLinkHandleKeyPress = props.newLinkHandleKeyPress;
  // let setStartLink = props.setStartLink;
  let startLink = props.startLink;

  let writeNewLinkDesc = props.writeNewLinkDesc;
  let newLinkDescHandleKeyPress = props.newLinkDescHandleKeyPress;

  return (
    <>
      <div className={styles.smallWindowWrap}>

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
              <label tabIndex="0" className={styles.attachmentFileLabel} htmlFor="card-attachment-file-picker" aria-label="Выбрать файл">Выбрать файл</label>
              <input 
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
                  className={styles.attachmentLinkInput} 
                  // aria-describedby="search-recent-links-field-description" 
                  // aria-labelledby="url-uid3-label" 
                  id="url-uid3" 
                  // autoComplete="off" 
                  // aria-readonly="false" 
                  // role="combobox" 
                  // aria-expanded="true" 
                  // aria-autocomplete="list" 
                  // aria-controls="link-picker-search-list" 
                  // aria-activedescendant="" 
                  // data-ds--text-field--input="true" 
                  // data-testid="link-url" 
                  name="url" 
                  placeholder="Выполните поиск недавних ссылок или вставьте новую" 
                  value={newLink} 
                  
                  autoFocus
                  onFocus={(evt) => evt.target.selectionStart = evt.target.value.length }// evt.currentTarget.select(evt);
                  onChange={(evt) => writeNewLink(evt.target.value)}
                  onKeyDown={newLinkHandleKeyPress}
                  onBlur={newLinkHandleKeyPress}
                  />
              </div>
              
              <label className={styles.attachmentLinkLabel} id="displayText-uid15-label" htmlFor="displayText-uid15">Текст для отображения (необязательно)</label>
              <div className={styles.attachmentLinkInputWrap} role="presentation" data-ds--text-field--container="true" data-testid="link-text-container">
                <input 
                  // aria-describedby="displayText-uid15-helper" 
                  // aria-labelledby="displayText-uid15-label" 
                  id="displayText-uid15" 
                  // autoComplete="off" 
                  // data-ds--text-field--input="true" 
                  // data-testid="link-text" 
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
              className={'attachmentSave'} //attachmentSave
              // actionVariable={'no'}
              clickAction = {handleAddFilesSubmit}
            >Сохранить</Button>
            <Button
              className={'attachmentReset'} //attachmentReset
              // actionVariable={'no'}
              clickAction = {handleAddFilesReset}
            >Сброс</Button>
            <Button
              className={'attachmentCancel'} // attachmentCancel
              // actionVariable={null}
              clickAction = {funcAttachmentWindow}
            >Отмена</Button>
          </div>
        </div>

      </div>
    </>
  )
};

