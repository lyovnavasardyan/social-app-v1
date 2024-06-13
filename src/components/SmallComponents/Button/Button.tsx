import React from 'react'
import { ButtonType } from './type'
import './style.css'

const Button: React.FC<ButtonType> = ({
    className,
    width,
    height,
    text = 'button',
    color,
    bgColor,
    size = 'medium',
    usage = 'button',
    onClick
}) => {



    return (
        <button
            onClick={onClick}
            className={`
            ${className}
            ${size == 'small' ? 'button_small' : size == 'large' ? 'button_large' : 'button_medium'}
            ${usage == "menu" ? 'usage_menu' : usage == 'pagination' ? 'usage_pagination' : 'usage_button'}
            button_component
            `}
            style={{
                color,
                backgroundColor: bgColor,
                width: width,
                height: height
            }}>
            {text}
        </button>
    )
}


export default Button
