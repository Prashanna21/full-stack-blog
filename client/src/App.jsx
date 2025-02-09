import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-28 2xl:px-48'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App