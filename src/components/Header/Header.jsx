import { useState, useEffect } from 'react'

import * as api from '../../api/api';
import request from "../../api/request";

import ButtonDropMenu from '../ui/ButtonDropMenu/ButtonDropMenu';
import DropDownMenuKebab from '../DropDownMenuKebab/DropDownMenuKebab';
import DropDownMenuFavourite from '../DropDownMenuFavourite/DropDownMenuFavourite';
import DropDownMenuRecent from '../DropDownMenuRecent/DropDownMenuRecent';
import DropDownMenuTemplates from '../DropDownMenuTemplates/DropDownMenuTemplates';
import DropDownMenuWorkspace from '../DropDownMenuWorkspace/DropDownMenuWorkspace';
import Icons from '../ui/Icons/Icons';
import Input from '../ui/Input/Input';
import Notification from '../ui/NotificateBTN/Notification';

import styles from './Header.module.scss';

import { NavLink } from 'react-router-dom';
import MemberMenu from '../MemberMenu/MemberMenu';

export default function Header(props) {

  let [authorized_user, setAuthorizedUser] = useState({});

  useEffect(() => {
    request({
      method: 'GET',
      url: 'user/',
      callback: (response) => {
        if (response.status === 200) {
          setAuthorizedUser(response.data);
        }
      },
      data: null,
      status: 200,
    })
  }, [])

  // состояние для Favorites в карточках Workspace
  let [stateBoardsList, setBoardsList] = useState(api.boards_recent);

  let [showMemberMenu, setMemberMenu] = useState(false);


  // состояние для открытия/закрытия выпадающих меню в header
  let [stateActiveDropMenu, setActiveDropMenu] = useState(
    {
      'BtnActiveKebabDropMenu': false,
      'BtnActiveWorkspaceDropMenu': false,
      'BtnActiveRecentDropMenu': false,
      'BtnActiveFavouritesDropMenu': false,
      'BtnActiveTemplatesDropMenu': false,
    }
  );


  function onRemoving_active_menu(name_state = null) {

    let state_switch = {};

    for (let key in stateActiveDropMenu) {

      if (name_state === key) {
        stateActiveDropMenu[key] ?
          state_switch[key] = false
          :
          state_switch[key] = true
      }
      else {
        state_switch[key] = false;
      }

    }

    setActiveDropMenu(state_switch);
  }

  function onRemoving_all_menu(event) {
    // console.log('event->', event);

    // Временное решение и конечно мне за этот костыль стыдно )))
    if (event.clientX > 785) {
      onRemoving_active_menu();
    }
  }

  function onAddFavoriteStar(id) {

    let new_boards_list = [];

    stateBoardsList.forEach((card) => {

      if (card.id === id) {
        card.favorites ? card.favorites = false : card.favorites = true;
        new_boards_list.push(card);
      }
      else {
        new_boards_list.push(card);
      }

    })

    setBoardsList(new_boards_list);
  }

  function onCreate() {
    console.log('Проверка выполения функции =>', onCreate.name);
  }

  function funkMemberMenu() {
    if (showMemberMenu) {
      setMemberMenu(false);
      return;
    }
    setMemberMenu(true);
  }

  return (

    <div
      className={styles.Header}
      onClick={(event) => onRemoving_all_menu(event)}
    >

      <nav className={styles.Navigation}>

        <div className={styles.KebabMenu}>
          <div
            className={
              stateActiveDropMenu['BtnActiveKebabDropMenu'] ?
                `${styles.MenuButton} ${styles.MenuButtonActive}`
                :
                styles.MenuButton
            }
          >
            <div className={styles.MenuTextIconActive}>
              <ButtonDropMenu
                class_name={'BtnActiveKebabDropMenu'}
                actionFunction={onRemoving_active_menu}
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
              stateActiveDropMenu['BtnActiveKebabDropMenu'] ?
                styles.KebabDropDownMenu
                :
                styles.NoneDisplay
            }
          >
            <DropDownMenuKebab />
          </div>
        </div>

        <NavLink to='/' className={styles.LogoWrap}>
          <ButtonDropMenu
            class_name={'BtnActiveLogoDropMenu'}
            actionFunction={onRemoving_active_menu}
          >
            <div className={styles.Logo}></div>
          </ButtonDropMenu>
        </NavLink>

        <div className={styles.CenterMenu}>
          <div className={styles.CenterMenuWrap}>
            <div className={styles.DropDownMenu}>
              <div className={styles.MenuWorkspace}>
                <div
                  className={
                    stateActiveDropMenu['BtnActiveWorkspaceDropMenu'] ?
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnActiveWorkspaceDropMenu'}
                      actionFunction={onRemoving_active_menu}
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
                    stateActiveDropMenu['BtnActiveWorkspaceDropMenu'] ?
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
                    stateActiveDropMenu['BtnActiveRecentDropMenu'] ?
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnActiveRecentDropMenu'}
                      actionFunction={onRemoving_active_menu}
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
                    stateActiveDropMenu['BtnActiveRecentDropMenu'] ?
                      styles.RecentDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <DropDownMenuRecent
                    data={stateBoardsList}
                    actionFunction={onAddFavoriteStar}
                  />
                </div>
              </div>

              <div className={styles.MenuFavourites}>
                <div
                  className={
                    stateActiveDropMenu['BtnActiveFavouritesDropMenu'] ?
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnActiveFavouritesDropMenu'}
                      actionFunction={onRemoving_active_menu}
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
                    stateActiveDropMenu['BtnActiveFavouritesDropMenu'] ?
                      styles.FavouritesDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <DropDownMenuFavourite
                    data={stateBoardsList}
                    actionFunction={onAddFavoriteStar}
                  />
                </div>
              </div>

              <div className={styles.MenuTemplates}>
                <div
                  className={
                    stateActiveDropMenu['onRemoving_active_menu'] ?
                      `${styles.MenuButton} ${styles.MenuButtonActive}`
                      :
                      styles.MenuButton
                  }
                >
                  <div className={styles.MenuTextIconActive}>
                    <ButtonDropMenu
                      class_name={'BtnActiveTemplatesDropMenu'}
                      actionFunction={onRemoving_active_menu}
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
                    stateActiveDropMenu['BtnActiveTemplatesDropMenu'] ?
                      styles.TemplatesDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <DropDownMenuTemplates
                    data={api.templates}
                  />
                </div>
              </div>

            </div>

            <div
              className={styles.ButtonCreate}
              onClick={onRemoving_active_menu}
            >
              <ButtonDropMenu
                class_name={'BtnCreate'}
                actionFunction={onCreate}
              >
                <span>Создать</span>
              </ButtonDropMenu>
            </div>

          </div>
        </div>

        <div className={styles.RightMenu}>
          <div className={styles.blockSearch}>
            <Icons className={styles.Loupe} name={'Loupe'} />
            <Input type="text" placeholder="Поиск" maxLength="500" />
          </div>

          <div className={styles.blockNotification}>
            <Notification
              clickAction={funkMemberMenu}
              user={authorized_user}
            >
              {/* <img src={'/img/no_name.png'} alt="" /> */}
            </Notification>

            <MemberMenu
              authorized_user={authorized_user}
              swowMenu={showMemberMenu}
            />

          </div>
        </div>
      </nav >

    </div >
  )
};
