import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { UserPlus, Trash2, Edit2, Shield, User } from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">User Management</h2>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {loading ? (
        <div className="text-white text-center py-20 italic">Loading users...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="glass-panel p-6 flex flex-col justify-between">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-space-800 p-3 rounded-full text-space-400">
                  {user.role === 'admin' ? <Shield className="text-primary" size={24} /> : <User size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{user.name}</h3>
                  <p className="text-sm text-space-400">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-space-800">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  user.role === 'admin' ? 'bg-primary/20 text-primary' : 
                  user.role === 'manager' ? 'bg-amber-500/20 text-amber-500' : 'bg-space-700 text-space-300'
                }`}>
                  {user.role}
                </span>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-space-500 hover:text-white transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteUser(user._id)}
                    className="p-2 text-space-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
