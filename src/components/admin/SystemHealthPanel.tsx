import React from 'react';
import { Server, Clock, Zap, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { SystemHealth } from '../../types/admin';
import { StatsCard } from './StatsCard';

interface SystemHealthPanelProps {
  data: SystemHealth | null;
  loading: boolean;
}

export const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-center text-gray-500">
          <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>System health data unavailable</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'green';
      case 'warning': return 'yellow';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Server;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="System Status"
          value={data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          icon={getStatusIcon(data.status)}
          color={getStatusColor(data.status) as any}
          subtitle={`Uptime: ${data.uptime.formatted}`}
        />
        
        <StatsCard
          title="Memory Usage"
          value={`${data.memory.used}MB`}
          icon={Activity}
          color="blue"
          subtitle={`Total: ${data.memory.total}MB`}
        />
        
        <StatsCard
          title="Success Rate"
          value={`${data.requests.successRate}%`}
          icon={CheckCircle}
          color="green"
          subtitle={`${data.requests.successful}/${data.requests.total} requests`}
        />
        
        <StatsCard
          title="Avg Response Time"
          value={`${data.performance.averageResponseTime}ms`}
          icon={Zap}
          color="purple"
          subtitle={`Min: ${data.performance.minResponseTime}ms`}
        />
      </div>

      {/* Detailed System Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Memory Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Heap Used</span>
              <span className="font-medium">{data.memory.used}MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Heap Total</span>
              <span className="font-medium">{data.memory.total}MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">External</span>
              <span className="font-medium">{data.memory.external}MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">RSS</span>
              <span className="font-medium">{data.memory.rss}MB</span>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((data.memory.used / data.memory.total) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Memory usage: {((data.memory.used / data.memory.total) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Response</span>
              <span className="font-medium">{data.performance.averageResponseTime}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fastest Response</span>
              <span className="font-medium text-green-600">{data.performance.minResponseTime}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Slowest Response</span>
              <span className="font-medium text-red-600">{data.performance.maxResponseTime}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">{data.uptime.formatted}</span>
            </div>
            
            {/* Performance indicator */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Performance Score</span>
                <span className="font-medium">
                  {data.performance.averageResponseTime < 1000 ? 'Excellent' : 
                   data.performance.averageResponseTime < 3000 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    data.performance.averageResponseTime < 1000 ? 'bg-green-500' :
                    data.performance.averageResponseTime < 3000 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${Math.max(20, Math.min(100, 100 - (data.performance.averageResponseTime / 50)))}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
