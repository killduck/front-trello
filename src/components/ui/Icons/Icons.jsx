import IconsSVG from './icons.svg';
import styles from './Icons.module.scss'

export default function Icons({ name, class_name}) {

  return (
    <svg className={`${styles.Icons} ${styles[class_name]}`}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
