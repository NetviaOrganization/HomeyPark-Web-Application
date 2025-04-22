import { Outlet } from 'react-router'
import Sidebar from '../shared/components/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
