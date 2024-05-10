import IconsSVG from './icons.svg';

export default function Icons({ name, color, sizeLine, sizeWidth, sizeHeight, }) {

  return (
    <svg className={`Svg${name}`} fill={color} stroke={color} stroke-width={sizeLine} width={sizeWidth} height={sizeHeight}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
