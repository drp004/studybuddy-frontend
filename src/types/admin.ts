// Admin Dashboard Types
export interface AnalyticsData {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  requestsByType: {
    text: number;
    audio: number;
    video: number;
    image: number;
    ppt: number;
  };
  prints: {
    notes: number;
    ppt: number;
    audio: number;
    video: number;
    image: number;
    total: number;
  };
  dailyStats: Record<string, {
    requests: number;
    prints: number;
    errors: number;
  }>;
  userAgents: Record<string, number>;
  lastUpdated: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: {
    seconds: number;
    formatted: string;
  };
  memory: {
    used: number;
    total: number;
    external: number;
    rss: number;
  };
  requests: {
    total: number;
    successful: number;
    failed: number;
    successRate: string;
  };
  performance: {
    averageResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
  };
}

export interface UserActivity {
  overview: {
    uniqueUsers: number;
    totalSessions: number;
    averageRequestsPerUser: number;
  };
  activity: Array<{
    period: string | number;
    requests: number;
    errors: number;
    prints?: number;
  }>;
  topUserAgents: Array<{
    userAgent: string;
    count: number;
  }>;
}

export interface BusinessInsights {
  featureAdoption: {
    totalUsage: number;
    mostPopular: {
      feature: string;
      usage: number;
      percentage: string;
    } | null;
    breakdown: Array<{
      name: string;
      value: number;
    }>;
  };
  userEngagement: {
    printRate: string;
    errorRate: string;
    averageResponseTime: number;
  };
  recommendations: Array<{
    type: 'performance' | 'business' | 'security';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    action: string;
  }>;
  trends: {
    dailyGrowth: string;
    popularTimes: Array<{
      hour: number;
      count: number;
    }>;
  };
}

export interface AdminUser {
  id: number;
  username: string;
  role: 'super_admin' | 'manager' | 'viewer';
  email: string;
}

export type DashboardTab = 'overview' | 'analytics' | 'system' | 'users' | 'insights';

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  requests: number;
  errors: number;
  prints: number;
}
