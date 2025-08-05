import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const BookingWidget = ({ eventData, onBookTickets }) => {
  const [selectedTicket, setSelectedTicket] = useState(eventData.ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= Math.min(selectedTicket.available, 10)) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = selectedTicket.price * quantity;
  const savings = selectedTicket.originalPrice 
    ? (selectedTicket.originalPrice - selectedTicket.price) * quantity 
    : 0;

  const handleBookNow = () => {
    navigate(`/ticket-booking-interface?eventId=${eventData.id}&ticketType=${selectedTicket.id}&quantity=${quantity}`);
  };

  const getAvailabilityStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return { color: 'text-success', label: 'Available' };
    if (percentage > 20) return { color: 'text-warning', label: 'Limited' };
    return { color: 'text-error', label: 'Few Left' };
  };

  return (
    <div className="bg-background rounded-lg border border-border p-6 sticky top-24">
      {/* Widget Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Book Your Tickets
        </h3>
        <p className="text-text-secondary text-sm">
          Secure your spot at this amazing event
        </p>
      </div>

      {/* Ticket Type Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">
          Select Ticket Type
        </h4>
        <div className="space-y-3">
          {eventData.ticketTypes.map((ticket) => {
            const availability = getAvailabilityStatus(ticket.available, ticket.total);
            return (
              <div
                key={ticket.id}
                className={`border rounded-lg p-4 cursor-pointer nav-transition ${
                  selectedTicket.id === ticket.id
                    ? 'border-primary bg-primary-light' :'border-border hover:border-primary/50'
                }`}
                onClick={() => {
                  setSelectedTicket(ticket);
                  setQuantity(1);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-text-primary">
                        {ticket.name}
                      </h5>
                      {ticket.originalPrice && (
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                          Save ${ticket.originalPrice - ticket.price}
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm mb-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`${availability.color} font-medium`}>
                        {availability.label}
                      </span>
                      <span className="text-text-secondary">
                        ({ticket.available} of {ticket.total} left)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-text-primary">
                      ${ticket.price}
                    </p>
                    {ticket.originalPrice && (
                      <p className="text-text-secondary text-sm line-through">
                        ${ticket.originalPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Ticket Features */}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-2">
                    {ticket.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Icon name="Check" size={12} className="text-success" />
                        <span className="text-xs text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {ticket.features.length > 4 && (
                    <p className="text-xs text-primary mt-2">
                      +{ticket.features.length - 4} more features
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">
          Quantity
        </h4>
        <div className="flex items-center justify-between bg-surface rounded-lg p-3 border border-border">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
          >
            <Icon name="Minus" size={14} className="text-text-secondary" />
          </button>
          
          <span className="font-medium text-text-primary">
            {quantity} {quantity === 1 ? 'ticket' : 'tickets'}
          </span>
          
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= Math.min(selectedTicket.available, 10)}
            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
          >
            <Icon name="Plus" size={14} className="text-text-secondary" />
          </button>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Maximum 10 tickets per order
        </p>
      </div>

      {/* Price Summary */}
      <div className="mb-6 p-4 bg-surface rounded-lg border border-border">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">
              {selectedTicket.name} × {quantity}
            </span>
            <span className="font-medium text-text-primary">
              ${selectedTicket.price * quantity}
            </span>
          </div>
          
          {savings > 0 && (
            <div className="flex justify-between items-center text-success">
              <span>You save</span>
              <span className="font-medium">-${savings}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center text-text-secondary">
            <span>Service fee</span>
            <span>$5.99</span>
          </div>
          
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="text-xl font-bold text-primary">
                ${totalPrice + 5.99}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={selectedTicket.available === 0}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed nav-transition flex items-center justify-center space-x-2"
      >
        <Icon name="Ticket" size={16} />
        <span>
          {selectedTicket.available === 0 ? 'Sold Out' : 'Book Now'}
        </span>
      </button>

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-text-secondary text-sm">
        <Icon name="Shield" size={14} />
        <span>Secure booking with 256-bit SSL encryption</span>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-primary-light rounded-lg border border-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-text-primary font-medium mb-1">
              Free cancellation
            </p>
            <p className="text-text-secondary">
              Cancel up to 24 hours before the event for a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;