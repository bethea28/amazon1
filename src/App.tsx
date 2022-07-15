import React from "react";
import AppbarPrivate from "./Components/Navbar/AppbarPrivate";
import AppbarPublic from "./Components/Navbar/AppbarPublic";

export default function App() {
  const userLoggedIn = false
  return (
    userLoggedIn ? <AppbarPrivate /> : <AppbarPublic />
  );
}
