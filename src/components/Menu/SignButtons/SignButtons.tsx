import { buttonsInfo } from '../../../config/config'
import { useNavigate } from 'react-router-dom'

import './style.css'
import Button from '../../SmallComponents/Button/Button'

const SignButtons = () => {
    const navigate = useNavigate()

    return (
        <div className='sign_buttons_div'>
            {
                buttonsInfo.map((info) => {
                    return (
                        
                        <Button 
                            key={info.id}
                            size='large'
                            width='100px'
                            bgColor={info.bgColor}
                            color={info.color}
                            onClick={() => navigate(info.path)}
                            text={info.text}
                        />
                    )
                })
            }
        </div>
    )
}

export default SignButtons
