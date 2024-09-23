import { useRef, useState } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalAttachment.module.scss";
import { URL_API, URL_ENDPOINT } from "../../api/config";
import { useClickOutside } from "../../hooks/useClickOutside";



export default function WindowModalAttachment(props){
  // console.log(props.addFiles);
  let addFiles = props.addFiles;
  let cardFiles = props.cardFiles;
  let setCardFiles = props.setCardFiles;
  let funcAttachmentWindow = props.funcAttachmentWindow;
  let onDeleteCardFile = props.onDeleteCardFile;
  let showCardOptions = props.showCardOptions;
  let funcShowAttachmentContentCardOptions = props.funcShowAttachmentContentCardOptions;
  let cardLinks = props.cardLinks;
  let funcShowDeleteCardLink = props.funcShowDeleteCardLink;
  let funcShowUpdateCardLink = props.funcShowUpdateCardLink;
  let showCardOptionsLinkDel = props.showCardOptionsLinkDel;
  let showCardOptionsLinkUpdate = props.showCardOptionsLinkUpdate;
  let showPreloderFile = props.showPreloderFile;
  let showCardOptionsFileDel = props.showCardOptionsFileDel;
  let funcShowDeleteCardFile = props.funcShowDeleteCardFile;
  let onDeleteCardLink = props.onDeleteCardLink;
  let showPreloderLink = props.showPreloderLink;
  // let writeNewLink = props.writeNewLink;
  // let newLinkHandleKeyPress = props.newLinkHandleKeyPress;
  // let setStartLink = props.setStartLink;

  // let handleChangeAddFiles = props.handleChangeAddFiles;
  // let [showCardOptions, setShowCardOptions] = useState(false);

  const smallWindow = useRef(null);
  useClickOutside(smallWindow, () => {
    if(showCardOptions){
      setTimeout(() => {
        funcShowAttachmentContentCardOptions();
      }, 100);
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

            {/* <div className={styles.contentCardsWrap}>
              <p className={styles.contentCardsTitle}>Карточки Trello</p>
              <ul className={styles.contentCardsList}>
                
                <li className={styles.contentCardWrap}>
                  <div className={styles.contentCard}>Карточка_1</div>
                  <div className={styles.contentCardOptions}>
                    <span className={styles.contentCardOptionsTittle}>
                      <Icons 
                        name={'icon-link'}
                        class_name={'iconLink'}
                      />
                      Подключено
                    </span>

                    <div className={styles.contentCardActions}>
                      <Button 
                        className={'btnDelAttachment'}
                        actionVariable={1}
                        clickAction={funcShowAttachmentContentCardOptions}
                      >
                        <Icons
                          name={'three_dots'}
                          class_name={'IconKebabColumnn'}
                          sizeWidth={"24px"}
                          sizeHeight={"24px"}
                          viewBox={"0 0 24 24"}
                        />
                      </Button>
                      {showCardOptions === '' ? 
                        (<div className={styles.smallWindowWrap}>
                          asd 1
                          <ul>
                            <li>Изменить</li>
                            <li>Скачать</li>
                            <li>Удалить</li>
                          </ul>
                        </div>) : ("")
                      }
                    </div>
                  </div>
                </li>

              </ul>
            </div> */}
            {cardLinks.length > 0 &&
            <div className={styles.contentLinksWrap}>
              <p className={styles.contentLinksTittle}>Ссылки</p>
              <ul className={styles.contentLinksList} data-testid="attachment-links-list">
                
                  {cardLinks.map(
                    (link) => 
                    
                      <li key={link.id} className={showPreloderLink === link.id ? `${styles.contentLinkWrap} ${styles.cardAttachmentGradient}` : styles.contentLinkWrap} draggable="true" data-drop-target-for-element="true">
                        
                        <div className={styles.contentLinkContent} data-smart-link-container="true" data-testid="smart-links-container">
                          <a className={styles.contentLinkLink} data-testid="smart-links-container-layered-link" href={link.text} tabIndex="-1" target="_blank" rel="noreferrer" draggable="false">{link.description}</a>
                          <div className={styles.contentLinkInfo} data-smart-block="true" data-testid="smart-block-title-resolved-view">
                            <div className={styles.contentLinkInfoImg} data-fit-to-content="true" data-smart-element="LinkIcon" data-smart-element-icon="true" data-testid="smart-element-icon">
                              {/* <img src={link.favicon ? link.favicon : link.first_letter} data-testid="smart-element-icon-image" alt={""} /> */}
                              {link.favicon ?
                              (
                              // <img src={link.favicon ? link.favicon : link.first_letter} data-testid="smart-element-icon-image" alt={""} />                              
                              <img
                                // className={styles.memberAvatar} 
                                src={link.favicon} //`${URL_API + URL_ENDPOINT + user.img}`}
                                alt={link.text}
                                title={link.description}
                              />
                              )
                              :
                              (<span 
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
                            (<div className={styles.smallWindowOptionsWrap}>
                              <ul className={styles.actionAttachmentWrap}>
                                <li
                                  className={styles.actionAttachment}
                                >
                                  <Button
                                    // clickAction={deleteColumn}
                                    // actionVariable={column.id}
                                    // className={'BtnDeleteColumn'}
                                    actionVariable={link}
                                    clickAction={funcShowUpdateCardLink}
                                    className={'BtnUpdateLink'}
                                  >
                                    <Icons
                                      name={'icon-external-link'}
                                      class_name={'IconDownloadFile'}
                                    />
                                    <span className={styles.actionDeleteCardText}>
                                      Изменить 
                                    </span>
                                  </Button>
                                </li>
                                <li 
                                  className={styles.actionAttachment}
                                  // onBlur={funcShowAttachmentContentCardOptions}
                                >
                                  <Button
                                      // clickAction={deleteColumn}
                                      // actionVariable={column.id}
                                      // className={'BtnDeleteColumn'}
                                      actionVariable={link.id}
                                      clickAction={funcShowDeleteCardLink}
                                      className={'BtnDeleteLink'}
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
                            </div>) : ("")
                          }
                          {showCardOptionsLinkDel === link.id ? 
                            (<div className={styles.smallWindowWrap}>
                              <header className={styles.itemHeader}>
                                <h2 className={styles.itemHeaderTitle} title="Удаление комментария">Удалить вложение?</h2>
                                
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
                      draggable="true" 
                      data-drop-target-for-element="true"
                    >
                      <div className={styles.contentFileContent} role="button">
                        <a 
                          className={styles.contentFileLink} 
                          draggable="false" 
                          href={file.file_url} 
                          tabIndex="0" 
                          title={file.name}
                          alt={file.name}
                          data-testid="attachment-thumbnail" 
                          style={{backgroundColor: '#3a444c', backgroundImage: `url(${URL_API + URL_ENDPOINT + file.file_url})`}}
                        >
                          <span className={styles.contentFileLinkText}>{file.image ? file.image : file.extension}</span>
                        </a>
                        {/* <img src={URL_API + URL_ENDPOINT + file.file_url} data-testid="smart-element-icon-image" alt="py31.png" /> */}
                        <div className={styles.contentFileInfo}>
                          <div className={styles.contentFileInfoTitle}>
                            <span>{file.name}</span>
                          </div>
                          <p className={styles.contentFileInfoAddDate}>
                            <span>Добавлено {file.date_upload.split('.')[0].replace('T', ' ')}</span>
                          </p>
                        </div>
                        <div className={styles.contentFileActions}>
                          <Button 
                            className={'btnDelAttachment'}
                            actionVariable={file.id}
                            clickAction={funcShowAttachmentContentCardOptions}
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
                                {/* <li>Изменить</li> */}
                                <li
                                  className={styles.actionAttachment}
                                >
                                  <Button
                                      // clickAction={deleteColumn}
                                      // actionVariable={column.id}
                                      // className={'BtnDeleteColumn'}
                                      // actionVariable={file.id}
                                      // clickAction={onDownloadCardFile}
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
                                  // onBlur={funcShowAttachmentContentCardOptions}
                                >
                                  <Button
                                      // clickAction={deleteColumn}
                                      // actionVariable={column.id}
                                      // className={'BtnDeleteColumn'}
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

