import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "@/sections/Sidebar"
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Layout() {
  const { pathname } = useLocation(); 
  const title = pathname.split('/').pop() || 'Dashboard';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 overflow-auto">
        <div className="w-full p-4 mb-2 bg-white shadow-md flex items-center gap-2">
          <Button variant="outline" size="icon" className="hover:bg-gray-200 rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={25} className="cursor-pointer" />
          </Button>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="px-8 mt-8">
          <Outlet />
        </div>
      </div>      
    </div>
  )
}
