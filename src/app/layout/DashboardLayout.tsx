import { Outlet } from 'react-router'
import Sidebar from '../shared/components/Sidebar'
import Footer from '../shared/components/Footer'

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-full flex">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout
