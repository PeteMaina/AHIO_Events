import React from 'react';
import Icon from 'components/AppIcon';

const DashboardMetrics = ({ events }) => {
  // Calculate metrics
  const totalEvents = events.length;
  const activeEvents = events.filter(event => event.status === 'active').length;
  const totalAttendees = events.reduce((sum, event) => sum + event.totalAttendees, 0);
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const avgAttendance = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;

  // Calculate trends (mock data for demonstration)
  const metrics = [
    {
      label: 'Total Events',
      value: totalEvents,
      change: '+12%',
      trend: 'up',
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary-light'
    },
    {
      label: 'Active Events',
      value: activeEvents,
      change: '+8%',
      trend: 'up',
      icon: 'Activity',
      color: 'text-success',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Total Attendees',
      value: totalAttendees.toLocaleString(),
      change: '+24%',
      trend: 'up',
      icon: 'Users',
      color: 'text-warning',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Revenue',
      value: `$${(totalRevenue / 1000).toFixed(1)}k`,
      change: '+18%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary-light'
    },
    {
      label: 'Avg Attendance',
      value: avgAttendance,
      change: '+5%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Completion Rate',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-background border border-border rounded-lg p-4 hover:shadow-nav nav-transition">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <Icon name={metric.icon} size={20} className={metric.color} />
            </div>
            <div className={`flex items-center text-xs font-medium ${
              metric.trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
                className="mr-1" 
              />
              {metric.change}
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">{metric.value}</p>
            <p className="text-sm text-text-secondary">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;