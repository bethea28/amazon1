import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthProvider'
import AuthService from "../../Services/AuthService";
import AppbarPrivate from "../../Components/Navbar/AppbarPrivate";
import AppbarPublic from "../../Components/Navbar/AppbarPublic";
import UserProfileService from '../../Services/UserProfileService';
import Dashboard from "../../Routes/Dashboard/Dashboard";

const Home = () => {
  
  const { isLoggedIn, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    try {
      const token = await AuthService.getCurrentUser()
      const response = await UserProfileService.getUserProfile(token.id, token.jwt)
      setAuthData(prevState => {
        return {...prevState, ['isLoggedIn']: true}
      })
    }catch (err){
      setAuthData(prevState => {
        return {...prevState, ['isLoggedIn']: false}
      })
    }

  }

  return (
    <>
    {isLoggedIn
    ? <AppbarPrivate/>
    : <AppbarPublic/>
    }
    <Dashboard/>
    </>
  )
}

export default Home