import { useRef } from "react";
import { URL_API } from "../../api/config";
import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import UserCard from "../UserCard/UserCard";
import styles from "./WindowModalCardMember.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setMembersWindow, setShowPreloderDelMember, setShowUserCard } from "../../main_state/states/modalCardMember/modalCardMember";
import request from "../../api/request";
import { setSubscribeState } from "../../main_state/states/subscribeState";
import { setCardUsers } from "../../main_state/states/cardUsersState";
import { onRemoving_onFrames } from "../../main_state/states/offFrames";
import openCloseFrameFunction from "../../helpers/openCloseWindowFunction";

export default function WindowModalCardMember(props){

  let setUpdateComponent = props.setUpdateComponent; 

  const authUser = useSelector((state) => state.cardUsersState.authUser); 
  const cardUsers = useSelector((state) => state.cardUsersState.cardUsers);
  const windowData = useSelector((state) => state.windowData.value);
  const showUserCard = useSelector((state) => state.modalCardMemberState.showUserCard);
  const membersWindow = useSelector((state) => state.modalCardMemberState.membersWindow);
  const showPreloderDelMember = useSelector((state) => state.modalCardMemberState.showPreloderDelMember);

  const dispatch = useDispatch();

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

  function onUserCard(id_user = null) {
    dispatch(onRemoving_onFrames());

    if(showUserCard === id_user){
      dispatch(setShowUserCard(null));
    }
    else{
      dispatch(setShowUserCard(id_user));
    }
  }

  function funcDelCardUser(user_id){
    if(showPreloderDelMember){
      return;
    } 

    dispatch(setShowPreloderDelMember(user_id));
    
    cardUsers.forEach(cardUser => {
      if (user_id === cardUser.id){
        request({
          method:'POST',
          url:`card-user-delete/`,
          callback:(response) => { 
            if (response.status === 200) {
              if(response.data){
                dispatch(setShowPreloderDelMember(false));

                let filteredCardUsers = cardUsers.filter((cardUser) => cardUser.id !== user_id);
                dispatch(setCardUsers(filteredCardUsers));

                let filteredCardSubscribedUsers = filteredCardUsers.filter((cardUser) => cardUser.id === authUser).length
                dispatch(setSubscribeState(filteredCardSubscribedUsers));

                setUpdateComponent(true);
              }
            }
          },
          data: {'auth_user': authUser, 'user_id': cardUser.id, 'card_id': windowData.id},
          status:200,
        });
      }
    });
  }

  const userCardWindow = useRef(null);

  return (
    <>
      {(cardUsers.length > 0) ?
        (
          <div className={styles.cardDetailNotifications} >
            <h3 className={styles.cardDetailsTitle}>Участники:</h3>
              <div className={styles.membersList}>
              {cardUsers.map(
                (cardUser) => 
                  <div 
                    key={cardUser.id} 
                    className={styles.memberMenu} 
                    aria-label={`Действия с профилем участника ${cardUser.first_name}`}
                  >
                    {cardUser.img ?
                    (<img 
                      className={styles.memberAvatar} 
                      src={`${URL_API + cardUser.img}`}
                      alt={`${cardUser.first_name} (${cardUser.username})`}
                      title={`${cardUser.first_name} (${cardUser.username})`}
                      onClick={()=> onUserCard(cardUser.id)}
                    />)
                    :
                    (<span 
                      className={styles.memberAvatarSpan} 
                      title={`${cardUser.first_name} (${cardUser.username})`}
                      onClick={()=> onUserCard(cardUser.id)}
                    >{cardUser.first_letter}</span>)
                    }
                    {(showUserCard === cardUser.id) ? 
                      <span ref={userCardWindow}>
                        <UserCard
                          authUser={authUser}
                          user={cardUser}
                          onUserCard={onUserCard}
                          funcDelCardUser = {funcDelCardUser}
                          class_name={'UserCard'}
                        />
                      </span>
                      :
                      ""
                    }
                  </div>
                )
              }   
              <Button
                clickAction={funcMembersWindow}
                className={'btnWindowModalMainColAddUser'}
              >
                <Icons
                  name={'AddIcon'}
                  class_name={'IconWindowModalMainColAddUser'}
                />
              </Button>
            </div>
          </div>
        )
        :
        ("")
      }
    </>
  )
};
