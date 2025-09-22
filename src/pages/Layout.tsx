import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "@/sections/Sidebar"
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { pageNames } from "@/services/staticNames";
export default function Layout() {
  const { pathname } = useLocation(); 
  const title = pageNames[pathname.split('/').pop() as keyof typeof pageNames]?.name || pageNames.dashboard.name;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex-1 overflow-auto `}>
        <div className="w-full p-4 mb-2 bg-white shadow-md flex items-center gap-2 sticky top-0 z-10">
          <Button variant="outline" size="icon" className="hover:bg-gray-200 hover:cursor-pointer rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={25} className="cursor-pointer" />
          </Button>
          <h1 className="text-2xl font-bold capitalize">{title}</h1>
        </div>
        <div className="md:px-8 px-2 mt-8 pb-4">
          <Outlet />
        </div>
      </div>      
    </div>
  )
}
