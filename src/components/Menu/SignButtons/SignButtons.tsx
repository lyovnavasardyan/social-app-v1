import React from 'react'
import { buttonsInfo } from '../../../config/config'
import { useNavigate } from 'react-router-dom'

import './style.css'

const SignButtons = () => {
    const navigate = useNavigate()

    return (
        <div className='sign_buttons_div'>
            {
                buttonsInfo.map((info) => {
                    return (
                        <button onClick={() => navigate(info.path)} className={info.className} key={info.id}>{info.text}</button>
                    )
                })
            }
        </div>
    )
}

export default SignButtons
