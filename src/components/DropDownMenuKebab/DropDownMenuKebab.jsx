import Icons from '../ui/Icons/Icons';

import styles from './DropDownMenuKebab.module.scss';


export default function DropDownMenuKebab(props) {
  return (
    <div className={styles.KebabDropDownMenu_Wrap}>
      <div className={styles.TitleText}>
        {'ваши приложения'.toUpperCase()}
      </div>
      <ul>
        <li>
          <a className={styles.KebabMenu_Card} href="#">
            <div className={styles.Card_Icon}>
              <Icons
                name={'Atlassian'}
                class_name={'AtlassianIcon'}
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
                class_name={'Trello'}
              />
            </div>
            <div className={styles.Card_Text}>Trello</div>
          </a>
        </li>
      </ul>
      <div className={styles.TitleText}>
        {'поиск'.toUpperCase()}
      </div>
      <ul>
        <li>
          <a className={styles.KebabMenu_Card} href="#">
            <div className={styles.Card_Icon}>
              <Icons
                name={'Atlassian'}
                class_name={'AtlassianIcon'}
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
  )
};
