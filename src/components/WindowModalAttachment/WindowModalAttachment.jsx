import Button from "../ui/Button/Button";
import Icons from "../ui/Icons/Icons";
import styles from "./WindowModalAttachment.module.scss";


export default function WindowModalAttachment(props){


  let funcAttachmentWindow = props.funcAttachmentWindow;

  return (
    <div>
      <div  className={styles.cardActivity}>
        <div className={styles.cardActivityWrap} data-testid="card-back-activity">
          <div className={styles.cardActivityHeader}>
            <Icons
              name={'icon-attachment'}
              class_name={'iconAttachmentBig'}
            />
            <h3 className={styles.cardActivityHeaderTitle}>Вложения</h3>
            <div className={styles.cardActivityHeaderBtns}>
              <Button 
                className = {'BtnCardAttachment'}
                clickAction = {funcAttachmentWindow}
              >Добавить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

