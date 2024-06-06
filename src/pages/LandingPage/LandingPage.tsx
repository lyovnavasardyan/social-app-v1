
import React from 'react'
import './style.css'
import { Rootstate } from '../../store/store'

import { useCustomSelector } from '../../customHooks/customHooks'
import SignButtons from './SignButtons/SignButtons'
import Nav from './Nav/Nav'



const LandingPage: React.FC = () => {
  const { title } = useCustomSelector((state: Rootstate) => state.landingData)

  return (
    <div className="landing_page_div">
      <h2>{title}</h2>
      <Nav />
      <SignButtons />
    </div>
  )
}

export default LandingPage
