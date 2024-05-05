import React from 'react';

import IconsSVG from './icons.svg';

export default function Icons({name, color, sizeWidth, sizeHeight, className}) {

  return(
    <svg className={`Icon${name} ${className}`} fill={color} stroke={color} width={sizeWidth} height={sizeHeight}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}
