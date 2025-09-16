import React from 'react';
import { BarChart3, RefreshCw, LogOut, User } from 'lucide-react';
import { AdminUser } from '../../types/admin';

interface AdminHeaderProps {
  user: AdminUser | null;
  onRefresh: () => void;
  onLogout: () => void;
  isRefreshing?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  user,
  onRefresh,
  onLogout,
  isRefreshing = false
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user.username}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
            )}
            
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
