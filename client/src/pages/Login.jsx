import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layers, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
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
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-space-400 text-center mb-8">Enter your credentials to access your workspace</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-space-500" size={18} />
              <input
                type="email"
                className="input-field pl-10"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-space-500" size={18} />
              <input
                type="password"
                className="input-field pl-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Sign In</span>}
          </button>
        </form>

        <p className="mt-8 text-center text-space-400 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </div>
      
      <div className="mt-8 text-space-500 text-xs flex space-x-4">
        <span>© 2026 TaskFlow Inc.</span>
        <a href="#" className="hover:text-space-300">Privacy Policy</a>
        <a href="#" className="hover:text-space-300">Terms of Service</a>
      </div>
    </div>
  );
};

export default Login;
