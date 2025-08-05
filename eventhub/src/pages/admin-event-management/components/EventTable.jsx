import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const EventTable = ({
  events,
  selectedEvents,
  onSelectedEventsChange,
  onEditEvent,
  onDeleteEvent,
  onDuplicateEvent,
  sortConfig,
  onSortChange,
  viewMode
}) => {
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectedEventsChange(events.map(event => event.id));
    } else {
      onSelectedEventsChange([]);
    }
  };

  const handleSelectEvent = (eventId, checked) => {
    if (checked) {
      onSelectedEventsChange([...selectedEvents, eventId]);
    } else {
      onSelectedEventsChange(selectedEvents.filter(id => id !== eventId));
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ key, direction });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-white';
      case 'draft':
        return 'bg-warning text-white';
      case 'completed':
        return 'bg-primary text-white';
      case 'cancelled':
        return 'bg-error text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-nav nav-transition">
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event.id)}
                  onChange={(e) => handleSelectEvent(event.id, e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                />
              </div>
            </div>

            {/* Event Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
                  {event.name}
                </h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="Calendar" size={14} className="mr-2" />
                  {formatDate(event.startDate)}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="MapPin" size={14} className="mr-2" />
                  {event.venue.name}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="Tag" size={14} className="mr-2" />
                  {event.category}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-surface rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">{event.totalAttendees}</p>
                  <p className="text-xs text-text-secondary">Attendees</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">{formatCurrency(event.revenue)}</p>
                  <p className="text-xs text-text-secondary">Revenue</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEditEvent(event)}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg nav-transition"
                    title="Edit Event"
                  >
                    <Icon name="Edit" size={14} />
                  </button>
                  <button
                    onClick={() => onDuplicateEvent(event)}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg nav-transition"
                    title="Duplicate Event"
                  >
                    <Icon name="Copy" size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg nav-transition"
                    title="Delete Event"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
                <button className="text-sm text-primary hover:text-primary-dark nav-transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedEvents.length === events.length && events.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Event
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <Icon 
                    name={sortConfig.key === 'date' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon 
                    name={sortConfig.key === 'status' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                onClick={() => handleSort('totalAttendees')}
              >
                <div className="flex items-center space-x-1">
                  <span>Attendees</span>
                  <Icon 
                    name={sortConfig.key === 'totalAttendees' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center space-x-1">
                  <span>Revenue</span>
                  <Icon 
                    name={sortConfig.key === 'revenue' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-surface nav-transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={(e) => handleSelectEvent(event.id, e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <Image
                        src={event.image}
                        alt={event.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary line-clamp-1">
                        {event.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {event.category} • {event.venue.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">{formatDate(event.startDate)}</div>
                  <div className="text-sm text-text-secondary">{event.startTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {event.totalAttendees.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {formatCurrency(event.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEditEvent(event)}
                      className="text-text-secondary hover:text-primary nav-transition"
                      title="Edit Event"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onDuplicateEvent(event)}
                      className="text-text-secondary hover:text-primary nav-transition"
                      title="Duplicate Event"
                    >
                      <Icon name="Copy" size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="text-text-secondary hover:text-error nav-transition"
                      title="Delete Event"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No events found</h3>
          <p className="text-text-secondary">Get started by creating your first event.</p>
        </div>
      )}
    </div>
  );
};

export default EventTable;