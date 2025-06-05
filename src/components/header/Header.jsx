import React from 'react'
import {Loader, Logo, LogoutBtn,Container} from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems=[
    {name:'Home',slug:'/',active:true},
    {name:'Login',slug:'/login',active:!authStatus},
    {name:'Signup',slug:'/signup',active:!authStatus},
    {name:'All Posts',slug:'/all-posts',active:authStatus},
    {name:'Add Post',slug:'/add-post',active:authStatus},

  ]
  return (
  <header className="bg-white shadow-md">
    <Container> 
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo width="100px" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              item.active && (
                <li key={item.name}>
                  <button className="text-gray-900 hover:text-gray-700"
                   onClick={() => {
                    navigate(item.slug)
                   }}>
                    {item.name}
                  </button>
                </li>
              )
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul> 
        </div>
      </nav>
    </Container>
  </header>
  )
}

export default Header