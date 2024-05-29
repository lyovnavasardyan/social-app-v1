
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import PhotosPage from './pages/PhotosSlice/PhotosPage'

//todo 1 create reusable form component
// todo create validation file config 
// todo create reusable button and input components.
//todo react hook form errorMessage component
// create axios request file, or class ,  get post put delet

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element= {<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/profile/photos' element={<PhotosPage />} />
      </Routes>
    </div>
  )
}

export default App
