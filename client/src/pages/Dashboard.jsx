import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks');
        const tasks = res.data.data;
        
        const newStats = {
          totalTasks: tasks.length,
          completed: tasks.filter(t => t.status === 'Completed').length,
          inProgress: tasks.filter(t => t.status === 'In Progress').length,
          pending: tasks.filter(t => t.status === 'Pending').length,
          overdue: tasks.filter(t => t.status === 'Overdue').length
        };
        setStats(newStats);
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = {
    labels: ['Pending', 'In Progress', 'Completed', 'Overdue'],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.completed, stats.overdue],
        backgroundColor: [
          '#52525b',
          '#3b82f6',
          '#10b981',
          '#ef4444',
        ],
        borderColor: '#121214',
        borderWidth: 2,
      },
    ],
  };

  const statCards = [
    { title: 'Total Tasks', value: stats.totalTasks, icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  if (loading) return <div className="text-white">Loading Dashboard...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="glass-panel p-6 flex items-center space-x-4">
            <div className={`${card.bg} p-3 rounded-lg ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-space-400 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-white">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Task Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            {stats.totalTasks > 0 ? (
              <Pie data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#a1a1aa' } } } }} />
            ) : (
              <p className="text-space-500 italic">No tasks available</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {/* Placeholder for activities */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-space-800 transition-colors">
                <div className="bg-space-700 p-2 rounded-full text-space-400">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-semibold">System Update:</span> New project "Redesign UI" was created by Admin.
                  </p>
                  <p className="text-xs text-space-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
