import React, { useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

const AdvancedFilters = ({ 
  isOpen, 
  onClose, 
  filterOptions, 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const sidebarRef = useRef();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const priceRanges = [
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-250', label: '$100 - $250' },
    { value: '250-500', label: '$250 - $500' },
    { value: '500+', label: '$500+' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'next-month', label: 'Next Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      }
      return count + (filter ? 1 : 0);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-1050"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-modal z-1100 overflow-y-auto animate-slide-in-right"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">
              Advanced Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface rounded-lg nav-transition"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
          
          {getActiveFilterCount() > 0 && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-sm text-text-secondary">
                {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
              </span>
              <button
                onClick={onClearFilters}
                className="text-sm text-primary hover:text-primary-dark nav-transition"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Date Range
            </h3>
            <div className="space-y-2">
              {dateRanges.map((range) => (
                <label key={range.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range.value}
                    checked={activeFilters.dateRange === range.value}
                    onChange={(e) => onFilterChange('dateRange', e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-border"
                  />
                  <span className="text-sm text-text-secondary">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="MapPin" size={16} className="mr-2" />
              Location
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filterOptions.locations.map((location) => (
                <label key={location} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.location.includes(location)}
                    onChange={() => onFilterChange('location', location)}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm text-text-secondary">{location}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Event Type */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Tag" size={16} className="mr-2" />
              Event Type
            </h3>
            <div className="space-y-2">
              {filterOptions.eventTypes.map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.eventType.includes(type)}
                    onChange={() => onFilterChange('eventType', type)}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm text-text-secondary">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Price Range
            </h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={activeFilters.priceRange === range.value}
                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-border"
                  />
                  <span className="text-sm text-text-secondary">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sponsor Level */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Award" size={16} className="mr-2" />
              Sponsor Level
            </h3>
            <div className="space-y-2">
              {filterOptions.sponsorLevels.map((level) => (
                <label key={level} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.sponsorLevel.includes(level)}
                    onChange={() => onFilterChange('sponsorLevel', level)}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm text-text-secondary capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <div className="flex space-x-3">
            <button
              onClick={onClearFilters}
              className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface nav-transition"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilters;