import { HashRouter } from "react-router-dom"
import { StateProvider } from "./context"
import { ToastContainer } from 'react-toastify';

const AppRoot = ({ children }) => {
  return (
    <HashRouter>
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
    </HashRouter>
  )
}

export default AppRoot