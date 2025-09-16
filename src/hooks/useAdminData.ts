import { useState, useCallback } from 'react';
import { AnalyticsData, SystemHealth, UserActivity, BusinessInsights } from '../types/admin';

interface AdminDataState {
  analytics: AnalyticsData | null;
  systemHealth: SystemHealth | null;
  userActivity: UserActivity | null;
  businessInsights: BusinessInsights | null;
  loading: boolean;
  error: string | null;
}

export const useAdminData = (getAuthHeaders: () => Record<string, string>) => {
  const [state, setState] = useState<AdminDataState>({
    analytics: null,
    systemHealth: null,
    userActivity: null,
    businessInsights: null,
    loading: false,
    error: null
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/analytics', {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        // Fallback to mock data
        const mockData: AnalyticsData = {
          totalRequests: 150,
          successfulRequests: 142,
          failedRequests: 8,
          requestsByType: {
            text: 45,
            audio: 32,
            video: 28,
            image: 35,
            ppt: 10
          },
          prints: {
            notes: 25,
            ppt: 8,
            audio: 12,
            video: 15,
            image: 18,
            total: 78
          },
          dailyStats: {
            '2024-01-01': { requests: 20, prints: 5, errors: 1 },
            '2024-01-02': { requests: 25, prints: 8, errors: 2 },
            '2024-01-03': { requests: 30, prints: 12, errors: 1 },
            '2024-01-04': { requests: 22, prints: 6, errors: 0 },
            '2024-01-05': { requests: 28, prints: 10, errors: 2 },
            '2024-01-06': { requests: 15, prints: 4, errors: 1 },
            '2024-01-07': { requests: 10, prints: 3, errors: 1 }
          },
          userAgents: {
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36': 85,
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36': 42,
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36': 23
          },
          lastUpdated: new Date().toISOString()
        };
        
        setState(prev => ({ ...prev, analytics: mockData }));
        return;
      }

      const data = await response.json();
      setState(prev => ({ ...prev, analytics: data.data }));
    } catch (error) {
      console.error('Analytics fetch error:', error);
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  const fetchSystemHealth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/system/health', {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setState(prev => ({ ...prev, systemHealth: data.data }));
      }
    } catch (error) {
      console.error('System health fetch error:', error);
    }
  }, [getAuthHeaders]);

  const fetchUserActivity = useCallback(async (timeframe = '7d') => {
    try {
      const response = await fetch(`/api/admin/users/activity?timeframe=${timeframe}`, {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setState(prev => ({ ...prev, userActivity: data.data }));
      }
    } catch (error) {
      console.error('User activity fetch error:', error);
    }
  }, [getAuthHeaders]);

  const fetchBusinessInsights = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/insights/business', {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setState(prev => ({ ...prev, businessInsights: data.data }));
      }
    } catch (error) {
      console.error('Business insights fetch error:', error);
    }
  }, [getAuthHeaders]);

  const refreshAllData = useCallback(async () => {
    await Promise.all([
      fetchAnalytics(),
      fetchSystemHealth(),
      fetchUserActivity(),
      fetchBusinessInsights()
    ]);
  }, [fetchAnalytics, fetchSystemHealth, fetchUserActivity, fetchBusinessInsights]);

  return {
    ...state,
    fetchAnalytics,
    fetchSystemHealth,
    fetchUserActivity,
    fetchBusinessInsights,
    refreshAllData
  };
};
