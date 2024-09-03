import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./SidebarAttachmentWindow.module.scss";



export default function SidebarAttachmentWindow(props){

  let windowData = props.windowData; 
  let attachmentWindow = props.attachmentWindow; 
  let funcAttachmentWindow = props.funcAttachmentWindow; 
  let setUpdateValue = props.setUpdateValue; 

  return (
    <>
      <div className={styles.smallWindowWrap}>

        <header className={styles.itemHeader}>
          <h2 className={styles.itemHeaderTitle} >Прикрепить</h2>
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

          <h5 className={styles.attachmentFileTitile}>
            Прикрепите файл с компьютера
          </h5>
          <p className={styles.attachmentFileDescription}>Вы можете просто перетянуть и отпустить файлы, чтобы выгрузить их.</p>
          <label tabIndex="0" className={styles.attachmentFileLabel} htmlFor="card-attachment-file-picker" aria-label="Выбрать файл">Выбрать файл</label>
          <input type="file" id="card-attachment-file-picker" name="card-attachment-file-picker" className={styles.attachmentFileInput} multiple={true} />
          <div className={styles.attachmentLine}></div>

          <div className={styles.attachmentLinkWrap}>
            <form data-testid="link-picker" className={styles.attachmentLinkForm}>
              <span id="search-recent-links-field-description" className={styles.attachmentLinkFindResult}>Предложения будут появляться по мере ввода текста в поле</span>
              <label id="url-uid3-label" for="url-uid3" className={styles.attachmentLinkLabel}>Найдите или вставьте ссылку</label>
              <div role="presentation" data-ds--text-field--container="true" data-testid="link-url-container" className={styles.attachmentLinkInputWrap}>
                <input className={styles.attachmentLinkInput} aria-describedby="search-recent-links-field-description" aria-labelledby="url-uid3-label" id="url-uid3" autocomplete="off" aria-readonly="false" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="link-picker-search-list" aria-activedescendant="" data-ds--text-field--input="true" data-testid="link-url" name="url" placeholder="Выполните поиск недавних ссылок или вставьте новую" value="" />
              </div>
            </form>
          </div>

          <div className={styles.cardEditorButtonWrap}>
            <Button
              className={'cardEditorSave'}
              // actionVariable={'no'}
              // clickAction = {onSaveActivityReactQuillComment}
            >Сохранить</Button>
            <Button
              className={'cardDescriptionCancel'}
              // actionVariable={null}
              clickAction = {funcAttachmentWindow}
            >Отмена</Button>
          </div>
        </div>
        
      </div>
    </>
  )
};

