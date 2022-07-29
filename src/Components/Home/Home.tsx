import {useState, useEffect, useContext } from "react";
import AppbarPrivate from "../Navbar/AppbarPrivate";
import AppbarPublic from "../Navbar/AppbarPublic";
import AuthService from '../../Services/AuthService'

export default function Home() {

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    isLogged()
  }, [loggedIn])


  const isLogged = async () => {
    setLoggedIn(await AuthService.isLogged())
  }

  return (
    {loggedIn}
    ? <AppbarPrivate />
    : <AppbarPublic />
  );
}