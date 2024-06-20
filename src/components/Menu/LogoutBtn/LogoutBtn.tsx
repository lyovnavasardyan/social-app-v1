import React from 'react'
import Button from '../../SmallComponents/Button/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOutAsync } from '../../../store/slices/loginSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logOutAsync())
        navigate('/login')
    }
    return (
        <Button
            onClick={handleLogout}
            text={'log out'}
        />
    )
}

export default LogoutBtn
