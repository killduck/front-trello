import IconsSVG from './icons.svg';
import styles from './Icons.module.scss'

export default function Icons({ name, class_name, active_icon}) {

  return (
    <svg className={`${styles.Icons} ${styles[class_name]} ${styles[active_icon]}`}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
