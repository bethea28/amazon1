import { Outlet } from 'react-router-dom';
import AppbarPrivate from "./Navbar/AppbarPrivate";
import AppbarPublic from "./Navbar/AppbarPublic";
import { useContext } from "react";
import { AuthContext } from '../Context/AuthProvider'

const Layout = () => {

  const { isLoggedIn } = useContext(AuthContext)
  
  return (
    <>
      {isLoggedIn
      ? <AppbarPrivate/>
      : <AppbarPublic/>
      }
      <Outlet/>
    </>
  )
}
export default Layout