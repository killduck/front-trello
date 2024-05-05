import { useEffect, useState } from 'react';

import ButtonIcon from '../ui/ButtonIcon/ButtonIcon'
import Icons from '../ui/Icons/Icons'
import styles from './Header.module.scss'


export default function Header(props) {

  let [stateKebabMenu, setStateKebabMenu] = useState(false);

  const textIconKebabMenu = {
    initial: '',
    reverse: '',
  };


  function onKebabMenu() {
    console.log(
      'Проверка выполения функции =>', onKebabMenu.name,
      '/',
      'Состояние stateKebabMenu =>', stateKebabMenu
    );

    stateKebabMenu ?
      setStateKebabMenu(false)
      :
      setStateKebabMenu(true)
  }


  return (
    <div className={styles.Header}>
      <nav className={styles.Navigation}>

        <div className={styles.ButtonKebabMenu}>
          <ButtonIcon
            iconName={'KebabMenu'} // Имя кнопки-иконки подставляем из ui/Icons/Icons/icons.svg из id
            iconSize={ // Размер кнопки-иконки
              {
                width: '20',
                height: '20',
              }
            }
            iconCaption={true}  // Отображение подписи - есть(true) или нет(false)
            iconCaptionText={textIconKebabMenu} // Подпись на кнопке-иконке
            textSize={'16px'} // Размер текста подписи
            state={stateKebabMenu}
            actionFunction={onKebabMenu}  // Проброска callback function
          />
        </div>

        <a href='/' className={styles.LogoWrap}>
          <div className={styles.Logo}>
            <img className={styles.LogoStatic} src={'img/logo_trello.gif'} alt="" />
            {/* <img className={styles.LogoAnimation} src={'img/logo_trello_anim.gif'} alt="" /> */}
          </div>
        </a>

        <div className={styles.CenterMenu}>
          <div className={styles.CenterMenuWrap}>
            <div className={styles.DropDownMenu}>
              <div className={styles.MenuWorkspace}>
                <ButtonIcon
                  iconName={'ArrowDown'}
                  iconSize={
                    {
                      width: '16',
                      height: '16',
                    }
                  }
                  iconCaption={true}
                  iconCaptionText={
                    {
                      initial:
                        'Рабочее пространство'
                    }
                  }
                  textSize={'14px'}
                />
              </div>



              <ButtonIcon />
              <ButtonIcon />
              <ButtonIcon />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>

          </div>

        </div>

      </nav>
    </div>
  )
};
