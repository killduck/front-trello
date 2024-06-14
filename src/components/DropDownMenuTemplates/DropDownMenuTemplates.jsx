
import CardDropdownMenuIcon from '../CardDropdownMenuIcon/CardDropdownMenuIcon';

import styles from './DropDownMenuTemplates.module.scss';

import { NavLink } from 'react-router-dom';

export default function DropDownMenuTemplates(props) {

  let templates = props.data;


  return (
    <div className={styles.TemplatesDropDownMenu_Wrap}>
      <div className={styles.TitleText}>
        Популярные шаблоны
      </div>

      <ul>
        {
          templates.map((template, index) =>
            <li key={template.id}>

              <NavLink to='/templates' className={styles.CardDropdownMenuIcon} >
                <CardDropdownMenuIcon
                  card={template}
                />
              </NavLink>

            </li>
          )
        }
      </ul>

    </div>
  )
};
