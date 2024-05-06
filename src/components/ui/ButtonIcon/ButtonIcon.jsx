import Icons from '../Icons/Icons';
import style from './ButtonIcon.module.scss';


/* Может принимать следцющие props-ы

Имя иконки по которой подставляется svg кртинка
Имя берем из UI/Icons/Icons/icons.svg из id
iconName = iconName,

Отображение подписи - есть(true) или нет(false)
iconCaption={true}

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
colorState = true и false

Проброска callback function
actionFunction= name function

*/

export default function ButtonIcon(props) {

  let option = {
    iconName: props.iconName,
    iconCaption: props.iconCaption,
    iconCaptionText: props.iconCaptionText,
    iconSize: props.iconSize,
    textSize: props.textSize,
    state: props.state,
    colorState: props.colorState,
    actionFunction: props.actionFunction,
  }


  return (
    <div
      className={style.ButtonIcon}
      style={
        option.state ?
          { color: option.colorState }
          :
          { color: '' }
      }


      onClick={
        option.actionFunction ?
          () => { option.actionFunction() }
          :
          () => { }
      }
    >

      {
        option.iconCaption ?
          <span style={option.textSize ? { fontSize: option.textSize } : { fontSize: '' }}>
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

      <Icons
        name={option.iconName}
        className={option.iconName}
        sizeWidth={option.iconSize ? option.iconSize.width : '16px'}
        sizeHeight={option.iconSize ? option.iconSize.height : 'auto'}
      />
    </div>

  )
};
