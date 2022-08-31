import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AppbarPrivate from "../../Components/Navbar/AppbarPrivate";
import AppbarPublic from "../../Components/Navbar/AppbarPublic";
import { useContext, useEffect } from "react";
import { AuthContext } from '../../Context/AuthProvider'

const Layout = () => {

  const { isLoggedIn } = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && location.pathname == '/login') {
      navigate("/");
    }
  }, [])

  return (
    <>{
      isLoggedIn
        ? <AppbarPrivate />
        : <AppbarPublic />
    }
      <Outlet />
    </>
  )
}
export default Layout