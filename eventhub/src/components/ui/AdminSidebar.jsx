import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Navigation items for admin/organizer interface
  const navigationItems = [
    {
      label: 'Event Management',
      path: '/admin-event-management',
      icon: 'Calendar',
      description: 'Create and manage events'
    },
    {
      label: 'Venue Management',
      path: '/venue-management-system',
      icon: 'MapPin',
      description: 'Manage venues and facilities'
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: 'BarChart3',
      description: 'View platform metrics'
    },
    {
      label: 'User Management',
      path: '/user-management',
      icon: 'Users',
      description: 'Manage platform users'
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'FileText',
      description: 'Generate and view reports'
    },
    {
      label: 'Settings',
      path: '/admin-settings',
      icon: 'Settings',
      description: 'Platform configuration'
    }
  ];

  // Quick stats data
  const quickStats = [
    { label: 'Active Events', value: '24', icon: 'Calendar', color: 'text-primary' },
    { label: 'Total Venues', value: '12', icon: 'MapPin', color: 'text-success' },
    { label: 'This Month', value: '1.2k', icon: 'Users', color: 'text-warning' },
    { label: 'Revenue', value: '$45k', icon: 'DollarSign', color: 'text-primary' }
  ];

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-1050"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-20 left-4 z-1100 p-2 bg-background rounded-lg shadow-nav border border-border"
      >
        <Icon name="Menu" size={20} className="text-text-secondary" />
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r border-border z-100
          transition-all duration-300 ease-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-text-primary">
                Admin Panel
              </h2>
            )}
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-surface nav-transition"
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>
          </div>

          {/* Quick Stats */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium text-text-secondary mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-surface rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={stat.icon} size={14} className={stat.color} />
                      <span className="text-xs text-text-secondary">{stat.label}</span>
                    </div>
                    <p className="text-lg font-semibold text-text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium nav-transition
                  ${isActiveRoute(item.path)
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-light'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <Icon name={item.icon} size={18} />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{item.label}</span>
                    <span className="text-xs opacity-75 block truncate">
                      {item.description}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="bg-primary-light rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="HelpCircle" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Need Help?</span>
                </div>
                <p className="text-xs text-text-secondary mb-2">
                  Check our documentation or contact support
                </p>
                <button className="text-xs text-primary hover:underline">
                  View Docs
                </button>
              </div>
            ) : (
              <button 
                className="w-full p-2 rounded-lg hover:bg-surface nav-transition"
                title="Help & Support"
              >
                <Icon name="HelpCircle" size={18} className="text-text-secondary mx-auto" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </>
  );
};

export default AdminSidebar;