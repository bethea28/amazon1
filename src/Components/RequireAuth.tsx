import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import AuthService from '../Services/AuthService'
import AppbarPublic from "./Navbar/AppbarPublic";
import { AuthContext, AuthProvider, AuthData } from '../Context/AuthProvider'

const RequireAuth = () => {

  const { isLoggedIn, setAuthData } = useContext(AuthContext)
  const location = useLocation();

  return(
    isLoggedIn
    ? (<Outlet/>)
    : (< Navigate to ="/login" state={{from: location}} replace />)
  )  
}
export default RequireAuth