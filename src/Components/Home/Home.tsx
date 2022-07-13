import AppbarPrivate from "../Navbar/AppbarPrivate";
import AppbarPublic from "../Navbar/AppbarPublic";

export default function Home() {
  const userLoggedIn = true

  return (
    userLoggedIn ? <AppbarPrivate /> : <AppbarPublic />
  );
}