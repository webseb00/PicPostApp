import { Navigate, Outlet } from "react-router-dom";

const useAuth=()=>{
  const profile = localStorage.getItem('profileObj')
  if(profile){ return true; } 
  else { return false; }
}

const ProtectedRoute = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute