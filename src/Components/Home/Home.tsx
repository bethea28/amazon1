import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthProvider'
import AuthService from "../../Services/AuthService";
import AppbarPrivate from "../../Components/Navbar/AppbarPrivate";
import AppbarPublic from "../../Components/Navbar/AppbarPublic";

const Home = () => {
  
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
    ? <AppbarPrivate/>
    : <AppbarPublic/>
    }
    </>
  )
}

export default Home