import StatCard from "./StatCard";
import {
  FileText,
  Users,
  Volume2,
  Headphones,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CircleCheck,
  RefreshCcw
} from 'lucide-react';
import { useData } from '@/hooks/useData';
import Loader from "@/components/loading/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { token } = useAuth();
  const { stats, loading, error, fetchStats } = useData();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">All statistics</h1>
        <Button
              onClick={() => fetchStats(token)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg shadow-sm transition-colors" 
              variant="outline"
            >
              <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Sentences" value={stats.sentences} icon={FileText} color="#3B82F6" />
        <StatCard title="Total Users" value={stats.users} icon={Users} color="#10B981" />
        <StatCard title="Admins" value={stats.admins} icon={ShieldCheck} color="#F59E0B" />
        <StatCard title="Total Audios" value={stats.audios} icon={Volume2} color="#F59E0B" />
        <StatCard title="Checked Audios" value={stats.checked_audios} icon={CircleCheck} color="#8B5CF6" />
        <StatCard title="Total audio duration (hours)" value={Number.parseFloat((stats.total_audio_duration/60).toFixed(2))} icon={Headphones} color="#4B9CF6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Statistics Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Statistics Overview
          </h3>
          <div className="h-64">
            <Bar
              data={{
                labels: ['Sentences', 'Users', 'Audios', 'Approved', 'Admins'],
                datasets: [
                  {
                    label: 'Count',
                    data: [
                      stats.sentences,
                      stats.users,
                      stats.audios,
                      stats.checked_audios,
                      stats.admins
                    ],
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(245, 158, 11, 0.8)',
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                      'rgba(59, 130, 246, 1)',
                      'rgba(16, 185, 129, 1)',
                      'rgba(245, 158, 11, 1)',
                      'rgba(139, 92, 246, 1)',
                      'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                      size: 14,
                      weight: 'bold'
                    },
                    bodyFont: {
                      size: 13
                    },
                    cornerRadius: 8,
                    displayColors: true
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(229, 231, 235, 0.5)'
                    },
                    border: {
                      display: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: 11
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: 11
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Doughnut Chart - Audio Approval Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Audio Approval Rate
          </h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-64">
              <Doughnut
                data={{
                  labels: ['Approved Audios', 'Checked audios'],
                  datasets: [
                    {
                      data: [
                        stats.audios,
                        stats.checked_audios
                      ],
                      backgroundColor: [
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(229, 231, 235, 0.8)'
                      ],
                      borderColor: [
                        'rgba(139, 92, 246, 1)',
                        'rgba(209, 213, 219, 1)'
                      ],
                      borderWidth: 3,
                      hoverOffset: 8
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: '65%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                          size: 12,
                          weight: 500
                        },
                        color: '#374151'
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      padding: 12,
                      titleFont: {
                        size: 14,
                        weight: 'bold'
                      },
                      bodyFont: {
                        size: 13
                      },
                      cornerRadius: 8,
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.parsed || 0;
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {stats.audios > 0 
                ? ((stats.checked_audios / stats.audios) * 100).toFixed(1) 
                : '0'}%
            </p>
            <p className="text-sm text-gray-500">Approval Rate</p>
          </div>
        </div>
      </div>
    </div>

  )
};
export default Dashboard;