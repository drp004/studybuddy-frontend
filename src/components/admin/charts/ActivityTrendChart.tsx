import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TimeSeriesData } from '../../../types/admin';

interface ActivityTrendChartProps {
  data: TimeSeriesData[];
  title?: string;
}

export const ActivityTrendChart: React.FC<ActivityTrendChartProps> = ({ 
  data, 
  title = "7-Day Activity Trend" 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number, name: string) => [value.toLocaleString(), name]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Bar dataKey="requests" fill="#3B82F6" name="Requests" />
          <Bar dataKey="errors" fill="#EF4444" name="Errors" />
          <Bar dataKey="prints" fill="#10B981" name="Prints" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
