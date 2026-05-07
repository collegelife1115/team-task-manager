import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Plus, CheckCircle, Clock, AlertCircle, RefreshCw, X } from 'lucide-react';
import Modal from '../components/Modal';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [interns, setInterns] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    assignee: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'admin' || user?.role === 'manager') {
      fetchProjects();
      fetchInterns();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInterns = async () => {
    try {
      const res = await api.get('/users');
      // Only interns should be assignable
      setInterns(res.data.data.filter(u => u.role === 'intern'));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdating(taskId);
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      await fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      await api.post('/tasks', newTask);
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', project: '', assignee: '', dueDate: '', priority: 'Medium' });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to assign task');
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={18} className="text-emerald-500" />;
      case 'In Progress': return <Clock size={18} className="text-blue-500" />;
      case 'Pending': return <Clock size={18} className="text-space-500" />;
      case 'Review': return <RefreshCw size={18} className="text-amber-500" />;
      case 'Overdue': return <AlertCircle size={18} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Your Task Board</h2>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Assign Task</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-white text-center py-20 italic">Loading tasks...</div>
      ) : (
        <div className="overflow-x-auto glass-panel">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-space-800 bg-space-900/50">
                <th className="px-6 py-4 text-xs font-semibold text-space-400 uppercase tracking-wider">Task</th>
                <th className="px-6 py-4 text-xs font-semibold text-space-400 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-xs font-semibold text-space-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-space-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-space-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-space-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-space-800">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-space-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{task.title}</p>
                    <p className="text-xs text-space-500 mt-0.5 line-clamp-1">{task.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-space-300 bg-space-800 px-2 py-1 rounded">
                      {task.project?.name || 'Deleted Project'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-space-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'High' ? 'text-red-400 bg-red-400/10' :
                      task.priority === 'Medium' ? 'text-amber-400 bg-amber-400/10' : 'text-blue-400 bg-blue-400/10'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      <span className="text-sm text-space-300">{task.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {updating === task._id ? (
                        <RefreshCw size={16} className="animate-spin text-primary" />
                      ) : (
                        <select
                          className="bg-space-800 border-none text-xs rounded px-2 py-1 text-space-200 focus:ring-1 focus:ring-primary outline-none"
                          value={task.status}
                          onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Review">Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tasks.length === 0 && (
            <div className="text-center py-12 text-space-500 italic">No tasks found</div>
          )}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Assign New Task"
      >
        <form onSubmit={handleAssignTask} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-space-400 mb-1">Task Title</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Enter task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-space-400 mb-1">Description</label>
            <textarea
              required
              className="input-field min-h-[80px]"
              placeholder="Task details..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-space-400 mb-1">Project</label>
              <select
                required
                className="input-field"
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-space-400 mb-1">Assignee (Intern)</label>
              <select
                required
                className="input-field"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              >
                <option value="">Select Intern</option>
                {interns.map(i => (
                  <option key={i._id} value={i._id}>{i.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-space-400 mb-1">Due Date</label>
              <input
                type="date"
                required
                className="input-field"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-space-400 mb-1">Priority</label>
              <select
                className="input-field"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={formLoading}
            className="btn-primary w-full flex items-center justify-center space-x-2 py-3 mt-4"
          >
            {formLoading ? <span>Assigning...</span> : (
              <>
                <Plus size={20} />
                <span>Assign Task</span>
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;
