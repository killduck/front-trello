import styles from './WorkspaceDropMenu.module.scss'

export default function WorkspaceDropMenu(props) {
  return (
    <div>
      <div className={styles.TitleText}>Ваши рабочие пространства</div>
      <div className={styles.TitleText}>Гостевые рабочие пространства</div>
    </div>
  )
};
