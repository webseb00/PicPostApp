import {
  Routes,
  Route,
} from "react-router-dom";

import { Login, Home, NotFoundPage, ProtectedRoute } from './components/index'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="category/:id" />
        <Route path="post/:id" />
        <Route path="user-profile/:id" /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;
