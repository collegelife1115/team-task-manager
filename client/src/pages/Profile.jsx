import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Briefcase, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="glass-panel overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-space-800"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="bg-space-900 p-2 rounded-2xl border-4 border-space-950">
              <div className="bg-primary/20 w-24 h-24 rounded-xl flex items-center justify-center text-primary">
                <User size={48} />
              </div>
            </div>
            <button className="btn-primary">Edit Profile</button>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">{user?.name}</h2>
            <p className="text-space-400 font-medium">@{user?.email?.split('@')[0]}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white border-b border-space-800 pb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="text-space-500" size={20} />
              <div>
                <p className="text-xs text-space-500 uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Shield className="text-space-500" size={20} />
              <div>
                <p className="text-xs text-space-500 uppercase font-bold tracking-wider">Role</p>
                <p className="text-white font-medium capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Briefcase className="text-space-500" size={20} />
              <div>
                <p className="text-xs text-space-500 uppercase font-bold tracking-wider">Team</p>
                <p className="text-white font-medium">{user?.team || 'General Development'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white border-b border-space-800 pb-4">Account Stats</h3>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg">
              <span className="text-space-400">Member Since</span>
              <span className="text-white font-medium flex items-center">
                <Calendar size={14} className="mr-2" />
                May 2026
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg">
              <span className="text-space-400">Total Projects</span>
              <span className="text-white font-medium">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg">
              <span className="text-space-400">Tasks Completed</span>
              <span className="text-white font-medium">48</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
