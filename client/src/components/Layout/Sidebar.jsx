import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  UserCircle,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Projects', icon: FolderKanban, path: '/projects' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Profile', icon: UserCircle, path: '/profile' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', icon: Users, path: '/admin' });
  }

  return (
    <aside className="w-64 bg-space-900 border-r border-space-800 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-space-800">
        <div className="flex items-center space-x-2">
          <Layers className="text-primary" size={28} />
          <span className="text-xl font-bold text-white tracking-tight">Task<span className="text-primary">Flow</span></span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-space-400 hover:bg-space-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-space-800">
        <div className="bg-space-800 rounded-xl p-4">
          <p className="text-xs text-space-400 mb-1">Current Team</p>
          <p className="text-sm font-semibold text-white">{user?.team || 'General'}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
