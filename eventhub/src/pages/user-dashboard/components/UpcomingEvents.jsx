import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UpcomingEvents = ({ events = [] }) => {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Upcoming Events</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary mb-4">No upcoming events</p>
          <Link
            to="/event-discovery-dashboard"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
          >
            <Icon name="Search" size={16} />
            <span>Discover Events</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Upcoming Events</h2>
        <Link
          to="/user-dashboard"
          className="text-sm text-primary hover:text-primary-dark nav-transition"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-sm nav-transition">
            <div className="flex-shrink-0">
              <Image
                src={event.image}
                alt={event.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-text-primary mb-1 truncate">
                {event.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-success border border-green-200">
                Confirmed
              </span>
              <Link
                to="/event-details-page"
                className="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg nav-transition"
              >
                <Icon name="ExternalLink" size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;