// import Icons from '../Icons/Icons';

import styles from './QuickLabelled.module.scss';


export default function QuickLabelled(props) {


  let option = {
    iconName: props.iconName,
    iconClass: props.class_name,
    favoriteStar: props.favoriteStar,
    actionFunction: props.actionFunction,
    id_card: props.id_card,
  }


  return (
    <div
      className={styles.QuickLabelledButtonIcon}

      onClick={
        option.actionFunction ?
          () => { option.actionFunction(option.id_card) }
          :
          () => { }
      }
    >

      {/* <Icons
        name={option.iconName}
        class_name={option.iconClass}
        active_icon={option.favoriteStar ? 'IconActive' : ''}
      /> */}
    </div>
  )
};
