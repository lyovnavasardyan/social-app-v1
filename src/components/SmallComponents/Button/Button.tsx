import React from 'react'
import { ButtonType } from './type'

const Button: React.FC<ButtonType> = ({
    color, bgColor, size = 'medium'
}) => {



    return (
        <button
        className={`
            ${size === 'small' && 'button_small'}
        `}
         style={{
            color,
            backgroundColor: bgColor
        }}>
            Button
        </button>
    )
}

export default Button
