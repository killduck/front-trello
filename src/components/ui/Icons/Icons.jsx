import IconsSVG from './icons.svg';
import styles from './Icons.module.scss'

export default function Icons({ name, class_name, active_icon, color, sizeLine, sizeWidth, sizeHeight, className}) {

  return (
    <svg className={class_name? `${styles.Icons} ${className} ${styles[class_name]} ${styles[active_icon]}` : ''} fill={color} stroke={color} strokeWidth={sizeLine} width={sizeWidth} height={sizeHeight}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
