import { useState } from 'react'

import * as api from '../../api/api';

import ButtonDropMenu from '../ui/ButtonDropMenu/ButtonDropMenu';
import DropDownMenuKebab from '../DropDownMenuKebab/DropDownMenuKebab';
import DropDownMenuFavourite from '../DropDownMenuFavourite/DropDownMenuFavourite';
import DropDownMenuRecent from '../DropDownMenuRecent/DropDownMenuRecent';
import DropDownMenuWorkspace from '../DropDownMenuWorkspace/DropDownMenuWorkspace';
import DropDownMenuTemplates from '../DropDownMenuTemplates/DropDownMenuTemplates';
import Icons from '../ui/Icons/Icons';
import Notification from '../ui/NotificateBTN/Notification';
import Search from '../Search/Search';

import styles from './Header.module.scss';


export default function Header(props) {

  // let [stateFavouriteStar, setStateFavouriteStar] = useState(false);

  // состояние для Favorites рабочиз пространств
  let [stateBoardsRecent, setBoardsRecent] = useState(api.boards_recent);

  // состояние для открытия/закрытия выпадающих меню в header
  let [stateActiveDropMenu, setActiveDropMenu] = useState(
    {
      'KebabDownMenu': false,
      'WorkspaceDownMenu': false,
      'RecentDownMenu': false,
      'FavouritesDownMenu': false,
      'TemplatesDownMenu': false,
    }
  );

  function onKebabMenu() {
    console.log('Выполняется функция =>', onKebabMenu.name);

    removing_active_menu('KebabDownMenu');
  }

  function onMenuWorkspace() {
    console.log('Выполняется функция =>', onMenuWorkspace.name);

    removing_active_menu('WorkspaceDownMenu');
  }

  function onMenuRecent() {
    console.log('Выполняется функция =>', onMenuRecent.name);

    removing_active_menu('RecentDownMenu');
  }

  function onMenuFavourites() {
    console.log('Выполняется функция =>', onMenuFavourites.name);

    removing_active_menu('FavouritesDownMenu');
  }

  function onMenuTemplates() {
    console.log('Выполняется функция =>', onMenuTemplates.name);

    removing_active_menu('TemplatesDownMenu');
  }

  function onButtonCreate() {
    console.log('Выполняется функция =>', onButtonCreate.name);

    removing_active_menu();
  }

  function onAddFavoriteStar(id) {
    console.log('Проверка выполения функции =>', onAddFavoriteStar.name);
    console.log('приходит id =>', id);

    let new_boards_recent = [];

    stateBoardsRecent.forEach((card) => {
      console.log(card)

      if (card.id === id) {

        card.favorites ? card.favorites = false : card.favorites = true;

        new_boards_recent.push(card);
      }
      else {
        new_boards_recent.push(card);
      }
    })

    setBoardsRecent(new_boards_recent);

  }


  function removing_active_menu(name_state = null) {

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
    console.log('Выполняется функция =>', onRemoving_all_menu.name);
    // console.log(event);

    if (event.clientX > 785) {
      removing_active_menu();
    }
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
              stateActiveDropMenu['KebabDownMenu'] ?
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
              stateActiveDropMenu['KebabDownMenu'] ?
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
                    stateActiveDropMenu['WorkspaceDownMenu'] ?
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
                    stateActiveDropMenu['WorkspaceDownMenu'] ?
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
                    stateActiveDropMenu['RecentDownMenu'] ?
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
                    stateActiveDropMenu['RecentDownMenu'] ?
                      styles.RecentDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <DropDownMenuRecent
                    data={stateBoardsRecent}
                    actionFunction={onAddFavoriteStar}
                  />
                </div>
              </div>

              <div className={styles.MenuFavourites}>
                <div
                  className={
                    stateActiveDropMenu['FavouritesDownMenu'] ?
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
                    stateActiveDropMenu['FavouritesDownMenu'] ?
                      styles.FavouritesDropDownMenu
                      :
                      styles.NoneDisplay
                  }
                >
                  <DropDownMenuFavourite
                    data={stateBoardsRecent}
                    actionFunction={onAddFavoriteStar}
                  />
                </div>
              </div>

              <div className={styles.MenuTemplates}>
                <div
                  className={
                    stateActiveDropMenu['TemplatesDownMenu'] ?
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
                    stateActiveDropMenu['TemplatesDownMenu'] ?
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
