import StatCard from "./StatCard";
import {
  FileText,
  Users,
  Volume2,
  CheckCircle,

  BarChart3,
  TrendingUp,
  Database
} from 'lucide-react';

const Dashboard = (props: { data: any }) => {
  const { data } = props;
  const stats = {
    totalSentences: data.sentences.length,
    totalUsers: data.users.length,
    totalAudios: data.audios.length,
    approvedAudios: data.checked_audios.filter(a => a.status === 'approved').length,
    pendingAudios: data.checked_audios.filter(a => a.status === 'pending').length
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Sentences" value={stats.totalSentences} icon={FileText} color="#3B82F6" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="#10B981" />
        <StatCard title="Total Audios" value={stats.totalAudios} icon={Volume2} color="#F59E0B" />
        <StatCard title="Approved Audios" value={stats.approvedAudios} icon={CheckCircle} color="#8B5CF6" />
        <StatCard title="Pending Review" value={stats.pendingAudios} icon={Database} color="#EF4444" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">New audio uploaded</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Audio approved by checker</span>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">New user registered</span>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Quality Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">High Quality</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Medium Quality</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Low Quality</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};
export default Dashboard;