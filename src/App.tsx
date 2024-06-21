
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import PhotosPage from './pages/PhotosPage/PhotosPage'
import Photos from './pages/Photos/Photos'
import Photographers from './pages/Photographers/PhotographersPage'
import SlinglePhotographer from './pages/SinglePhotographer/singlePhotographer'
import Menu from './components/Menu/Menu'
import ProfilePhoto from './pages/ProfilePhoto/profilePhoto'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

export const token = localStorage.getItem('jwtToken')

function App() {


  return (
    <div className='App'>
      <Menu />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/photographers' element={<Photographers />} />
        <Route path='/photographers/:page' element={<Photographers />} />
        <Route path='/photographers/:categoryId/:page' element={<Photographers />} />
        <Route path='/photographer/:userId' element={<SlinglePhotographer />} />
      </Routes>
    </div>
  )
}

export default App
