import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalAttachment.module.scss";


export default function WindowModalAttachment(props){


  let funcAttachmentWindow = props.funcAttachmentWindow;

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
                    <Button 
                      className={'btnDelAttachment'}
                      // clickAction={funcShowAttachmentContentCardOptions}
                    >
                      <Icons
                        name={'three_dots'}
                        class_name={'IconKebabColumnn'}
                        sizeWidth={"24px"}
                        sizeHeight={"24px"}
                        viewBox={"0 0 24 24"}
                      />
                    </Button>
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
                          
                  <Button 
                    className={'btnDelAttachment'}
                    // clickAction={funcShowAttachmentContentCardOptions}
                  >
                    <Icons
                      name={'three_dots'}
                      class_name={'IconKebabColumnn'}
                      sizeWidth={"24px"}
                      sizeHeight={"24px"}
                      viewBox={"0 0 24 24"}
                    />
                  </Button>
                </li>
              </ul>
            </div>

            <div className={styles.contentFilesWrap}>
              <p className={styles.contentFilesTittle}>Файлы</p>
              <ul className={styles.contentFilesList}>
                <li className={styles.contentFileWrap} draggable="true" data-drop-target-for-element="true">
                  <div className={styles.contentFileContent} role="button">
                    <a className={styles.contentFileLink} draggable="false" href="https://trello.com/1/cards/66a8e6f80a6b8fee761c84d3/attachments/66d712046f0b494186330e2d/download/photo_sand_large.webp" tabIndex="0" title="photo_sand_large.webp" data-testid="attachment-thumbnail" style={{backgroundColor: '#r091E420F', backgroundImage: 'url()'}}>
                      <span className={styles.contentFileLinkText}></span>
                    </a>
                    <div className={styles.contentFileInfo}>
                      <div className={styles.contentFileInfoTitle}>
                        <span>photo_sand_large.webp</span>
                      </div>
                      <p className={styles.contentFileInfoAddDate}>
                        <span>Добавлено 6 часов назад</span>
                      </p>
                    </div>
                    <div className={styles.contentFileActions}>
                      <Button 
                        className={'btnDelAttachment'}
                        // clickAction={funcShowAttachmentContentCardOptions}
                      >
                        <Icons
                          name={'three_dots'}
                          class_name={'IconKebabColumnn'}
                          sizeWidth={"24px"}
                          sizeHeight={"24px"}
                          viewBox={"0 0 24 24"}
                        />
                      </Button>
                    </div>
                  </div>
                </li>

                <li className={styles.contentFileWrap} draggable="true" data-drop-target-for-element="true">
                  <div className={styles.contentFileContent}>
                    <a className={styles.contentFileLink} draggable="false" href="https://trello.com/1/cards/66a8e6f80a6b8fee761c84d3/attachments/66d68aedf9dfc00857231169/download/index.html" tabIndex="0" title="index.html" data-testid="attachment-thumbnail" style={{backgroundColor: "#091E420F", backgroundImage: 'url(undefined)'}}>
                      <span className={styles.contentFileLinkText}>html</span>
                    </a>
                    <div className={styles.contentFileInfo}>
                      <div className={styles.contentFileInfoTitle}>
                        <span>index.html</span>
                      </div>
                      <p className={styles.contentFileInfoAddDate}>
                        <span>Добавлено 16 часов назад</span>
                      </p>
                    </div>
                    <div className={styles.contentFileActions}>
                      <Button 
                        className={'btnDelAttachment'}
                        // clickAction={funcShowAttachmentContentCardOptions}
                      >
                        <Icons
                          name={'three_dots'}
                          class_name={'IconKebabColumnn'}
                          sizeWidth={"24px"}
                          sizeHeight={"24px"}
                          viewBox={"0 0 24 24"}
                        />
                      </Button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
};

