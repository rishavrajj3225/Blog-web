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
    <>
      <Header />
      <main>
       TODO: <Outlet />
      </main>
      <Footer />
    </>
  )


}

export default App
