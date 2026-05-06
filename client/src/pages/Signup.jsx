import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layers, User, Mail, Lock, Briefcase, Loader2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'intern',
  });
  const [loading, setLoading] = useState(false);
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-950 flex flex-col justify-center items-center p-6">
      <div className="flex items-center space-x-3 mb-8">
        <Layers className="text-primary" size={40} />
        <h1 className="text-3xl font-bold text-white tracking-tight">Task<span className="text-primary">Flow</span></h1>
      </div>

      <div className="w-full max-w-md glass-panel p-8">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-space-400 text-center mb-8">Join your team and start managing tasks</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-space-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-space-500" size={18} />
              <input
                name="name"
                type="text"
                className="input-field pl-10"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-space-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-space-500" size={18} />
              <input
                name="email"
                type="email"
                className="input-field pl-10"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-space-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-space-500" size={18} />
              <input
                name="password"
                type="password"
                className="input-field pl-10"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-space-300 mb-1.5">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 text-space-500" size={18} />
              <select
                name="role"
                className="input-field pl-10 appearance-none bg-space-800"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="intern">Intern</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Sign Up</span>}
          </button>
        </form>

        <p className="mt-8 text-center text-space-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
