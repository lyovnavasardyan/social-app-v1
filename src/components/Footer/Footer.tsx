import React from 'react'

import './style.css'
import { menuButtonsInfo } from '../../config/config'

const Footer: React.FC = () => {
  return (
    <footer>
        <ul className='footer_menu'>
            {
                menuButtonsInfo?.map(btn => {
                    return <a key={btn.id} href={btn.path}>{btn.text}</a>
                })
            }
        </ul>
        <p>CopyRight 2024. Socail App V1</p>
    </footer>
  )
}

export default Footer
