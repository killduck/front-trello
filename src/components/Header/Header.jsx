import { useState } from 'react';

import ButtonIcon from '../ui/ButtonIcon/ButtonIcon'
import CardDropdownMenu from '../CardDropdownMenu/CardDropdownMenu';
import CardDropdownMenuIcon from '../CardDropdownMenuIcon/CardDropdownMenuIcon';

import styles from './Header.module.scss'


export default function Header(props) {

  let [stateKebabMenu, setStateKebabMenu] = useState(false);

  let [stateDisplayWorkspaceDropMenu, setDisplayWorkspaceDownMenu] = useState(false);


  const textIconKebabMenu = {
    initial: '',
    reverse: '',
  };


  function onKebabMenu() {
    console.log('Проверка выполения функции =>', onKebabMenu.name);

    stateKebabMenu ?
      setStateKebabMenu(false)
      :
      setStateKebabMenu(true)

    let reset_state_other_menus = [
      setDisplayWorkspaceDownMenu(false),
    ];
  }

  function MenuWorkspace() {
    console.log('Проверка выполения функции =>', MenuWorkspace.name);

    stateDisplayWorkspaceDropMenu ?
      setDisplayWorkspaceDownMenu(false)
      :
      setDisplayWorkspaceDownMenu(true)

    let reset_state_other_menus = [
      setStateKebabMenu(false),
    ];
  }


  return (
    <div className={styles.Header}>
      <nav className={styles.Navigation}>

        <div className={styles.ButtonKebabMenu}>
          <ButtonIcon
            iconName={'KebabMenu'} // props - Имя кнопки-иконки подставляем из ui/Icons/Icons/icons.svg из id
            iconSize={ // props - Размер кнопки-иконки
              {
                width: '20',
                height: '20',
              }
            }
            iconCaption={true}  // Отображение подписи - есть(true) или нет(false)
            iconCaptionText={textIconKebabMenu} // Подпись на кнопке-иконке
            textSize={'16px'} // Размер текста подписи
            state={stateKebabMenu}
            stylesState={
              {
                color: '#fff',
              }
            }
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
                <div
                  className={
                    stateDisplayWorkspaceDropMenu ?
                      `${styles.ButtonIcon} ${styles.ButtonIconActive}`
                      :
                      styles.ButtonIcon

                  }
                >
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
                        initial: 'Рабочие пространства',
                        reverse: 'Рабочие пространства'
                      }
                    }
                    textSize={'14px'}
                    state={stateDisplayWorkspaceDropMenu}
                    stylesState={
                      {
                        color: '#579DFF',
                      }
                    }

                    actionFunction={MenuWorkspace}
                  />
                </div>
                <div
                  className={
                    stateDisplayWorkspaceDropMenu ?
                      styles.WorkspaceDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <div>
                    <div className={styles.TitleText}>
                      Текущее рабочее пространство
                    </div>
                    <ul>
                      <li>
                        <CardDropdownMenu
                          cardName={"Ilya Poletuev's workspace"}
                        />
                      </li>
                    </ul>
                    <div style={{ borderTop: '1px solid #A6C5E229', marginTop: '12px' }}></div>
                    <div className={styles.TitleText}>
                      Ваши рабочие пространства
                    </div>
                    <ul>
                      <li>
                        <CardDropdownMenu
                          cardName={"Ilya Poletuev's workspace"}
                        />
                      </li>
                    </ul>
                    <div className={styles.TitleText}>
                      Гостевые рабочие пространства
                    </div>
                    <ul>
                      <li>
                        <CardDropdownMenu
                          cardName={"Иван Кузьмин: рабочее пространство"}
                        />
                        <li>
                          <CardDropdownMenuIcon
                            cardTheme={"Тест 31"}
                            cardName={"Тестовое рабочее пространство"}
                            cardIcon={'Star'}
                            cardIconSize={
                              {
                                width: '16',
                                height: '16',
                              }
                            }
                          />
                        </li>
                      </li>
                    </ul>
                  </div>
                </div>
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
