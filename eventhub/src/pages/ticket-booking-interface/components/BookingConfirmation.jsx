import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BookingConfirmation = ({ 
  bookingReference, 
  eventData, 
  selectedTickets, 
  ticketTypes, 
  userDetails, 
  totals 
}) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailSent, setEmailSent] = useState(true);

  const selectedTicketDetails = Object.entries(selectedTickets)
    .filter(([_, quantity]) => quantity > 0)
    .map(([ticketId, quantity]) => {
      const ticket = ticketTypes.find(t => t.id === ticketId);
      return { ...ticket, quantity };
    });

  const handleDownloadTickets = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    // In real app, this would trigger actual PDF download
    console.log('Downloading tickets...');
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(eventData.date);
    const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000); // 8 hours later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.venue)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: `I'm attending ${eventData.title}!`,
        url: window.location.origin + '/event-details-page'
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`I'm attending ${eventData.title}! ${window.location.origin}/event-details-page`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-text-secondary">
          Your tickets have been successfully booked. Get ready for an amazing experience!
        </p>
      </div>

      {/* Booking Reference */}
      <div className="bg-primary-light border border-primary/20 rounded-lg p-6 mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Hash" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Booking Reference</span>
        </div>
        <div className="text-2xl font-bold text-text-primary mb-2">{bookingReference}</div>
        <p className="text-sm text-text-secondary">
          Save this reference number for your records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Details */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Event Details</h2>
          
          <div className="flex space-x-4 mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={eventData.image}
                alt={eventData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                {eventData.title}
              </h3>
              <div className="space-y-1 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} />
                  <span>{new Date(eventData.date).toLocaleDateString()} at {eventData.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} />
                  <span>{eventData.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={14} />
                  <span>{eventData.organizer}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCalendar}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-border rounded-lg hover:border-primary hover:bg-primary-light nav-transition"
            >
              <Icon name="Calendar" size={16} />
              <span className="text-sm">Add to Calendar</span>
            </button>
            <button
              onClick={handleShareEvent}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-border rounded-lg hover:border-primary hover:bg-primary-light nav-transition"
            >
              <Icon name="Share2" size={16} />
              <span className="text-sm">Share Event</span>
            </button>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Your Tickets</h2>
          
          <div className="space-y-4 mb-6">
            {selectedTicketDetails.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">{ticket.name}</div>
                  <div className="text-sm text-text-secondary">Quantity: {ticket.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-text-primary">
                    ${(ticket.price * ticket.quantity).toFixed(2)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    ${ticket.price} each
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download Tickets */}
          <button
            onClick={handleDownloadTickets}
            disabled={isDownloading}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 nav-transition"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Download Tickets (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Attendee Information */}
      <div className="bg-background rounded-lg shadow-sm border border-border p-6 mt-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Attendee Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-text-primary mb-2">Primary Attendee</h3>
            <div className="space-y-1 text-sm text-text-secondary">
              <div>{userDetails.firstName} {userDetails.lastName}</div>
              <div>{userDetails.email}</div>
              {userDetails.phone && <div>{userDetails.phone}</div>}
              {userDetails.company && <div>{userDetails.company}</div>}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-text-primary mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal:</span>
                <span className="text-text-primary">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Processing fee:</span>
                <span className="text-text-primary">${totals.processingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax:</span>
                <span className="text-text-primary">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-1 border-t border-border">
                <span className="text-text-primary">Total:</span>
                <span className="text-primary">${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
        <div className="flex items-start space-x-3">
          <Icon name={emailSent ? "Mail" : "MailX"} size={20} className={emailSent ? "text-success" : "text-warning"} />
          <div className="flex-1">
            <h3 className="font-medium text-text-primary mb-1">
              {emailSent ? "Confirmation Email Sent" : "Email Delivery Issue"}
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              {emailSent 
                ? `A confirmation email with your tickets has been sent to ${userDetails.email}`
                : "We're having trouble sending your confirmation email. Your booking is still valid."
              }
            </p>
            {!emailSent && (
              <button className="text-sm text-primary hover:underline">
                Resend confirmation email
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-background rounded-lg shadow-sm border border-border p-6 mt-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">What's Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">Download Your Tickets</h3>
            <p className="text-sm text-text-secondary">
              Save your tickets to your device or print them for entry
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">Add to Calendar</h3>
            <p className="text-sm text-text-secondary">
              Set a reminder so you don't miss the event
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="MapPin" size={20} className="text-primary" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">Plan Your Visit</h3>
            <p className="text-sm text-text-secondary">
              Check venue details and plan your journey
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <button
          onClick={() => navigate('/user-dashboard')}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
        >
          <Icon name="User" size={16} />
          <span>View My Bookings</span>
        </button>
        <button
          onClick={() => navigate('/event-discovery-dashboard')}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition"
        >
          <Icon name="Search" size={16} />
          <span>Discover More Events</span>
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;