
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Photos from './pages/Photos/Photos'
import Photographers from './pages/Photographers/PhotographersPage'
import SlinglePhotographer from './pages/SinglePhotographer/singlePhotographer'
import Menu from './components/Menu/Menu'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Footer from './components/Footer/Footer'

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
        <Route path='/photographer/:userId' element={<SlinglePhotographer />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
