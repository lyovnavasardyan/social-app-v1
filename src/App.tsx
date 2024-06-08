
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import PhotosPage from './pages/PhotosPage/PhotosPage'
import Photos from './pages/Photos/Photos'
import Photographers from './pages/Photographers/PhotographersPage'
import ClickedPhotographer from './pages/SinglePhotographer/singlePhotographer'
import Menu from './components/Menu/Menu'

//todo 1 create reusable form component
// todo create validation file config 
// todo create reusable button and input components.
//todo react hook form errorMessage component
// create axios request file, or class ,  get post put delet

function App() {

  return (
    <div className='App'>
      <Menu />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/photos' element={<PhotosPage />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/photographers' element={<Photographers />} />
        <Route path='/photographer/:userId' element={<ClickedPhotographer />} />
      </Routes>
    </div>
  )
}

export default App
