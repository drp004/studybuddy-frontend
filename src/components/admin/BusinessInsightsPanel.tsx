import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { BusinessInsights } from '../../types/admin';

interface BusinessInsightsPanelProps {
  data: BusinessInsights | null;
  loading: boolean;
}

export const BusinessInsightsPanel: React.FC<BusinessInsightsPanelProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="bg-gray-200 h-48 rounded-lg"></div>
        <div className="bg-gray-200 h-32 rounded-lg"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-center text-gray-500">
          <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Business insights unavailable</p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Target;
      case 'low': return CheckCircle;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Adoption</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Usage</span>
              <span className="font-bold">{data.featureAdoption.totalUsage.toLocaleString()}</span>
            </div>
            {data.featureAdoption.mostPopular && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most Popular</span>
                  <span className="font-medium capitalize">{data.featureAdoption.mostPopular.feature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usage Share</span>
                  <span className="font-bold text-blue-600">{data.featureAdoption.mostPopular.percentage}%</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Print Rate</span>
              <span className="font-bold text-green-600">{data.userEngagement.printRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-bold text-red-600">{data.userEngagement.errorRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Response</span>
              <span className="font-bold">{data.userEngagement.averageResponseTime}ms</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trends</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Growth</span>
              <div className="flex items-center">
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  parseFloat(data.trends.dailyGrowth) >= 0 ? 'text-green-600' : 'text-red-600'
                }`} />
                <span className={`font-bold ${
                  parseFloat(data.trends.dailyGrowth) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.trends.dailyGrowth}%
                </span>
              </div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Peak Hours</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.trends.popularTimes.map((time, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {time.hour}:00 ({time.count})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Business Recommendations
        </h3>
        
        {data.recommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p>All systems are running optimally!</p>
            <p className="text-sm">No immediate recommendations at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.recommendations.map((rec, index) => {
              const PriorityIcon = getPriorityIcon(rec.priority);
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      rec.priority === 'high' ? 'bg-red-100' :
                      rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <PriorityIcon className={`h-4 w-4 ${
                        rec.priority === 'high' ? 'text-red-600' :
                        rec.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-700">
                          <strong>Recommended Action:</strong> {rec.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
