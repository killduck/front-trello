
import styles from "./Sidebar.module.scss";

import SidebarMembersWindow from "../SidebarMembersWindow/SidebarMembersWindow";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import SidebarLabelWindow from "../SidebarLabelWindow/SidebarLabelWindow";
import SidebarDueDate from "../SidebarDueDate/SidebarDueDate";
import SidebarAttachmentWindow from "../SidebarAttachmentWindow/SidebarAttachmentWindow";

export default function Sidebar(props){
  // console.log(props);
  let typeElem = props.typeElem;
  let windowData = props.windowData;
  let deleteFunc = props.deleteFunc;
  let funcAddUserToCard = props.funcAddUserToCard;
  let dashboardUsers = props.dashboardUsers;
  let funcDelCardUser = props.funcDelCardUser;
  let cardUsers = props.cardUsers;
  let funcMembersWindow = props.funcMembersWindow;
  let membersWindow = props.membersWindow;
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

  let setUpdateValue = props.setUpdateValue;
  

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
            <Icons //нужна другая иконка
              name={'icon-date'}
              class_name={'itemDueDateIcon'}
            />
            <span>Участники</span>
          </div>
          
          {(membersWindow) ?
          (<SidebarMembersWindow
              typeElem = {typeElem}
              windowData = {windowData}
              dashboardUsers = {dashboardUsers}
              cardUsers = {cardUsers}
              membersWindow = {membersWindow}
              funcAddUserToCard = {funcAddUserToCard}
              funcDelCardUser = {funcDelCardUser}
              funcMembersWindow = {funcMembersWindow}
              showPreloderAddMember={showPreloderAddMember}
              showPreloderDelMember={showPreloderDelMember}
              // deleteFunc = {deleteFunc}
              matchSearch={matchSearch}
              setMatchSearch={setMatchSearch}
              searchNewCardUser={searchNewCardUser}
              setSearchNewCardUser={setSearchNewCardUser}
            />):("")
          }
          

          <div 
            className={styles.itemLabels}
            onClick={ funcLabelsWindow }
          >
            <Icons  //нужна другая иконка
              name={'icon-date'}
              class_name={'itemDueDateIcon'}
            />
            <span>Метки</span>
            
          </div>
          {(labelsWindow) ? 
          (<SidebarLabelWindow
            funcLabelsWindow={funcLabelsWindow}
            labelsWindow={labelsWindow}
            updateCardLabel={updateCardLabel}
            windowData={windowData}
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
            windowData={windowData}
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
            windowData={windowData}
            funcAttachmentWindow={funcAttachmentWindow}
            attachmentWindow={attachmentWindow}
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
                // clickAction={deleteColumn}
                // actionVariable={column.id}
                // className={'BtnDeleteColumn'}
                clickAction={onDeleteCard}
                actionVariable={windowData.id}
                className={'BtnDeleteCard'}
              >
                <Icons
                  name={'Trash'}
                  class_name={'IconDeleteColumnn'}
                />
                <span className={styles.actionDeleteCardText}>
                  Удалить {typeElem === 'card' ? 'карточку' : '...'}
                </span>
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
};
  
  