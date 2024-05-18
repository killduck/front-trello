import { useState } from 'react'

import * as api from '../../api/api';

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


export default function Header(props) {

  // состояние для Favorites в карточках Workspace
  let [stateBoardsList, setBoardsList] = useState(api.boards_recent);

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
    // console.log(event);

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

            <div className={styles.ButtonCreate}>
              <ButtonDropMenu
                class_name={'BtnCreate'}
                actionFunction={onRemoving_active_menu}
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
            <Notification>
              <img src={'img/no_name.png'} alt="" />
            </Notification>
          </div>
        </div>


      </nav >


    </div >
  )
};
