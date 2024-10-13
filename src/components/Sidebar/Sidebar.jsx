import styles from "./Sidebar.module.scss";
import SidebarMembersWindow from "../SidebarMembersWindow/SidebarMembersWindow";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import SidebarLabelWindow from "../SidebarLabelWindow/SidebarLabelWindow";
import SidebarDueDate from "../SidebarDueDate/SidebarDueDate";
import SidebarAttachmentWindow from "../SidebarAttachmentWindow/SidebarAttachmentWindow";
import { useDispatch, useSelector } from "react-redux";
import { setMembersWindow } from "../../main_state/states/modalCardMember/modalCardMember";

export default function Sidebar(props){
  // console.log(props);
  let typeElem = props.typeElem;

  let deleteFunc = props.deleteFunc;
  // let funcAddUserToCard = props.funcAddUserToCard;
  let dashboardUsers = props.dashboardUsers;
  let funcDelCardUser = props.funcDelCardUser;
  let cardUsers = props.cardUsers;
  // let funcMembersWindow = props.funcMembersWindow;
  // let membersWindow = props.membersWindow;
  let showPreloderAddMember = props.showPreloderAddMember;
  let showPreloderDelMember = props.showPreloderDelMember;
  let funcLabelsWindow = props.funcLabelsWindow;
  let labelsWindow = props.labelsWindow;
  let updateCardLabel = props.updateCardLabel;
  let setCardLabel = props.setCardLabel;
  let showPreloderLabel = props.showPreloderLabel;
  let setShowPreloderLabel = props.setShowPreloderLabel;
  let matchSearch = props.matchSearch;
  let setMatchSearch = props.setMatchSearch;
  let searchNewCardUser = props.searchNewCardUser;
  let setSearchNewCardUser = props.setSearchNewCardUser;
  let closeModal = props.closeModal;

  let funcDueDateWindow = props.funcDueDateWindow; 
  let dueDateWindow = props.dueDateWindow; 

  let attachmentWindow = props.attachmentWindow;
  let funcAttachmentWindow = props.funcAttachmentWindow;

  let showPreloderAttachmentWindow = props.showPreloderAttachmentWindow;
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
  let showCardDel = props.showCardDel;
  let setShowCardDel = props.setShowCardDel;
  let onRemoving_onFrames = props.onRemoving_onFrames;

  let setUpdateValue = props.setUpdateValue;

  const windowData = useSelector((state) => state.windowData.value);
  const membersWindow = useSelector((state) => state.modalCardMemberState.membersWindow);

  const dispatch = useDispatch();
  // console.log(windowData);

  function funcMembersWindow(){
    onRemoving_onFrames();
    // console.log('tut', membersWindow);
    if(membersWindow){
      dispatch(setMembersWindow(false));
    }
    else{
      // setMembersWindow(membersWindow = true);
      dispatch(setMembersWindow(true));
    }
  }
  
  function funkShowCardDel(window_id){
    onRemoving_onFrames();
    if(showCardDel){
      setShowCardDel(false);
    }
    else{
      setShowCardDel(window_id);
    }
  }

  function onDeleteCard(window_id){
    closeModal();
    deleteFunc(window_id);
  }

  return (
    
    <div className={styles.sidebar}>
      {/* sidebar */}
      <div className={styles.addItemsWrap}>
        <h3 className={styles.cardTitle}>Добавить на карточку:</h3>
        <div className={styles.itemsWrap}>
          
          <div 
            className={styles.itemMembers}
            onClick={ funcMembersWindow }
          >
            <Icons
              name={'icon-member'}
              class_name={'IconWindowModalSidebarAddMembers'}
            />
            <span>Участники</span>
          </div>
          
          {(membersWindow) &&
            (<SidebarMembersWindow
              dashboardUsers = {dashboardUsers}
              onRemoving_onFrames={onRemoving_onFrames}
            />)
          }
          

          <div 
            className={styles.itemLabels}
            onClick={ funcLabelsWindow }
          >
            <Icons
              name={'icon-label'}
              class_name={'IconWindowModaSidebarAddLabel'}
            />
            <span>Метки</span>
          </div>
          {(labelsWindow) ? 
          (<SidebarLabelWindow
            funcLabelsWindow={funcLabelsWindow}
            labelsWindow={labelsWindow}
            updateCardLabel={updateCardLabel}

            setCardLabel={setCardLabel}
            showPreloderLabel={showPreloderLabel}
            setShowPreloderLabel={setShowPreloderLabel}
          />):("")
          }

          <div 
            className={styles.itemDueDate}
            onClick={ funcDueDateWindow }
          >
            <Icons
              name={'icon-date'}
              class_name={'itemDueDateIcon'}
            />
            <span>Даты</span>
          </div>
          {(dueDateWindow) ? 
          (<SidebarDueDate

            funcDueDateWindow={funcDueDateWindow}
            dueDateWindow={dueDateWindow}
            setUpdateValue={setUpdateValue}
          />):("")
          }

          <div 
            className={styles.itemAttachment} 
            onClick={ funcAttachmentWindow }
          >
            <Icons 
              name={'icon-attachment'}
              class_name={'iconAttachment'}
            />
            <span>Вложение</span>
          </div>
          {(attachmentWindow) ? 
          (<SidebarAttachmentWindow

            funcAttachmentWindow={funcAttachmentWindow}
            attachmentWindow={attachmentWindow}

            showPreloderAttachmentWindow={showPreloderAttachmentWindow}
            setUpdateValue={setUpdateValue}
            handleChangeAddFiles={handleChangeAddFiles}
            addFiles={addFiles}
            handleAddFilesReset={handleAddFilesReset}
            handleAddFilesSubmit={handleAddFilesSubmit}

            newLink={newLink}
            newLinkDesc={newLinkDesc}
            writeNewLink={writeNewLink}
            newLinkHandleKeyPress={newLinkHandleKeyPress}
            // setStartLink={setStartLink}
            startLink={startLink}
            writeNewLinkDesc={writeNewLinkDesc}
            newLinkDescHandleKeyPress={newLinkDescHandleKeyPress}
            
          />):("")
          }

        </div>

      </div>

      <div className={styles.actionsWrap}>
        <h3 className={styles.actionsTitle}>Действия:</h3>
        <div className={styles.actionsWrap}>
          <div className={styles.actionDeleteCard}>
            
            <Button
                actionVariable={windowData.id}
                clickAction={funkShowCardDel}
                className={'BtnDeleteCard'}
              >
                <Icons
                  name={'Trash'}
                  class_name={'IconDeleteColumnn'}
                />
                <span className={styles.actionDeleteCardText}>
                  Удалить карточку
                </span>
            </Button>
          </div>
        </div>
      </div>
      {(showCardDel === windowData.id) &&
      (<div className={styles.smallWindowWrap}>
        <header className={styles.itemHeader}>
          <h2 className={styles.itemHeaderTitle} title="Удаление комментария">Удалить карточку?</h2>
          
          <div className={styles.iconWrap}>
            <Button
              className={'btnSmallWindow'}
              type="button"
              ariaLabel="Закрыть окно"
              clickAction={funkShowCardDel} 
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
            Удалить эту карточку? Отмена невозможна.
          </p>
          <Button
            className={'btnDelCard'}
            type="button"
            ariaLabel="Удалить карточку"
            actionVariable={windowData.id}
            clickAction={onDeleteCard} 
          >Удалить</Button>
        </div>
      </div>)}

    </div>

  )
};
  
  