import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-space-900 border-b border-space-800 h-16 flex items-center justify-between px-8">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-white">
          {window.location.pathname.split('/')[1].charAt(0).toUpperCase() + window.location.pathname.split('/')[1].slice(1) || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-space-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-space-400 capitalize">{user?.role}</p>
          </div>
          <div className="bg-primary/20 p-2 rounded-full text-primary">
            <UserIcon size={20} />
          </div>
          <button 
            onClick={logout}
            className="text-space-400 hover:text-red-500 transition-colors ml-2"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
