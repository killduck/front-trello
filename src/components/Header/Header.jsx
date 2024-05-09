import { useState } from 'react'

import CardDropdownMenu from '../CardDropdownMenu/CardDropdownMenu';
import CardDropdownMenuIcon from '../CardDropdownMenuIcon/CardDropdownMenuIcon';
import ButtonIcon from '../ui/ButtonIcon/ButtonIcon';

import styles from './Header.module.scss';


export default function Header(props) {

  let [stateKebabMenu, setKebabMenu] = useState(false);

  let [stateDisplayWorkspaceDropMenu, setDisplayWorkspaceDownMenu] = useState(false);

  let [stateDisplayRecentDropMenu, setDisplayRecentDownMenu] = useState(false);

  let state_all_menu = [
    setKebabMenu,
    setDisplayWorkspaceDownMenu,
    setDisplayRecentDownMenu
  ]


  function removing_active_menu() {
    state_all_menu.forEach(state => {
      state(false);
    })
  }


  function onKebabMenu() {
    console.log('Проверка выполения функции =>', onKebabMenu.name);

    removing_active_menu();

    stateKebabMenu ?
      setKebabMenu(false)
      :
      setKebabMenu(true)
  }

  function MenuWorkspace() {
    console.log('Проверка выполения функции =>', MenuWorkspace.name);
    removing_active_menu();

    stateDisplayWorkspaceDropMenu ?
      setDisplayWorkspaceDownMenu(false)
      :
      setDisplayWorkspaceDownMenu(true)
  }

  function MenuRecent() {
    console.log('Проверка выполения функции =>', MenuRecent.name);
    removing_active_menu();

    stateDisplayRecentDropMenu ?
      setDisplayRecentDownMenu(false)
      :
      setDisplayRecentDownMenu(true)
  }


  return (
    <div className={styles.Header}>
      <nav className={styles.Navigation}>

        <div className={styles.ButtonKebabMenu}>
          <div className={styles.KebabMenuWrap}>
            <ButtonIcon
              iconName={'KebabMenu'} // props - Имя кнопки-иконки подставляем из ui/Icons/Icons/icons.svg из id
              iconSize={ // props - Размер кнопки-иконки
                {
                  width: '20',
                  height: '20',
                }
              }
              iconCaption={true}  // Отображение подписи - есть(true) или нет(false)
              iconCaptionText={  // Подпись на кнопке-иконке при (true) или (false) либо только иконка
                {
                  initial: '',
                  reverse: ''
                }
              }
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
                    iconCaptionText={
                      {
                        initial: 'Рабочие пространства',
                        reverse: 'Рабочие пространства'
                      }
                    }
                    textSize={'14px'}
                    state={stateDisplayWorkspaceDropMenu}
                    stylesBasic={
                      {
                        padding: '6px 10px 6px 10px',
                      }
                    }
                    stylesState={
                      {
                        color: '#579DFF',
                        padding: '6px 10px',
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
                  <div style={{ marginTop: '-3px' }}>
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
                    <div className={styles.LineSeparator}></div>
                    <div className={styles.TitleText}>
                      Ваши рабочие пространства
                    </div>
                    <ul>
                      <li className={styles.UseHover}>
                        <CardDropdownMenu
                          cardName={"Ilya Poletuev's workspace"}
                        />
                      </li>
                    </ul>
                    <div className={styles.TitleText}>
                      Гостевые рабочие пространства
                    </div>
                    <ul>
                      <li className={styles.UseHover}>
                        <CardDropdownMenu
                          cardName={"Иван Кузьмин: рабочее пространство"}
                        />
                        <li className={styles.UseHover}>
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

              <div className={styles.MenuRecent}>
                <div
                  className={
                    stateDisplayRecentDropMenu ?
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
                    iconCaptionText={
                      {
                        initial: 'Недавние',
                        reverse: 'Недавние'
                      }
                    }
                    textSize={'14px'}
                    state={stateDisplayRecentDropMenu}
                    stylesBasic={
                      {
                        padding: '6px 10px',
                      }
                    }
                    stylesState={
                      {
                        color: '#579DFF',
                        padding: '6px 10px',
                      }
                    }

                    actionFunction={MenuRecent}
                  />
                </div>
                {/* <div
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
                </div> */}
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
