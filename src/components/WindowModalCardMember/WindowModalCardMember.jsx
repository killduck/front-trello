import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import UserCard from "../UserCard/UserCard";
import styles from "./WindowModalCardMember.module.scss";


export default function WindowModalCardMember(props){

  let cardUsers = props.cardUsers;
  let authUser = props.authUser;
  let showUserCard = props.showUserCard;
  let funcMembersWindow = props.funcMembersWindow;
  let funcDelCardUser = props.funcDelCardUser;
  let onUserCard = props.onUserCard;

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
                      src={cardUser.img ? `/img/users/${cardUser.img}` : '/img/no_photo.png'}
                      // srcSet="/img/no_photo.png 1x, /img/no_photo.png 2x" 
                      alt={`${cardUser.first_name} (${cardUser.username})`}
                      title={`${cardUser.first_name} (${cardUser.username})`}
                      onClick={()=> onUserCard(cardUser.id)}
                      // onClick={()=> onRemoving_onFrames('showUserCard', cardUser.id)}
                    />)
                    :
                    (<span 
                      className={styles.memberAvatarSpan} 
                      title={`${cardUser.first_name} (${cardUser.username})`}
                      onClick={()=> onUserCard(cardUser.id)}
                    >{cardUser.first_letter}</span>)
                    }
                    {(showUserCard === cardUser.id) ? 
                      <UserCard
                        authUser={authUser}
                        user={cardUser}
                        clickAction={onUserCard}
                        funcDelCardUser = {funcDelCardUser}
                        class_name={'UserCard'}
                      />
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

