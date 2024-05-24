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
            <li key={template.id}>
              <CardDropdownMenuIcon
                card={template}
              />
            </li>
          )
        }
      </ul>
    </div>
  )
};
