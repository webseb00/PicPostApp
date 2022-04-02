import { BrowserRouter } from "react-router-dom"
import { StateProvider } from "./context"

const AppRoot = ({ children }) => {
  return (
    <BrowserRouter>
      <StateProvider>
        {children}
      </StateProvider>
    </BrowserRouter>
  )
}

export default AppRoot