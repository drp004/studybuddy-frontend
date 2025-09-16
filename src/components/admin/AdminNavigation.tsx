import React from 'react';
import { BarChart3, TrendingUp, Server, Users, Lightbulb } from 'lucide-react';
import { DashboardTab } from '../../types/admin';

interface AdminNavigationProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const navigationItems = [
  { key: 'overview' as DashboardTab, label: 'Overview', icon: BarChart3 },
  { key: 'analytics' as DashboardTab, label: 'Analytics', icon: TrendingUp },
  { key: 'system' as DashboardTab, label: 'System Health', icon: Server },
  { key: 'users' as DashboardTab, label: 'User Activity', icon: Users },
  { key: 'insights' as DashboardTab, label: 'Business Insights', icon: Lightbulb }
];

export const AdminNavigation: React.FC<AdminNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          {navigationItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
