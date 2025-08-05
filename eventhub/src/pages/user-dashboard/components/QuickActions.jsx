import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      label: 'Book New Event',
      description: 'Discover upcoming events',
      icon: 'Plus',
      color: 'text-primary bg-primary-light',
      link: '/event-discovery-dashboard'
    },
    {
      id: 2,
      label: 'Download Tickets',
      description: 'Get your event tickets',
      icon: 'Download',
      color: 'text-success bg-green-50',
      action: 'download'
    },
    {
      id: 3,
      label: 'Add to Calendar',
      description: 'Sync with your calendar',
      icon: 'Calendar',
      color: 'text-blue-600 bg-blue-50',
      action: 'calendar'
    },
    {
      id: 4,
      label: 'Share Events',
      description: 'Share with friends',
      icon: 'Share2',
      color: 'text-purple-600 bg-purple-50',
      action: 'share'
    }
  ];

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'download':
        // Handle ticket download
        console.log('Downloading tickets...');
        break;
      case 'calendar':
        // Handle calendar integration
        console.log('Adding to calendar...');
        break;
      case 'share':
        // Handle sharing
        console.log('Sharing events...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          action.link ? (
            <Link
              key={action.id}
              to={action.link}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface nav-transition"
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <Icon name={action.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{action.label}</p>
                <p className="text-xs text-text-secondary">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            </Link>
          ) : (
            <button
              key={action.id}
              onClick={() => handleAction(action.action)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface nav-transition text-left"
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <Icon name={action.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{action.label}</p>
                <p className="text-xs text-text-secondary">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default QuickActions;