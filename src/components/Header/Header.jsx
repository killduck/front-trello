import { useState } from 'react'

import * as api from '../../api/api';

import CardDropdownMenuIcon from '../CardDropdownMenuIcon/CardDropdownMenuIcon';
import ButtonDropMenu from '../ui/ButtonDropMenu/ButtonDropMenu';
import DropDownMenuKebab from '../DropDownMenuKebab/DropDownMenuKebab';
import DropDownMenuRecentFavourite from '../DropDownMenuRecentFavourite/DropDownMenuRecentFavourite';
import DropDownMenuWorkspace from '../DropDownMenuWorkspace/DropDownMenuWorkspace';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import Search from '../Search/Search';

import styles from './Header.module.scss';


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

        <div className={styles.KebabMenu}>
          <div
            className={
              stateKebabMenu ?
                `${styles.MenuButton} ${styles.MenuButtonActive}`
                :
                styles.MenuButton
            }
          >
            <div className={styles.MenuTextIconActive}>
              <ButtonDropMenu
                class_name={'BtnKebabMenu'}
                actionFunction={onKebabMenu}
              >
                <Icons
                  name={'KebabMenu'}
                  class_name={'KebabMenuIcon'}
                />
              </ButtonDropMenu>
            </div>
          </div>

          <div
            className={
              stateKebabMenu ?
                styles.KebabDropDownMenu
                :
                styles.NoneDisplay
            }
          >
            <DropDownMenuKebab />
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
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnDropMenu'}
                      actionFunction={onMenuWorkspace}
                    >
                      <span>Рабочие пространства</span>
                      <Icons
                        name={'ArrowDown'}
                        class_name={'BtnDropMenuIcon'}
                      />
                    </ButtonDropMenu>
                  </div>
                </div>
                <div
                  className={
                    stateDisplayWorkspaceDropMenu ?
                      styles.WorkspaceDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <DropDownMenuWorkspace />
                </div>
              </div>

              <div className={styles.MenuRecent}>
                <div
                  className={
                    stateDisplayRecentDropMenu ?
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnDropMenu'}
                      actionFunction={onMenuRecent}
                    >
                      <span>Недавние</span>
                      <Icons
                        name={'ArrowDown'}
                        class_name={'BtnDropMenuIcon'}
                      />
                    </ButtonDropMenu>
                  </div>
                </div>
                <div
                  className={
                    stateDisplayRecentDropMenu ?
                      styles.RecentDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  {/* <div>
                    <ul>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Диплом 31"}
                          cardName={"Ilya Poletuev's workspace"}
                          cardImg={'background_desert.webp'}
                          cardIcon={'Star'}
                        />
                      </li>
                      <li>
                        <CardDropdownMenuIcon
                          cardTheme={"Single Page (Laravel + React)"}
                          cardName={"Иван Кузьмин: рабочее пространство"}
                          cardImg={'Background_blue.svg'}
                          cardIcon={'Star'}
                        />
                      </li>
                    </ul>
                  </div> */}
                  <DropDownMenuRecentFavourite
                    data = {api.boards}
                  />
                </div>
              </div>

              <div className={styles.MenuFavourites}>
                <div
                  className={
                    stateDisplayFavouritesDropMenu ?
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton

                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnDropMenu'}
                      actionFunction={onMenuFavourites}
                    >
                      <span>В избранном</span>
                      <Icons
                        name={'ArrowDown'}
                        class_name={'BtnDropMenuIcon'}
                      />
                    </ButtonDropMenu>
                  </div>
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
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnDropMenu'}
                      actionFunction={onMenuTemplates}
                    >
                      <span>Шаблоны</span>
                      <Icons
                        name={'ArrowDown'}
                        class_name={'BtnDropMenuIcon'}
                      />
                    </ButtonDropMenu>
                  </div>
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
              <ButtonDropMenu
                class_name={'BtnCreate'}
                actionFunction={onButtonCreate}
              >
                <span>Создать</span>
              </ButtonDropMenu>
            </div>

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
