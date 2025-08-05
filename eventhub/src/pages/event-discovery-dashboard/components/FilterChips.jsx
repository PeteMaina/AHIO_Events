import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ 
  filterOptions, 
  activeFilters, 
  onFilterChange, 
  onClearFilters, 
  activeFilterCount,
  onShowAdvanced 
}) => {
  const quickFilters = [
    {
      key: 'location',
      label: 'Location',
      icon: 'MapPin',
      options: filterOptions.locations
    },
    {
      key: 'eventType',
      label: 'Type',
      icon: 'Tag',
      options: filterOptions.eventTypes
    },
    {
      key: 'sponsorLevel',
      label: 'Sponsor',
      icon: 'Award',
      options: filterOptions.sponsorLevels
    }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'next-month', label: 'Next Month' }
  ];

  return (
    <div className="mb-6">
      {/* Quick Date Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium text-text-secondary flex items-center">
          <Icon name="Calendar" size={14} className="mr-1" />
          When:
        </span>
        {dateRangeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange('dateRange', option.value)}
            className={`px-3 py-1.5 text-sm rounded-full border nav-transition ${
              activeFilters.dateRange === option.value
                ? 'bg-primary text-white border-primary' :'bg-background text-text-secondary border-border hover:border-primary hover:text-primary'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {quickFilters.map((filter) => (
          <div key={filter.key} className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary flex items-center">
              <Icon name={filter.icon} size={14} className="mr-1" />
              {filter.label}:
            </span>
            <div className="flex flex-wrap gap-1">
              {filter.options.slice(0, 4).map((option) => {
                const isActive = activeFilters[filter.key].includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => onFilterChange(filter.key, option)}
                    className={`px-3 py-1.5 text-sm rounded-full border nav-transition capitalize ${
                      isActive
                        ? 'bg-primary text-white border-primary' :'bg-background text-text-secondary border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
              {filter.options.length > 4 && (
                <button
                  onClick={onShowAdvanced}
                  className="px-3 py-1.5 text-sm rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary nav-transition"
                >
                  +{filter.options.length - 4} more
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onShowAdvanced}
            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:border-primary hover:text-primary nav-transition"
          >
            <Icon name="SlidersHorizontal" size={16} />
            <span>Advanced Filters</span>
          </button>
          
          {activeFilterCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
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

        {/* Mobile Filter Toggle */}
        <button
          onClick={onShowAdvanced}
          className="md:hidden flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg nav-transition"
        >
          <Icon name="Filter" size={16} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-white text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FilterChips;