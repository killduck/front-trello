import CardDropdownMenuIcon from '../CardDropdownMenuIcon/CardDropdownMenuIcon';

import styles from './DropDownMenuTemplates.module.scss';


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
            <li>
              <CardDropdownMenuIcon
                key={template.id}
                card={template}
                cardTheme={template.cardTheme}
                cardImg={template.cardImg}
              />
            </li>
          )
        }
      </ul>
    </div>
  )
};
