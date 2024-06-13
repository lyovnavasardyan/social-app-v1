import React from 'react'

import './style.css'
import { menuButtonsInfo } from '../../../config/config'
import { useNavigate } from 'react-router-dom'
import Button from '../../SmallComponents/Button/Button'

const Nav = () => {
    const navigate = useNavigate()

    return (
        <nav>
            {
                menuButtonsInfo.map((button) => {

                    return <Button
                        key={button.id}
                        text={button.text}
                        color='mediumslateblue'
                        bgColor='white'
                        size='large'
                        usage='menu'
                        onClick={() => navigate(button.path)}
                    />

                })
            }
        </nav>
    )
}

export default Nav
