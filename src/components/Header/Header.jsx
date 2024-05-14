import { useState } from 'react'

import CardDropdownMenu from '../CardDropdownMenu/CardDropdownMenu';
import CardDropdownMenuIcon from '../CardDropdownMenuIcon/CardDropdownMenuIcon';
import ButtonIcon from '../ui/ButtonIcon/ButtonIcon';

import styles from './Header.module.scss';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import Search from '../Search/Search';


export default function Header(props) {

  let [stateKebabMenu, setKebabMenu] = useState(false);

  let [stateDisplayWorkspaceDropMenu, setDisplayWorkspaceDownMenu] = useState(false);

  let [stateDisplayRecentDropMenu, setDisplayRecentDownMenu] = useState(false);

  let [stateDisplayFavouritesDropMenu, setDisplayFavouritesDownMenu] = useState(false);

  let [stateDisplayTemplatesDropMenu, setDisplayTemplatesDownMenu] = useState(false);

  let state_all_menu = [
    setKebabMenu,
    setDisplayWorkspaceDownMenu,
    setDisplayRecentDownMenu,
    setDisplayFavouritesDownMenu,
    setDisplayTemplatesDownMenu
  ]


  function removing_active_menu() {
    state_all_menu.forEach(state => {
      state(false);
    })
  }


  function change_of_state(state_value, set_value) {
    state_value ?
      set_value(false)
      :
      set_value(true)
  }


  function onKebabMenu() {
    console.log('Проверка выполения функции =>', onKebabMenu.name);

    removing_active_menu();

    change_of_state(stateKebabMenu, setKebabMenu);
  }

  function onMenuWorkspace() {
    console.log('Проверка выполения функции =>', onMenuWorkspace.name);

    removing_active_menu();

    change_of_state(stateDisplayWorkspaceDropMenu, setDisplayWorkspaceDownMenu);
  }

  function onMenuRecent() {
    console.log('Проверка выполения функции =>', onMenuRecent.name);

    removing_active_menu();

    change_of_state(stateDisplayRecentDropMenu, setDisplayRecentDownMenu);
  }

  function onMenuFavourites() {
    console.log('Проверка выполения функции =>', onMenuFavourites.name);

    removing_active_menu();

    change_of_state(stateDisplayFavouritesDropMenu, setDisplayFavouritesDownMenu);
  }

  function onMenuTemplates() {
    console.log('Проверка выполения функции =>', onMenuTemplates.name);

    removing_active_menu();

    change_of_state(stateDisplayTemplatesDropMenu, setDisplayTemplatesDownMenu);
  }

  function onButtonCreate() {
    console.log('Проверка выполения функции =>', onButtonCreate.name);

    removing_active_menu();
  }


  return (
    <div className={styles.Header}>
      <nav className={styles.Navigation}>

        <div className={styles.ButtonKebabMenu}>
          <div className={styles.KebabMenu}>
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
          <div
            className={
              stateKebabMenu ?
                styles.KebabDropDownMenu
                :
                styles.NoneDisplay
            }
          >
            <div>
              <div className={styles.TitleText}>
                {'Ваши приложения'.toUpperCase()}
              </div>
              <ul>
                <li>
                  <a className={styles.KebabMenu_Card} href="#">
                    <div className={styles.Card_Icon}>
                      <Icons
                        name={'Atlassian'}
                        sizeWidth={'24px'}
                        sizeHeight={'24px'}
                        color={'#fff'}
                        sizeLine={'#fff'}
                      />
                    </div>
                    <div className={styles.Card_Text}>Atlassian Home</div>
                  </a>
                </li>
                <li>
                  <a className={styles.KebabMenu_Card} href="#">
                    <div className={styles.Card_Icon}>
                      <Icons
                        name={'Trello'}
                        sizeWidth={'24px'}
                        sizeHeight={'24px'}
                        color={'#fff'}
                        sizeLine={'#fff'}
                      />
                    </div>
                    <div className={styles.Card_Text}>Trello</div>
                  </a>
                </li>
              </ul>
              <div className={styles.TitleText}>
                {'Поиск'.toUpperCase()}
              </div>
              <ul>
                <li>
                  <a className={styles.KebabMenu_Card} href="#">
                    <div className={styles.Card_Icon}>
                      <Icons
                        name={'Atlassian'}
                        sizeWidth={'24px'}
                        sizeHeight={'24px'}
                        color={'#fff'}
                        sizeLine={'#fff'}
                      />
                    </div>
                    <div className={styles.Card_Text_Serch}>
                      <div>
                        <span>Confluence</span>
                      </div>
                      <div>
                        <span>Совместная работа над документами</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
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

                    actionFunction={onMenuWorkspace}
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
                      </li>
                      <li className={styles.UseHover}>
                        <CardDropdownMenu
                          cardName={"No Name: Test workspace"}
                        />
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

                    actionFunction={onMenuRecent}
                  />
                </div>
                <div
                  className={
                    stateDisplayRecentDropMenu ?
                      styles.RecentDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <div>
                    <ul>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Диплом 31"}
                          cardName={"Ilya Poletuev's workspace"}
                          cardImg={'background_desert.webp'}
                          cardIcon={'Star'}
                          cardIconSize={
                            {
                              width: '16',
                              height: '16',
                            }
                          }
                          colorFillIcon={'#e2b203'}
                          sizeLineIcon={'3'}
                        />
                      </li>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Single Page (Laravel + React)"}
                          cardName={"Иван Кузьмин: рабочее пространство"}
                          cardImg={'Background_blue.svg'}
                          cardIcon={'Star'}
                          cardIconSize={
                            {
                              width: '16',
                              height: '16',
                            }
                          }
                          colorFillIcon={'#e2b203'}
                          sizeLineIcon={'3'}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.MenuFavourites}>
                <div
                  className={
                    stateDisplayFavouritesDropMenu ?
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
                        initial: 'В избранном',
                        reverse: 'В избранном'
                      }
                    }
                    textSize={'14px'}
                    state={stateDisplayFavouritesDropMenu}
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

                    actionFunction={onMenuFavourites}
                  />
                </div>
                <div
                  className={
                    stateDisplayFavouritesDropMenu ?
                      styles.FavouritesDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <div>
                    <ul>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Диплом 31"}
                          cardName={"Ilya Poletuev's workspace"}
                          cardImg={'background_desert.webp'}
                          cardIcon={'Star'}
                          cardIconSize={
                            {
                              width: '16',
                              height: '16',
                            }
                          }
                          colorFillIcon={'#e2b203'}
                          sizeLineIcon={'3'}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.MenuTemplates}>
                <div
                  className={
                    stateDisplayTemplatesDropMenu ?
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
                        initial: 'Шаблоны',
                        reverse: 'Шаблоны'
                      }
                    }
                    textSize={'14px'}
                    state={stateDisplayTemplatesDropMenu}
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

                    actionFunction={onMenuTemplates}
                  />
                </div>
                <div
                  className={
                    stateDisplayTemplatesDropMenu ?
                      styles.TemplatesDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <div>
                    <div className={styles.TitleText}>
                      Популярные шаблоны
                    </div>
                    <ul>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"1-on-1 Meeting Agenda"}
                          cardImg={'photo_templates_1.jpg'}
                        />
                      </li>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Agile Board Template | Trello"}
                          cardImg={'photo_templates_2.jpeg'}
                        />
                      </li>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Company Overview"}
                          cardImg={'photo_templates_3.jpeg'}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.ButtonCreate}>
              <ButtonIcon
                iconCaptionText={
                  {
                    initial: 'Создать',
                    reverse: 'Создать'
                  }
                }
                stylesBasic={
                  {
                    height: '100%',
                    padding: '0px 12px',
                  }
                }
                stylesState={
                  {
                    padding: '0px 12px',
                  }
                }
                textSize={'14px'}
                actionFunction={onButtonCreate}
              />

            </div>
            <div></div>
          </div>

        </div>

        <div className={styles.RightMenu}>
          <div className={styles.blockSearch}>
            <Search />
          </div>

          <div className={styles.blockNotification}>
            <Notification>
              <img src={'img/no_name.png'} alt="" />
            </Notification>
          </div>
        </div>

      </nav >


    </div >
  )
};
