import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {

  const location = useLocation();
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }}  />;
}

export default ProtectedRoute