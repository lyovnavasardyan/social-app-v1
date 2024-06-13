import React from 'react'

import './style.css'
import { ImageType } from './type'

const Image: React.FC<ImageType> = ({url, alt, className}) => {
  return (
    <img src={url} className={className} alt={alt} />
  )
}

export default Image
