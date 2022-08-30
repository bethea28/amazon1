import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppbarPrivate from "../../Components/Navbar/AppbarPrivate";
import AppbarPublic from "../../Components/Navbar/AppbarPublic";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useParams } from "react-router-dom";

const Layout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { id } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn && location.pathname == "/login") {
      navigate("/");
    }
    if (isLoggedIn && id != location.pathname.split("/")[2]) {
      navigate("/allprojects");
    }
  }, []);

  return (
    <>
      {isLoggedIn ? <AppbarPrivate /> : <AppbarPublic />}
      <Outlet />
    </>
  );
};
export default Layout;
