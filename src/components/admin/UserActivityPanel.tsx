import React, { useState } from 'react';
import { Users, Globe, Activity, Clock } from 'lucide-react';
import { UserActivity } from '../../types/admin';
import { StatsCard } from './StatsCard';
import { ActivityTrendChart } from './charts/ActivityTrendChart';

interface UserActivityPanelProps {
  data: UserActivity | null;
  loading: boolean;
  onTimeframeChange: (timeframe: string) => void;
}

export const UserActivityPanel: React.FC<UserActivityPanelProps> = ({ 
  data, 
  loading, 
  onTimeframeChange 
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    onTimeframeChange(timeframe);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
        <div className="bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-center text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>User activity data unavailable</p>
        </div>
      </div>
    );
  }

  const chartData = data.activity.map(item => ({
    date: typeof item.period === 'string' ? item.period : `Hour ${item.period}`,
    requests: item.requests,
    errors: item.errors,
    prints: item.prints || 0
  }));

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">User Activity</h2>
        <div className="flex space-x-2">
          {[
            { key: '24h', label: '24 Hours' },
            { key: '7d', label: '7 Days' },
            { key: '30d', label: '30 Days' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTimeframeChange(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Unique Users"
          value={data.overview.uniqueUsers}
          icon={Users}
          color="blue"
          subtitle="Based on IP addresses"
        />
        
        <StatsCard
          title="Total Sessions"
          value={data.overview.totalSessions}
          icon={Activity}
          color="green"
          subtitle="Active user sessions"
        />
        
        <StatsCard
          title="Avg Requests/User"
          value={data.overview.averageRequestsPerUser}
          icon={Globe}
          color="purple"
          subtitle="Requests per unique user"
        />
      </div>

      {/* Activity Chart */}
      <ActivityTrendChart 
        data={chartData}
        title={`Activity Trend (${selectedTimeframe === '24h' ? '24 Hours' : selectedTimeframe === '7d' ? '7 Days' : '30 Days'})`}
      />

      {/* Top User Agents */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Top User Agents
        </h3>
        
        {data.topUserAgents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No user agent data available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.topUserAgents.map((agent, index) => {
                  const totalRequests = data.topUserAgents.reduce((sum, a) => sum + a.count, 0);
                  const percentage = ((agent.count / totalRequests) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs truncate" title={agent.userAgent}>
                          {agent.userAgent}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {agent.count.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
