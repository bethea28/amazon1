import Appbar from "../Navbar/Appbar";
import AppbarPublic from "../Navbar/AppbarPublic";

export default function Home() {
  const userLoggedIn = true

  return (
    userLoggedIn ? <Appbar /> : <AppbarPublic />
  );
}