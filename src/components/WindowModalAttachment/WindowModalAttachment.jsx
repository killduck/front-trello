import { useRef } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalAttachment.module.scss";
import { URL_API } from "../../api/config";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function WindowModalAttachment(props){
  // console.log(props);
  // let addFiles = props.addFiles;
  let cardFiles = props.cardFiles;
  // let setCardFiles = props.setCardFiles;
  let funcAttachmentWindow = props.funcAttachmentWindow;
  let onDeleteCardFile = props.onDeleteCardFile;
  let showCardOptions = props.showCardOptions;
  let  setShowCardOptions = props.setShowCardOptions;

  let funcShowAttachmentContentCardOptions = props.funcShowAttachmentContentCardOptions;
  let cardLinks = props.cardLinks;
  let funcShowDeleteCardLink = props.funcShowDeleteCardLink;
  let funcShowUpdateCardLink = props.funcShowUpdateCardLink;
  let showCardOptionsLinkDel = props.showCardOptionsLinkDel;
  // let showCardOptionsLinkUpdate = props.showCardOptionsLinkUpdate;
  let showPreloderFile = props.showPreloderFile;
  let showCardOptionsFileDel = props.showCardOptionsFileDel;
  let funcShowDeleteCardFile = props.funcShowDeleteCardFile;
  let onDeleteCardLink = props.onDeleteCardLink;
  let showPreloderLink = props.showPreloderLink;
  let onDownloadCardFile = props.onDownloadCardFile;

  const smallWindow = useRef(null);
  useClickOutside(smallWindow, () => {
    if(showCardOptions){
      setShowCardOptions(false);
    }
  });

  return (
    <div>
      <div  className={styles.cardAttachment}>
        <div className={styles.cardAttachmentWrap} data-testid="card-back-attachment">
          <div className={styles.cardAttachmentHeader}>
            <Icons
              name={'icon-attachment'}
              class_name={'iconAttachmentBig'}
            />
            <h3 className={styles.cardAttachmentHeaderTitle}>Вложения</h3>
            <div className={styles.cardAttachmentHeaderBtns}>
              <Button 
                className = {'btnAddAttachment'}
                clickAction = {funcAttachmentWindow}
              >Добавить</Button>
            </div>
          </div>

          <div className={styles.cardAttachmentContent}>

            {cardLinks.length > 0 &&
            <div className={styles.contentLinksWrap}>
              <p className={styles.contentLinksTittle}>Ссылки</p>
              <ul className={styles.contentLinksList} data-testid="attachment-links-list">
                
                  {cardLinks.map(
                    (link) => 
                    
                      <li key={link.id} className={showPreloderLink === link.id ? `${styles.contentLinkWrap} ${styles.cardAttachmentGradient}` : styles.contentLinkWrap} draggable="false" data-drop-target-for-element="false">
                        <div className={styles.contentLinkContent} data-smart-link-container="true" data-testid="smart-links-container">
                          <a 
                            className={styles.contentLinkLink} 
                            data-testid="smart-links-container-layered-link" 
                            href={link.text} 
                            tabIndex="-1" 
                            target="_blank" 
                            rel="noreferrer" 
                            draggable="false"
                          >
                            {link.description}
                          </a>
                          <div className={styles.contentLinkInfo} data-smart-block="true" data-testid="smart-block-title-resolved-view">
                            <div className={styles.contentLinkInfoImg} data-fit-to-content="true" data-smart-element="LinkIcon" data-smart-element-icon="true" data-testid="smart-element-icon">
                              {link.favicon ?
                                (<img
                                  src={link.favicon}
                                  alt={link.text}
                                  title={link.description}
                                />
                                ):(
                                <span 
                                  className={styles.link_first_letter} 
                                  title={link.first_letter}
                                >{link.first_letter}</span>)
                              }
                            </div>
                            <a className={styles.contentLinkInfoLink} data-smart-element="Title" data-smart-element-link="true" data-testid="smart-element-link" href={link.text} target="_blank" rel="noreferrer" draggable="false">{link.description}</a>
                          </div>
                        </div>
                        
                        <div className={styles.contentLinkActions}>
                          <Button 
                            className={'btnDelAttachment'}
                            actionVariable={String(link.id)}
                            clickAction={funcShowAttachmentContentCardOptions}
                            disabled={showPreloderLink === link.id ? 'disabled' : ""}
                          >
                            <Icons
                              name={'three_dots'}
                              class_name={'IconKebabColumnn'}
                              sizeWidth={"24px"}
                              sizeHeight={"24px"}
                              viewBox={"0 0 24 24"}
                            />
                          </Button>
                          {showCardOptions === String(link.id) ? 
                            (<div className={styles.smallWindowOptionsWrap} ref={smallWindow}>
                              <ul className={styles.actionAttachmentWrap}>
                                <li
                                  className={styles.actionAttachment}
                                >
                                  <Button
                                    className={'BtnCloseSmallWindowLink'}
                                    type="button"
                                    ariaLabel="Закрыть окно"
                                    clickAction={funcShowAttachmentContentCardOptions}
                                  >
                                    <span className={styles.actionDeleteCardText}>
                                      Закрыть окно  
                                    </span>
                                    <Icons
                                      class_name={'btnModalCloseIcon'}
                                      name={'CloseIcon'}
                                    />
                                  </Button>
                                </li>
                                <li
                                className={styles.actionAttachment}
                                >
                                  <Button
                                    actionVariable={link}
                                    clickAction={funcShowUpdateCardLink}
                                    className={'BtnUpdateLink'}
                                  >
                                    <span className={styles.actionDeleteCardText}>
                                      Изменить 
                                    </span>
                                    <Icons
                                      name={'icon-external-link'}
                                      class_name={'IconDownloadFile'}
                                    />
                                  </Button>
                                </li>
                                <li className={styles.actionAttachment}>
                                  <Button
                                    actionVariable={link.id}
                                    clickAction={funcShowDeleteCardLink}
                                    className={'BtnDeleteLink'}
                                  >
                                    <span className={styles.actionDeleteCardText}>
                                      Удалить 
                                    </span>
                                    <Icons
                                      name={'Trash'}
                                      class_name={'IconDeleteFile'} 
                                    />
                                  </Button>
                                </li>
                              </ul>
                            </div>) : ("")
                          }
                          {showCardOptionsLinkDel === link.id ? 
                            (<div className={styles.smallWindowWrap}>
                              <header className={styles.itemHeader}>
                                <h2 className={styles.itemHeaderTitle} title="Удаление вложения">Удалить вложение?</h2>
                                
                                <div className={styles.iconWrap}>
                                  <Button
                                    className={'btnSmallWindow'}
                                    type="button"
                                    ariaLabel="Закрыть окно"
                                    clickAction={funcShowDeleteCardLink}
                                  >
                                    <Icons
                                      class_name={'btnModalCloseIcon'}
                                      name={'CloseIcon'}
                                    />
                                  </Button>
                                </div>
                              </header>
                              <div className={styles.delButtonWrap}>
                                <p className={styles.delButtonWrapText}>
                                  Удалить это вложение? Отмена невозможна.
                                </p>
                                <Button
                                  className={'btnDelComment'}
                                  type="button"
                                  ariaLabel="Удалить комментарий"
                                  actionVariable={link.id}
                                  clickAction={onDeleteCardLink} 
                                >Удалить</Button>
                              </div>
                            </div>):("")
                          }
                        </div>
                        
                      </li>
                    )
                  }
              </ul>
            </div>}
            
            {cardFiles.length > 0 && 
            <div className={styles.contentFilesWrap}>
              <p className={styles.contentFilesTittle}>Файлы</p>
              <ul className={styles.contentFilesList}>
            
              {cardFiles.map(
                  (file) =>
                    <li 
                      key={file.id} 
                      className={showPreloderFile === file.id ? `${styles.contentFileWrap} ${styles.cardAttachmentGradient}` : styles.contentFileWrap} 
                      draggable="false" 
                      data-drop-target-for-element="false"
                    >
                      <div className={styles.contentFileContent} >
                        <a 
                          className={styles.contentFileLink} 
                          draggable="false" 
                          href={URL_API + file.file_url} 
                          target="_blank"
                          rel="noreferrer" 
                          tabIndex="0" 
                          title={file.name}
                          alt={file.name}
                          data-testid="attachment-thumbnail" 
                          style={{backgroundColor: '#3a444c', backgroundImage: `url(${URL_API + file.file_url})`}}
                        >
                          <span className={styles.contentFileLinkText}>{file.image ? file.image : file.extension}</span>
                        </a>
                        <div className={styles.contentFileInfo}>
                          <div className={styles.contentFileInfoTitle}>
                            <span>{file.name}</span>
                          </div>
                          <p className={styles.contentFileInfoAddDate}>
                            <span>Добавлено {file.date_upload.split('.')[0].replace('T', ' в ')}</span>
                          </p>
                        </div>
                        <div className={styles.contentFileActions}>
                          <Button 
                            className={'btnDelAttachment'}
                            actionVariable={file.id}
                            clickAction={funcShowAttachmentContentCardOptions}
                            // disabled={showCardOptions === file.id ? 'disabled' : ""}
                          >
                            <Icons
                              name={'three_dots'}
                              class_name={'IconKebabColumnn'}
                              sizeWidth={"24px"}
                              sizeHeight={"24px"}
                              viewBox={"0 0 24 24"}
                            />
                          </Button>
                          
                          {(showCardOptions === file.id)  && (
                            <div className={styles.smallWindowOptionsWrap} ref={smallWindow}>
                              <ul className={styles.actionAttachmentWrap}>
                              <li
                                  className={styles.actionAttachment}
                                >
                                  <Button
                                    className={'BtnCloseSmallWindowFile'}
                                    type="button"
                                    ariaLabel="Закрыть окно"
                                    clickAction={funcShowAttachmentContentCardOptions}
                                  >
                                    <span className={styles.actionDeleteCardText}>
                                      Закрыть окно  
                                    </span>
                                    <Icons
                                      class_name={'btnModalCloseIcon'}
                                      name={'CloseIcon'}
                                    />
                                  </Button>
                                </li>
                                <li className={styles.actionAttachment}>
                                  <Button
                                    actionVariable={file}
                                    clickAction={onDownloadCardFile}
                                    className={'BtnDownloadFile'}
                                  >
                                    <Icons
                                      name={'icon-external-link'}
                                      class_name={'IconDownloadFile'}
                                    />
                                    <span className={styles.actionDeleteCardText}>
                                      Скачать 
                                    </span>
                                  </Button>
                                </li>
                                <li 
                                  className={styles.actionAttachment}
                                >
                                  <Button
                                    actionVariable={file.id}
                                    clickAction={funcShowDeleteCardFile}
                                    className={'BtnDeleteFile'}
                                  >
                                    <Icons
                                      name={'Trash'}
                                      class_name={'IconDeleteFile'} 
                                    />
                                    <span className={styles.actionDeleteCardText}>
                                      Удалить 
                                    </span>
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          )}
                          {showCardOptionsFileDel === file.id &&
                            (<div className={styles.smallWindowWrap}>
                              <header className={styles.itemHeader}>
                                <h2 className={styles.itemHeaderTitle} title="Удаление комментария">Удалить вложение?</h2>
                                
                                <div className={styles.iconWrap}>
                                  <Button
                                    className={'btnSmallWindow'}
                                    type="button"
                                    ariaLabel="Закрыть окно"
                                    clickAction={funcShowDeleteCardFile} 
                                  >
                                    <Icons
                                      class_name={'btnModalCloseIcon'}
                                      name={'CloseIcon'}
                                    />
                                  </Button>
                                </div>
                              </header>
                              <div className={styles.delButtonWrap}>
                                <p className={styles.delButtonWrapText}>
                                  Удалить это вложение? Отмена невозможна.
                                </p>
                                <Button
                                  className={'btnDelComment'}
                                  type="button"
                                  ariaLabel="Удалить комментарий"
                                  actionVariable={file.id}
                                  clickAction={onDeleteCardFile} 
                                >Удалить</Button>
                              </div>
                            </div>)}
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>
            </div>}
           
          </div>
        
        </div>
      </div>
    </div>
  )
};

