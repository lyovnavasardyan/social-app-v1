import React from 'react'

import './style.css'
import { menuButtonsInfo } from '../../../config/config'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()

    return (
        <nav>
            {
                menuButtonsInfo.map((button) => {
                    let { id } = button

                    return <button
                        key={id}
                        className={button.className}
                        onClick={() => navigate(button.path)}
                    >{button.text}</button>
                })
            }
        </nav>
    )
}

export default Nav
