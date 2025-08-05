import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BookingSummary = ({ eventData, selectedTickets, ticketTypes, totals, currentStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedTicketDetails = Object.entries(selectedTickets)
    .filter(([_, quantity]) => quantity > 0)
    .map(([ticketId, quantity]) => {
      const ticket = ticketTypes.find(t => t.id === ticketId);
      return { ...ticket, quantity };
    });

  if (totals.totalTickets === 0) {
    return (
      <div className="bg-background rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>
        <div className="text-center py-8">
          <Icon name="ShoppingCart" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No tickets selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-sm border border-border overflow-hidden sticky top-32">
      {/* Mobile Toggle Header */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between bg-primary text-white"
        >
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingCart" size={16} />
            <span className="font-medium">
              {totals.totalTickets} ticket{totals.totalTickets !== 1 ? 's' : ''} • ${totals.total.toFixed(2)}
            </span>
          </div>
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>
      </div>

      {/* Summary Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Event Info */}
        <div className="p-6 border-b border-border">
          <div className="flex space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={eventData.image}
                alt={eventData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary mb-1 line-clamp-2">
                {eventData.title}
              </h3>
              <div className="space-y-1 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{new Date(eventData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span className="truncate">{eventData.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Tickets */}
        <div className="p-6 border-b border-border">
          <h4 className="font-semibold text-text-primary mb-4">Selected Tickets</h4>
          <div className="space-y-3">
            {selectedTicketDetails.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">
                      {ticket.name}
                    </span>
                    <span className="text-xs text-text-secondary">
                      ×{ticket.quantity}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary">
                    ${ticket.price} each
                  </div>
                </div>
                <div className="text-sm font-medium text-text-primary">
                  ${(ticket.price * ticket.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-6 border-b border-border">
          <h4 className="font-semibold text-text-primary mb-4">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                Subtotal ({totals.totalTickets} ticket{totals.totalTickets !== 1 ? 's' : ''})
              </span>
              <span className="text-text-primary">${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Processing fee</span>
              <span className="text-text-primary">${totals.processingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tax (8%)</span>
              <span className="text-text-primary">${totals.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">Total</span>
                <span className="font-bold text-lg text-primary">${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Trust Indicators */}
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Secure SSL encryption</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="RefreshCw" size={14} className="text-success" />
              <span>Free cancellation up to 24h</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Mail" size={14} className="text-success" />
              <span>Instant email confirmation</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Smartphone" size={14} className="text-success" />
              <span>Mobile tickets available</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs text-text-secondary mb-2">We accept:</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
                V
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white text-xs flex items-center justify-center font-bold">
                M
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-blue-800 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                A
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                P
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;