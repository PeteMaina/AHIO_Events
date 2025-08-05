import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HeroSection = ({ eventData, onBookTickets, onFavorite, isFavorited }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={eventData.bannerImage}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Event Category */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                {eventData.category}
              </span>
              <div className="flex items-center space-x-1">
                {eventData.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Event Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {eventData.title}
            </h1>
            
            {/* Event Subtitle */}
            {eventData.subtitle && (
              <p className="text-lg md:text-xl text-gray-200 mb-6">
                {eventData.subtitle}
              </p>
            )}

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Date */}
              <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Icon name="Calendar" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-200">Date</p>
                  <p className="font-medium">
                    {formatDate(eventData.startDate)}
                  </p>
                  <p className="text-sm text-gray-200">
                    {formatTime(eventData.startDate)} - {formatTime(eventData.endDate)}
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Icon name="MapPin" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-200">Venue</p>
                  <p className="font-medium">{eventData.venue.name}</p>
                  <p className="text-sm text-gray-200">{eventData.venue.city}</p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Icon name="Users" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-200">Attendance</p>
                  <p className="font-medium">
                    {eventData.registered} / {eventData.capacity}
                  </p>
                  <p className="text-sm text-gray-200">
                    {eventData.capacity - eventData.registered} spots left
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onBookTickets}
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold nav-transition flex items-center justify-center space-x-2"
              >
                <Icon name="Ticket" size={20} />
                <span>Book Tickets</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onFavorite}
                  className={`p-3 rounded-lg border-2 nav-transition ${
                    isFavorited
                      ? 'bg-primary border-primary text-white' :'bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-opacity-30'
                  }`}
                >
                  <Icon name={isFavorited ? "Heart" : "Heart"} size={20} />
                </button>

                <button className="p-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 text-white rounded-lg hover:bg-opacity-30 nav-transition">
                  <Icon name="Share2" size={20} />
                </button>
              </div>
            </div>

            {/* Price Preview */}
            <div className="mt-6 flex items-center space-x-2 text-white">
              <span className="text-sm text-gray-200">Starting from</span>
              <span className="text-2xl font-bold">
                ${eventData.ticketTypes[0].price}
              </span>
              {eventData.ticketTypes[0].originalPrice && (
                <span className="text-lg text-gray-300 line-through">
                  ${eventData.ticketTypes[0].originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;