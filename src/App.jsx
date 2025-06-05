import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { Header,Footer,Loader } from './components/index'
import {login,logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'




function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout()); // humesha state update hi rahega
        }
      })
      .finally(() => {
        setLoading(false);
      }); // finally is used to execute code after the promise is settled, regardless of its outcome
  }, []);

  if (loading) {
    return <>
    <Loader/>
    </>
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
