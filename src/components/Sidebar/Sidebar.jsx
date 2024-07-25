
import styles from "./Sidebar.module.scss";

import SidebarMembersWindow from "../SidebarMembersWindow/SidebarMembersWindow";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";

export default function Sidebar(props){

  let typeElem = props.typeElem;
  let windowData = props.windowData;
  let deleteFunc = props.deleteFunc;
  let funcAddUserToCard = props.funcAddUserToCard;
  let dashboardUsers = props.dashboardUsers;
  let funcDelCardUser = props.funcDelCardUser;
  let cardUsers = props.cardUsers;
  let funcMembersWindow = props.funcMembersWindow;
  let membersWindow = props.membersWindow;



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
          
          {membersWindow ?
          
          (
            <SidebarMembersWindow
              typeElem = {typeElem}
              windowData = {windowData}
              dashboardUsers = {dashboardUsers}
              cardUsers = {cardUsers}
              membersWindow = {membersWindow}
              funcAddUserToCard = {funcAddUserToCard}
              funcDelCardUser = {funcDelCardUser}
              funcMembersWindow = {funcMembersWindow}
              deleteFunc = {deleteFunc}
            />
          )
          :
          ("")
          }
          

          <div className={styles.itemLabels}>
            <Icons  //нужна другая иконка
              name={'icon-date'}
              class_name={'itemDueDateIcon'}
            />
            <span>Метки</span>
          </div>

          <div className={styles.itemDueDate}>
            <Icons
              name={'icon-date'}
              class_name={'itemDueDateIcon'}
            />
            <span>Даты</span>
          </div>

          <div className={styles.itemAttachments}>
            <Icons  //нужна другая иконка
              name={'icon-date'}
              class_name={'itemDueDateIcon'}
            />
            <span>Прикрепить</span>
          </div>

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
                clickAction={deleteFunc}
                actionVariable={windowData.id}
                className={'BtnDeleteCard'}
              >
                <Icons
                  name={'Trash'}
                  class_name={'IconDeletColumnn'}
                />
                <span className={styles.actionDeleteCardText}>
                  Удалить {typeElem === 'column' ? 'колонку' : 'карточку'}
                </span>
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
};
  
  