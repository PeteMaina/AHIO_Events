import React from 'react';
import Icon from 'components/AppIcon';

const EventFilters = ({ filters, onFiltersChange, events, searchQuery, onSearchChange }) => {
  const categories = [...new Set(events.map(event => event.category))];
  const venues = [...new Set(events.map(event => event.venue.name))];
  const statuses = ['active', 'draft', 'completed', 'cancelled'];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      category: 'all',
      dateRange: 'all',
      venue: 'all'
    });
    onSearchChange('');
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== 'all').length + (searchQuery ? 1 : 0);

  return (
    <div className="bg-background border border-border rounded-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-dark nav-transition"
          >
            Clear ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Search Events
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, category, venue..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="all">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Date Range
        </label>
        <select
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="all">All Dates</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past Events</option>
          <option value="this-month">This Month</option>
        </select>
      </div>

      {/* Venue Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Venue
        </label>
        <select
          value={filters.venue}
          onChange={(e) => handleFilterChange('venue', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="all">All Venues</option>
          {venues.map(venue => (
            <option key={venue} value={venue}>
              {venue}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleFilterChange('status', 'active')}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg nav-transition"
          >
            <Icon name="Activity" size={14} />
            <span>Active Events</span>
          </button>
          <button
            onClick={() => handleFilterChange('dateRange', 'upcoming')}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg nav-transition"
          >
            <Icon name="Calendar" size={14} />
            <span>Upcoming Events</span>
          </button>
          <button
            onClick={() => handleFilterChange('status', 'draft')}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg nav-transition"
          >
            <Icon name="Edit" size={14} />
            <span>Draft Events</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;