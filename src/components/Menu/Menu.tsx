
import React from 'react'
import './style.css'
import { Rootstate } from '../../store/store'

import { useCustomSelector } from '../../customHooks/customHooks'
import SignButtons from './SignButtons/SignButtons'
import Nav from './Nav/Nav'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn/LogoutBtn'
import { useSelector } from 'react-redux'
import { authSelector } from '../../store/slices/loginSlice'



const Menu: React.FC = () => {
  const { title } = useCustomSelector((state: Rootstate) => state.landingData)
  const isAuthentificated = useSelector(authSelector)
  const navigate = useNavigate()

  return (
    <div className="menu_div">
      <h2 onClick={() => navigate('/')}>{title}</h2>
      <Nav />
      {isAuthentificated ? <LogoutBtn /> : <SignButtons />}
    </div>
  )
}

export default Menu
