import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const EventCard = ({ event }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate(),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getMinPrice = (ticketTypes) => {
    return Math.min(...ticketTypes.map(ticket => ticket.price));
  };

  const getAvailableTickets = (ticketTypes) => {
    return ticketTypes.reduce((total, ticket) => total + ticket.available, 0);
  };

  const getSponsorBadgeColor = (level) => {
    const colors = {
      platinum: 'bg-gray-800 text-white',
      gold: 'bg-yellow-500 text-white',
      silver: 'bg-gray-400 text-white',
      bronze: 'bg-orange-600 text-white',
      standard: 'bg-gray-200 text-text-primary'
    };
    return colors[level] || colors.standard;
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e) => {
    e.preventDefault();
    setIsSharing(true);
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.origin + `/event-details-page?id=${event.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        window.location.origin + `/event-details-page?id=${event.id}`
      );
    }
    
    setTimeout(() => setIsSharing(false), 1000);
  };

  const startDate = formatDate(event.startDate);
  const availableTickets = getAvailableTickets(event.ticketTypes);
  const minPrice = getMinPrice(event.ticketTypes);

  return (
    <div className="bg-background rounded-lg shadow-nav border border-border overflow-hidden hover:shadow-modal nav-transition group">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to={`/event-details-page?id=${event.id}`}>
          <Image
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 nav-transition"
          />
        </Link>
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleFavorite}
            className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center nav-transition"
          >
            <Icon 
              name={isFavorited ? "Heart" : "Heart"} 
              size={14} 
              className={isFavorited ? "text-primary fill-current" : "text-text-secondary"} 
            />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center nav-transition"
          >
            <Icon 
              name={isSharing ? "Check" : "Share2"} 
              size={14} 
              className="text-text-secondary" 
            />
          </button>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white rounded-lg p-2 text-center shadow-nav">
          <div className="text-xs font-medium text-text-secondary uppercase">
            {startDate.month}
          </div>
          <div className="text-lg font-bold text-text-primary">
            {startDate.day}
          </div>
        </div>

        {/* Sponsor Level Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSponsorBadgeColor(event.sponsorLevel)}`}>
            {event.sponsorLevel.charAt(0).toUpperCase() + event.sponsorLevel.slice(1)}
          </span>
        </div>

        {/* Availability Indicator */}
        {availableTickets < 50 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-warning text-white text-xs font-medium rounded-full">
              {availableTickets < 10 ? 'Almost Full' : 'Limited Seats'}
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-4">
        {/* Event Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded-full">
            {event.category}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span className="text-xs text-text-secondary">{event.rating}</span>
          </div>
        </div>

        {/* Event Title */}
        <Link to={`/event-details-page?id=${event.id}`}>
          <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 hover:text-primary nav-transition">
            {event.title}
          </h3>
        </Link>

        {/* Event Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>{startDate.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="MapPin" size={14} />
            <span className="truncate">{event.venue.name}, {event.venue.city}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Users" size={14} />
            <span>{event.attendeeCount}+ attending</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
              +{event.tags.length - 3}
            </span>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-text-primary">
              ${minPrice}
            </span>
            <span className="text-sm text-text-secondary ml-1">onwards</span>
          </div>
          <Link
            to={`/ticket-booking-interface?eventId=${event.id}`}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition text-sm font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;