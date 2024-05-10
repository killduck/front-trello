import Icons from '../Icons/Icons';
import styles from './ButtonIcon.module.scss';


/* Может принимать следцющие props-ы

Имя иконки по которой подставляется svg кртинка
Имя берем из UI/Icons/Icons/icons.svg из id
iconName = iconName,


Подпись к иконке
iconCaptionText = {'Избранное'}

Размеры иконки, по умолчанию width='16' и height='16'
iconSize={
            {
                width: '20',
                height: '20',
            }
        }

Парметры шрифта для подписи
textSize={ '16px'}

Параметры состояния, используется для установки или снятия цвета
state= true и false

Каким цветом окрашивать иконку если меняется статус/состояние
stylesState = true и false

Проброска callback function
actionFunction= name function

*/

export default function ButtonIcon(props) {

  let option = {
    iconName: props.iconName,
    iconCaptionText: props.iconCaptionText,
    iconSize: props.iconSize,
    textSize: props.textSize,
    stylesBasic: props.stylesBasic,
    state: props.state,
    colorState: props.colorState,
    colorFill: props.colorFillIcon,
    sizeLineIcon: props.sizeLineIcon,
    stylesState: props.stylesState,
    actionFunction: props.actionFunction,
  }
  // console.log('stylesBasic=>', option.stylesBasic, 'stylesState=>', option.stylesState)


  return (
    <div
      className={styles.ButtonIcon}
      style={
        option.state ?
          option.stylesState
          :
          option.stylesBasic
      }


      onClick={
        option.actionFunction ?
          () => { option.actionFunction() }
          :
          () => { }
      }
    >

      {
        option.iconCaptionText ?
          <span style={{ fontSize: option.textSize }}>
            {
              !option.state ?
                option.iconCaptionText.initial
                :
                option.iconCaptionText.reverse
            }
          </span>
          :
          ''
      }

      <div className={`${styles.Icon} ${styles[option.iconName]}`}>
        <Icons
          name={option.iconName}
          color={option.colorFill}
          sizeLine={option.sizeLineIcon}
          sizeWidth={option.iconSize ? option.iconSize.width : '16px'}
          sizeHeight={option.iconSize ? option.iconSize.height : '16px'}
        />
      </div>

    </div>
  )
};
