import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthProvider'
import AuthService from "./AuthService";

const PersistLogin = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const verified = await AuthService.isLogged();
        setAuthData(prevState => {
          return {...prevState, ['isLoggedIn']: verified}
        })
      }
      catch (err) {
        setAuthData(prevState => {
          return {...prevState, ['isLoggedIn']: false}
        })
        console.error(err);
      }
      finally {
        setIsLoading(false);
      }
    }

    !isLoggedIn ? verifyUser() : setIsLoading(false)

  }, [])

  return (
    <>
    {isLoading
    ? <p>Loading...</p>
    : <Outlet/>
    }
    </>
  )
}

export default PersistLogin