import React from 'react'

import './style.css'
import { useNavigate } from 'react-router-dom'

interface ModalProps {
  isRegistered: boolean,
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean | null>>
  setIsModalOpen:boolean
}

const RegisterModal: React.FC<ModalProps> = ({ isRegistered, setIsRegistered,setIsModalOpen }) => {
  const navigate = useNavigate()

  let messageBig: string = isRegistered ? "You Registered Successfuly!" : "Registration Failed!"
  let messageSmall: string = isRegistered ? "Now you can log in and see your profile." : "The email address has been used"

  function btnOnClick(): void {
    if(isRegistered) {
      navigate('/login')
    } else {
      setIsRegistered(null);
      setIsModalOpen(false);
    }
  }

  return (
   
        <div className="modal_message_div">
          <p className={isRegistered ? `modal_message_big_success` : `modal_message_big_error`}>{messageBig}</p>
          <p className='modal_message_small'>{messageSmall}</p>
          <button onClick={btnOnClick} className='move_to_login'>{isRegistered ? "Log in" : "Back"}</button>
        </div>
  )
}

export default RegisterModal
