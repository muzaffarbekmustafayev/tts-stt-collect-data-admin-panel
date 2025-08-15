import { CheckCircle, FileText, Home, Users, Volume2, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentPage = useLocation().pathname.split('/')[1] || 'dashboard';
  const changePage = (page: string) => {
    navigate(`/${page}`)
  }
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 h-screen flex flex-col">
      <h1 className="text-xl font-bold mb-8 text-center">STT-TTS Admin</h1>
      <nav className="space-y-2">
        {[
          { key: 'dashboard', icon: Home, label: 'Dashboard' },
          { key: 'sentences', icon: FileText, label: 'Sentences' },
          { key: 'users', icon: Users, label: 'Users' },
          { key: 'audios', icon: Volume2, label: 'Audios' },
          { key: 'checked_audios', icon: CheckCircle, label: 'Checked Audios' }
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
        onClick={() => { }}
        className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-800 mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>

  )
};

export default Sidebar;