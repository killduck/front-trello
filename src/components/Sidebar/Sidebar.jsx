import styles from "./Sidebar.module.scss";
import SidebarMembersWindow from "../SidebarMembersWindow/SidebarMembersWindow";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import SidebarLabelWindow from "../SidebarLabelWindow/SidebarLabelWindow";
import SidebarDueDate from "../SidebarDueDate/SidebarDueDate";
import SidebarAttachmentWindow from "../SidebarAttachmentWindow/SidebarAttachmentWindow";
import { useDispatch, useSelector } from "react-redux";
import { setMembersWindow } from "../../main_state/states/modalCardMember/modalCardMember";
import { setShowLabelsWindow } from "../../main_state/states/modalCardLabel/modalCardLabel";
import { setDueDateWindow } from "../../main_state/states/modalDueDate/modalDueDate";
import { 
  setAddFiles, 
  setAttachmentWindow, 
  setNewLink, 
  setNewLinkDesc } from "../../main_state/states/modalAttachment/modalAttachment";
import { setShowCardDel } from "../../main_state/states/modalCardDel";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import { setModalIsOpen } from "../../main_state/states/windowModalState";
import { setDNDIsOn } from "../../main_state/states/taskCardState";
import openCloseFrameFunction from "../../helpers/openCloseWindowFunction";

export default function Sidebar(props){

  let deleteFunc = props.deleteFunc; //это прилетает из дашборда
  let dashboardUsers = props.dashboardUsers; //это прилетает из дашборда
  let updateSetCardLabel = props.updateSetCardLabel; //это прилетает из дашборда

  let handleAddFilesReset = props.handleAddFilesReset;
  let handleAddFilesSubmit = props.handleAddFilesSubmit;

  const windowData = useSelector((state) => state.windowData.value);
  const membersWindow = useSelector((state) => state.modalCardMemberState.membersWindow);
  const showLabelsWindow = useSelector((state) => state.modalCardLabelState.showLabelsWindow); 
  const dueDateWindow = useSelector((state) => state.modalDueDateState.dueDateWindow);
  const attachmentWindow = useSelector((state) => state.modalAttachmentState.attachmentWindow);
  const showCardDel = useSelector((state) => state.modalCardDelState.showCardDel);

  const dispatch = useDispatch();

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

  function funcMembersWindow(){
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: membersWindow, 
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setMembersWindow, 
      dispatch: dispatch,
    });
  }

  function funcLabelsWindow() {
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: showLabelsWindow,
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setShowLabelsWindow, 
      dispatch: dispatch,
    });
  }

  function funcDueDateWindow(){
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: dueDateWindow, 
      ifVariableTrue: false, 
      ifVariableFalse: true, 
      method: setDueDateWindow,
      dispatch: dispatch
    });
  }
  
  function funkShowCardDel(window_id){
    dispatch(onRemoving_onFrames());
    openCloseFrameFunction({
      variable: showCardDel, 
      ifVariableTrue: false, 
      ifVariableFalse: window_id, 
      method: setShowCardDel, 
      dispatch: dispatch,
    });
  }

  function onDeleteCard(window_id){
    dispatch(setModalIsOpen(false));
    dispatch(setDNDIsOn(false));
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
          
          {(membersWindow) && (
            <SidebarMembersWindow
              dashboardUsers = {dashboardUsers} //это прилетает из дашборда
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
          {showLabelsWindow && (
            <SidebarLabelWindow
              updateSetCardLabel={updateSetCardLabel} //это прилетает из дашборда
            />)
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
          { dueDateWindow && <SidebarDueDate /> }

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

          {attachmentWindow && (
            <SidebarAttachmentWindow
              handleAddFilesReset={handleAddFilesReset}
              handleAddFilesSubmit={handleAddFilesSubmit}
            />)
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
      
      {(showCardDel === windowData.id) &&(
        <div className={styles.smallWindowWrap}>
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
        </div>)
      }

    </div>
  )
};
  