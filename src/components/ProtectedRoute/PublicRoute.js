import { Navigate, Outlet } from "react-router-dom";

const useAuth=()=>{
  const profile = localStorage.getItem('profileObj')
  if(profile) { return true; } 
  else { return false; }
}

const PublicRoute = ({ profile }) => {
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute