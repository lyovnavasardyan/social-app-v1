
import React from 'react'
import './style.css'
import { Rootstate } from '../../store/store'
import { buttonsInfo } from './Buttons'
import { useCustomSelector } from '../../customHooks/customHooks'
import { useNavigate } from 'react-router-dom'



const LandingPage: React.FC = () => {
  const { title } = useCustomSelector((state: Rootstate) => state.landingData)
  const navigate = useNavigate()

  function renderNav() {
      return (
        <nav>
          {
            buttonsInfo.map((info) => {
              return (
                <button onClick={() => navigate(info.path)} className={info.className} key={info.id}>{info.text}</button>
              )
            })
          }
        </nav>
      )
  }

  return (
    <div className="landing_page_div">
      <h2>{title}</h2>
      {renderNav()}
    </div>
  )
}

export default LandingPage
