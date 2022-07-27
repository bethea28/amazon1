import { useLocation, Navigate, Outlet} from "react-router-dom"
import { AuthContext } from "../Context/AuthProvider"
import { useContext } from "react"

const RequireAuth= () => {
  
  const location = useLocation();
  const { id, token, setAuthData } = useContext(AuthContext)

  return (
    id
    ? <Outlet/>
    : < Navigate to ="/login" state={{from: location}} replace />
    
  );
}
export default RequireAuth