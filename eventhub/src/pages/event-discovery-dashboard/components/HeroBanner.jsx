import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HeroBanner = ({ events = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => (prev - 1 + events.length) % events.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % events.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMinPrice = (ticketTypes) => {
    return Math.min(...ticketTypes.map(ticket => ticket.price));
  };

  if (!events.length) {
    return (
      <div className="relative h-96 bg-surface flex items-center justify-center">
        <div className="text-center">
          <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No featured events available</p>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentSlide];

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-surface">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentEvent.bannerImage}
          alt={currentEvent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Event Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                Featured Event
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs font-medium rounded-full">
                {currentEvent.category}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {currentEvent.title}
            </h1>

            {/* Event Description */}
            <p className="text-lg text-white text-opacity-90 mb-6 line-clamp-2">
              {currentEvent.description}
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-white text-opacity-90">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">
                  {formatDate(currentEvent.startDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">
                  {currentEvent.venue.city}, {currentEvent.venue.state}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span className="text-sm">
                  {currentEvent.attendeeCount}+ attending
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} />
                <span className="text-sm">
                  From ${getMinPrice(currentEvent.ticketTypes)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/event-details-page?id=${currentEvent.id}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition font-medium"
              >
                <span>View Details</span>
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Link>
              <Link
                to={`/ticket-booking-interface?eventId=${currentEvent.id}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-text-primary rounded-lg hover:bg-gray-100 nav-transition font-medium"
              >
                <Icon name="Ticket" size={16} className="mr-2" />
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {events.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center nav-transition"
          >
            <Icon name="ChevronLeft" size={20} className="text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center nav-transition"
          >
            <Icon name="ChevronRight" size={20} className="text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full nav-transition ${
                  index === currentSlide
                    ? 'bg-white' :'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center nav-transition"
              title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              <Icon 
                name={isAutoPlaying ? "Pause" : "Play"} 
                size={16} 
                className="text-white" 
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBanner;