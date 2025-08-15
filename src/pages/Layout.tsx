import { Outlet } from "react-router-dom"
import Sidebar from "@/sections/Sidebar"

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
      
    </div>
  )
}
