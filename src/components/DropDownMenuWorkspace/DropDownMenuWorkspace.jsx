import CardDropdownMenu from '../CardDropdownMenu/CardDropdownMenu';

import styles from './DropDownMenuWorkspace.module.scss';


export default function DropDownMenuWorkspace(props) {
  return (
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
  )
};
