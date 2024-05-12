import IconsSVG from './icons.svg';
import styles from './Icons.module.scss'

export default function Icons({ name, class_name, color, sizeLine, sizeWidth, sizeHeight, }) {

  return (
    <svg className={styles[class_name]} fill={color} stroke={color} strokeWidth={sizeLine} width={sizeWidth} height={sizeHeight}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
