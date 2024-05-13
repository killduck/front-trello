import IconsSVG from './icons.svg';

export default function Icons({ name, color, sizeLine, sizeWidth, sizeHeight, className}) {

  return (
    <svg className={`Svg${name} ${className}`} fill={color} stroke={color} strokeWidth={sizeLine} width={sizeWidth} height={sizeHeight}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
