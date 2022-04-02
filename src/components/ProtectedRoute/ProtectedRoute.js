import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const location = useLocation();
  const profileObj = JSON.parse(localStorage.getItem('profileObj'));

  if(!profileObj || !profileObj?.sanityID) {
    return <Navigate to="/login" state={{ from: location }}  />;
  }
  
  return <Outlet />
}

export default ProtectedRoute