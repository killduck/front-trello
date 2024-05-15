import Icons from '../Icons/Icons';

import styles from './QuickLabelled.module.scss';


export default function QuickLabelled(props) {


  let option = {
    iconName: props.iconName,
    iconClass: props.class_name,
    stateFavouriteStar: props.stateFavouriteStar,
    action: props.actionFunction,
  }


  return (
    <div
      className={styles.QuickLabelledButtonIcon}

      onClick={
        option.action ?
          () => { option.action() }
          :
          () => { }
      }
    >

      <Icons
        name={option.iconName}
        class_name={option.iconClass}
        active_icon={option.stateFavouriteStar ? 'IconActive' : ''}
      />
    </div>
  )
};
