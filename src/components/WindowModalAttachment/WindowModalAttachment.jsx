import { useState } from "react";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalAttachment.module.scss";


export default function WindowModalAttachment(props){
  console.log(props.addFiles);
  let addFiles = props.addFiles;
  let cardFiles = props.cardFiles;
  let setCardFiles = props.setCardFiles;
  let funcAttachmentWindow = props.funcAttachmentWindow;
  // let handleChangeAddFiles = props.handleChangeAddFiles;
   

  let [showCardOptions, setShowCardOptions] = useState(false);

  function funcShowAttachmentContentCardOptions(file_id){
    if(showCardOptions){
      setShowCardOptions(false);
    }
    else{
      setShowCardOptions(showCardOptions = file_id);
    }
  }

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

            <div className={styles.contentCardsWrap}>
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
                      {showCardOptions === 1 ? 
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
            </div>

            <div className={styles.contentLinksWrap}>
              <p className={styles.contentLinksTittle}>Ссылки</p>
              <ul className={styles.contentLinksList} data-testid="attachment-links-list">
                <li className={styles.contentLinkWrap} draggable="true" data-drop-target-for-element="true">
                  
                  <div className={styles.contentLinkContent} data-smart-link-container="true" data-testid="smart-links-container">
                    <a className={styles.contentLinkLink} data-testid="smart-links-container-layered-link" href="https://top-python31.ru/" tabIndex="-1" target="_blank" rel="noreferrer" draggable="false">Diplom Trello</a>
                    <div className={styles.contentLinkInfo} data-smart-block="true" data-testid="smart-block-title-resolved-view">
                      <div className={styles.contentLinkInfoImg} data-fit-to-content="true" data-smart-element="LinkIcon" data-smart-element-icon="true" data-testid="smart-element-icon">
                        <img src={"https://top-python31.ru/py31.png"} data-testid="smart-element-icon-image" alt="py31.png" />
                      </div>
                      <a className={styles.contentLinkInfoLink} data-smart-element="Title" data-smart-element-link="true" data-testid="smart-element-link" href="https://top-python31.ru/" target="_blank" rel="noreferrer" draggable="false">Diplom Trello</a>
                    </div>
                  </div>
                  
                  <div className={styles.contentLinkActions}>
                    <Button 
                      className={'btnDelAttachment'}
                      actionVariable={2}
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
                    {showCardOptions === 2 ? 
                      (<div className={styles.smallWindowWrap}>
                        asd 2
                        <ul>
                          <li>Изменить</li>
                          <li>Скачать</li>
                          <li>Удалить</li>
                        </ul>
                      </div>) : ("")
                    }
                  </div>
                  
                </li>
              </ul>
            </div>

            <div className={styles.contentFilesWrap}>
              <p className={styles.contentFilesTittle}>Файлы</p>
              <ul className={styles.contentFilesList}>
            
                {cardFiles.map((file) =>
                  file.image ? 
                  
                    (<li key={file.id} className={styles.contentFileWrap} draggable="true" data-drop-target-for-element="true">
                      <div className={styles.contentFileContent} role="button">
                        <a 
                          className={styles.contentFileLink} 
                          draggable="false" 
                          href={file.file_url} 
                          tabIndex="0" 
                          title={file.name}
                          alt={file.name}
                          data-testid="attachment-thumbnail" 
                          style={{backgroundColor: '#r091E420F', backgroundImage: `url(${file.file_url})`}}
                        >
                          <span className={styles.contentFileLinkText}>{file.extension}</span>
                        </a>
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
                          {showCardOptions === file.id && (
                            <div className={styles.smallWindowWrap}>
                              <ul>
                                <li>Изменить</li>
                                <li>Скачать</li>
                                <li>Удалить</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>)
                    :
                    (<li key={file.id} className={styles.contentFileWrap} draggable="true" data-drop-target-for-element="true">
                      <div className={styles.contentFileContent}>
                        <a className={styles.contentFileLink} draggable="false" href={file.file_url} tabIndex="0" title="index.html" data-testid="attachment-thumbnail" style={{backgroundColor: "#091E420F", backgroundImage: 'url(undefined)'}}>
                          <span className={styles.contentFileLinkText}>{file.extension}</span>
                        </a>
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
                          {showCardOptions === file.id && (
                            <div className={styles.smallWindowWrap}>
                              <ul>
                                <li>Изменить</li>
                                <li>Скачать</li>
                                <li>Удалить</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>)
                    
                  )
                }
              </ul>
            </div>
           
          </div>
        
        </div>
      </div>
    </div>
  )
};

