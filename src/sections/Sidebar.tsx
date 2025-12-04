import { CheckCircle, FileText, Home, Users, Volume2, LogOut, ShieldCheck, X, BarChart3 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { pageNames } from "@/services/staticNames";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const navigate = useNavigate();
  const currentPage = useLocation().pathname.split('/')[1] || pageNames.dashboard.prefix;
  const changePage = (page: string) => {
    if (page === pageNames.dashboard.prefix) {
      navigate('/')
      return
    }
    navigate(`${page}`)
  }
  const { logout } = useAuth()
  const logoutHandler = () => {
    const confirm = window.confirm('Are you sure you want to logout?')
    if (!confirm) return
    logout()
  }
  return (
    <div className={`bg-gray-900 text-white min-h-screen p-4 h-screen flex flex-col transition-width duration-300 ${isOpen ? 'md:w-64 -left-0 w-full' : 'w-0 absolute -left-64'}`}>
      <div className="flex justify-between items-center mb-8">
        <a href="/" className="text-xl font-bold text-center">STT-TTS Admin</a>
        <Button variant="outline" size="icon" className="md:hidden bg-gray-800" onClick={() => setIsOpen(false)}>
          <X size={30} className="cursor-pointer" />
        </Button>
      </div>
      <nav className="space-y-2">
        {[
          { key: pageNames.dashboard.prefix, icon: Home, label: pageNames.dashboard.name },
          { key: pageNames.users.prefix, icon: Users, label: pageNames.users.name },
          { key: pageNames.statistics.prefix, icon: BarChart3, label: pageNames.statistics.name },
          { key: pageNames.admins.prefix, icon: ShieldCheck, label: pageNames.admins.name },
          { key: pageNames.sentences.prefix, icon: FileText, label: pageNames.sentences.name },
          { key: pageNames.audios.prefix, icon: Volume2, label: pageNames.audios.name },
          { key: pageNames.checked_audios.prefix, icon: CheckCircle, label: pageNames.checked_audios.name },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => changePage(item.key)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${currentPage === item.key ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        onClick={logoutHandler}
        className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-800 mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>

  )
};

export default Sidebar;