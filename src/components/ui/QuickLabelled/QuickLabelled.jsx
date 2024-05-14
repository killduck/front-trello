import Icons from '../Icons/Icons';

import styles from './QuickLabelled.module.scss';


export default function QuickLabelled(props) {


  let option = {
    iconName: props.iconName,
    iconClass: props.class_name,
    action: props.actionFunction,
  }


  return (
    <div
      className={styles.QuickLabelledButtonIcon}

      onClick={
        option.actionFunction ?
          () => { option.actionFunction() }
          :
          () => { }
      }
    >

      <Icons
        name={option.iconName}
        class_name={option.iconClass}
      />
    </div>
  )
};
