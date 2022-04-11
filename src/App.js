import { useState, useEffect } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import { 
  Login, 
  Home, 
  PicsContainer,
  PicPostDetails, 
  CreatePic,
  UserProfile,
  ProtectedRoute,
  PublicRoute
} from './components/index'
import { useStateContext } from "./context";

function App() {
  const { userGoogle: { sanityID } } = useStateContext();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(sanityID) setIsLogin(true);
  }, [sanityID]);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="login" element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      {/* PROTECTED ROUTES FOR LOGGED USERS */}
      <Route path="/" element={<ProtectedRoute user={isLogin} />}>
        <Route path="/" element={<Home component={<PicsContainer />} searchBar={true} />} />
        <Route path="/category/:slug" element={<Home component={<PicsContainer />} />} searchBar={true} />
        <Route path="/pic-post/:id" element={<Home component={<PicPostDetails />} searchBar={true} />}/>
        <Route path="/user-profile/:id" element={<Home component={<UserProfile />} searchBar={false} />}/>
        <Route path="/create-pic" element={<Home component={<CreatePic />} searchBar={false} />} /> 
      </Route>
    </Routes>
  )
}

export default App;
