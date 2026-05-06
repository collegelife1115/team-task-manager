import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Plus, Search, MoreVertical, Calendar, User } from 'lucide-react';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 text-space-500" size={18} />
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>New Project</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-white text-center py-20 italic">Loading projects...</div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project._id} className="glass-panel p-6 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                <button className="text-space-500 hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <p className="text-space-400 text-sm mb-6 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-space-800">
                <div className="flex items-center text-sm text-space-300">
                  <Calendar size={16} className="mr-2 text-primary" />
                  <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-space-300">
                  <User size={16} className="mr-2 text-primary" />
                  <span>Manager: {project.manager?.name || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                  project.status === 'Completed' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {project.status}
                </span>
                <button className="text-space-400 hover:text-white text-sm font-medium">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel">
          <p className="text-space-400 text-lg mb-4">No projects found</p>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <button className="text-primary hover:underline">Create your first project</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
