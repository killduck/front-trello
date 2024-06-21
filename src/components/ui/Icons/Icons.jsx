import IconsSVG from './icons.svg';
import styles from './Icons.module.scss'

export default function Icons({ 
  name, 
  class_name, 
  active_icon, 
  color, sizeLine, 
  sizeWidth, 
  sizeHeight, 
  className // нужно разобраться зачем тут className ???
}) {
  return (
    <svg className={`${styles.Icons} ${className} ${styles[class_name]} ${styles[active_icon]}`} fill={color} stroke={color} strokeWidth={sizeLine} width={sizeWidth} height={sizeHeight}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
