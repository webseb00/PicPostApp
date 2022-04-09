import { BrowserRouter } from "react-router-dom"
import { StateProvider } from "./context"
import { ToastContainer } from 'react-toastify';

const AppRoot = ({ children }) => {
  return (
    <BrowserRouter>
      <StateProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored" 
        />
      </StateProvider>
    </BrowserRouter>
  )
}

export default AppRoot