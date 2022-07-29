import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from '../Context/AuthProvider'

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