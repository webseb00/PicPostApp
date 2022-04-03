import {
  Routes,
  Route,
} from "react-router-dom";
import { 
  Login, 
  Home, 
  PicsContainer,
  PicPostDetails, 
  CreatePic,
  UserProfile,
  NotFoundPage, 
  ProtectedRoute 
} from './components/index'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home component={<PicsContainer />} searchBar={true} />}>
          <Route path="/category/:slug" element={<Home component={<PicsContainer />} />} />
        </Route>
        <Route path="/pic-post/:id" element={<Home component={<PicPostDetails />} searchBar={true} />}/>
        <Route path="/user-profile/:id" element={<Home component={<UserProfile />} searchBar={false} />}/>
        <Route path="/create-pic" element={<Home component={<CreatePic />} searchBar={false} />} /> 
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;
