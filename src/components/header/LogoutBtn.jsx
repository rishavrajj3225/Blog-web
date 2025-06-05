import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler  = async () => {
        await authService.logout().then(()=>{
            dispatch(logout())
        })
    }
return (
    <button
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-pink-500 hover:to-purple-500 transition-all duration-300 font-semibold"
    >
        Logout
    </button>
)
}

export default LogoutBtn