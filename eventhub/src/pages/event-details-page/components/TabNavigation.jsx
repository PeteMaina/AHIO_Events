import React from 'react';
import Icon from 'components/AppIcon';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="sticky top-16 bg-background border-b border-border z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Tab Navigation */}
        <nav className="hidden md:flex space-x-8" aria-label="Event details tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm nav-transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Tab Navigation - Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto">
          <nav className="flex space-x-6 py-3" aria-label="Event details tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap nav-transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;