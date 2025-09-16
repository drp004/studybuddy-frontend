import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { TrendingUp, Users, FileText, FileSpreadsheet } from 'lucide-react';

// Import new modular components
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminData } from '../hooks/useAdminData';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminNavigation } from '../components/admin/AdminNavigation';
import { StatsCard } from '../components/admin/StatsCard';
import { FeatureUsageChart } from '../components/admin/charts/FeatureUsageChart';
import { ActivityTrendChart } from '../components/admin/charts/ActivityTrendChart';
import { SystemHealthPanel } from '../components/admin/SystemHealthPanel';
import { UserActivityPanel } from '../components/admin/UserActivityPanel';
import { BusinessInsightsPanel } from '../components/admin/BusinessInsightsPanel';
import { DashboardTab } from '../types/admin';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const navigate = useNavigate();
  
  // Use custom hooks for auth and data management
  const { isAuthenticated, user, loading: authLoading, logout, getAuthHeaders } = useAdminAuth();
  const {
    analytics,
    systemHealth,
    userActivity,
    businessInsights,
    loading: dataLoading,
    error,
    refreshAllData
  } = useAdminData(getAuthHeaders);

  // Chart colors
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    if (isAuthenticated) {
      refreshAllData();
    }
  }, [isAuthenticated, authLoading, navigate, refreshAllData]);

  // Helper functions
  const formatNumber = (num: number) => num.toLocaleString();
  
  const getSuccessRate = () => {
    if (!analytics) return 0;
    return analytics.totalRequests > 0 
      ? Math.round((analytics.successfulRequests / analytics.totalRequests) * 100)
      : 0;
  };

  const getRequestTypeData = () => {
    if (!analytics) return [];
    return Object.entries(analytics.requestsByType).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count
    }));
  };

  const getDailyStatsData = () => {
    if (!analytics) return [];
    return Object.entries(analytics.dailyStats)
      .slice(-7)
      .map(([date, stats]) => ({
        date: new Date(date).toLocaleDateString(),
        requests: stats.requests,
        errors: stats.errors,
        prints: stats.prints
      }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Requests"
                value={formatNumber(analytics?.totalRequests || 0)}
                icon={TrendingUp}
                color="blue"
              />
              <StatsCard
                title="Success Rate"
                value={`${getSuccessRate()}%`}
                icon={FileText}
                color="green"
              />
              <StatsCard
                title="Unique Users"
                value={formatNumber(Object.keys(analytics?.userAgents || {}).length)}
                icon={Users}
                color="purple"
              />
              <StatsCard
                title="Total Prints"
                value={formatNumber(Object.values(analytics?.prints || {}).reduce((a, b) => a + b, 0))}
                icon={FileSpreadsheet}
                color="orange"
              />
            </div>
            
            {/* Feature Usage and Activity Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FeatureUsageChart data={getRequestTypeData()} colors={COLORS} />
              <ActivityTrendChart data={getDailyStatsData()} />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FeatureUsageChart data={getRequestTypeData()} colors={COLORS} />
            <ActivityTrendChart data={getDailyStatsData()} />
          </div>
        );
      
      case 'system':
        return <SystemHealthPanel data={systemHealth} loading={dataLoading} />;
      
      case 'users':
        return (
          <UserActivityPanel 
            data={userActivity} 
            loading={dataLoading}
            onTimeframeChange={() => {}}
          />
        );
      
      case 'insights':
        return <BusinessInsightsPanel data={businessInsights} loading={dataLoading} />;
      
      default:
        return null;
    }
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refreshAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AdminHeader 
        user={user}
        onRefresh={refreshAllData}
        onLogout={logout}
        isRefreshing={dataLoading}
      />
      
      <AdminNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}
