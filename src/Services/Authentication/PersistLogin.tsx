import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthProvider'
import AuthService from "./AuthService";
import Typography from "@mui/material/Typography";

const PersistLogin = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, id, token, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    console.log("persit called")
    const verifyUser = async () => {
      try {
        const verified = await AuthService.isLogged();
        setAuthData(prevState => {
          return {...prevState, isLoggedIn: verified}
        })
        if(verified){
          const user = await AuthService.getCurrentUser()
          setAuthData(prevState => {
            return {...prevState, id: user.userId, token: user.jwt }
          })
        }
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
    <> {
      isLoading
        ? <Typography>Loading...</Typography>
        : <Outlet/>
      }
    </>
  )
}

export default PersistLogin