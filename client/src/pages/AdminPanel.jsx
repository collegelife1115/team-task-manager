import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { UserPlus, Trash2, Edit2, Shield, User, X } from 'lucide-react';
import Modal from '../components/Modal';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'intern'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      await api.post('/users', newUser);
      setIsModalOpen(false);
      setNewUser({ name: '', email: '', password: '', role: 'intern' });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create user');
    } finally {
      setFormLoading(false);
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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New User"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-space-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Enter full name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-space-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="Enter email address"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-space-400 mb-1">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="Set password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-space-400 mb-1">Role</label>
            <select
              className="input-field"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="intern">Intern</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={formLoading}
            className="btn-primary w-full flex items-center justify-center space-x-2 py-3 mt-4"
          >
            {formLoading ? <span>Creating...</span> : (
              <>
                <UserPlus size={20} />
                <span>Create User</span>
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
