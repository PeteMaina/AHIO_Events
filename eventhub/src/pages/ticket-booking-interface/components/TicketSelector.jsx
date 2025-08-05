import React from 'react';
import Icon from 'components/AppIcon';

const TicketSelector = ({ ticketTypes, selectedTickets, onTicketChange }) => {
  const handleQuantityChange = (ticketId, change) => {
    const currentQuantity = selectedTickets[ticketId] || 0;
    const ticket = ticketTypes.find(t => t.id === ticketId);
    const newQuantity = Math.max(0, Math.min(currentQuantity + change, Math.min(ticket.available, ticket.maxPerOrder)));
    
    onTicketChange(ticketId, newQuantity);
  };

  const setQuantity = (ticketId, quantity) => {
    const ticket = ticketTypes.find(t => t.id === ticketId);
    const validQuantity = Math.max(0, Math.min(quantity, Math.min(ticket.available, ticket.maxPerOrder)));
    onTicketChange(ticketId, validQuantity);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Select Your Tickets</h2>
        <p className="text-text-secondary">Choose the ticket type and quantity that best fits your needs.</p>
      </div>

      <div className="space-y-4">
        {ticketTypes.map((ticket) => {
          const quantity = selectedTickets[ticket.id] || 0;
          const isAvailable = ticket.available > 0;
          const isMaxReached = quantity >= Math.min(ticket.available, ticket.maxPerOrder);

          return (
            <div
              key={ticket.id}
              className={`relative border rounded-lg p-6 nav-transition ${
                quantity > 0 
                  ? 'border-primary bg-primary-light' 
                  : isAvailable 
                    ? 'border-border hover:border-primary hover:shadow-sm' 
                    : 'border-border bg-gray-50 opacity-60'
              }`}
            >
              {/* Popular Badge */}
              {ticket.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                {/* Ticket Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">{ticket.name}</h3>
                    {!isAvailable && (
                      <span className="bg-error text-white text-xs font-medium px-2 py-1 rounded">
                        Sold Out
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      {ticket.originalPrice && (
                        <span className="text-text-secondary line-through text-lg">
                          ${ticket.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-text-primary">
                        ${ticket.price}
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary">
                      {ticket.available} available
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-text-primary mb-2">What's included:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {ticket.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Special Note */}
                  {ticket.note && (
                    <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-warning">{ticket.note}</p>
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex flex-col items-end space-y-3">
                  {isAvailable ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(ticket.id, -1)}
                          disabled={quantity === 0}
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:border-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
                        >
                          <Icon name="Minus" size={16} />
                        </button>
                        
                        <input
                          type="number"
                          min="0"
                          max={Math.min(ticket.available, ticket.maxPerOrder)}
                          value={quantity}
                          onChange={(e) => setQuantity(ticket.id, parseInt(e.target.value) || 0)}
                          className="w-16 h-10 text-center border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        
                        <button
                          onClick={() => handleQuantityChange(ticket.id, 1)}
                          disabled={isMaxReached}
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:border-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                      
                      <div className="text-xs text-text-secondary text-center">
                        Max {ticket.maxPerOrder} per order
                      </div>
                      
                      {quantity > 0 && (
                        <div className="text-right">
                          <div className="text-sm text-text-secondary">Subtotal</div>
                          <div className="text-lg font-semibold text-text-primary">
                            ${(ticket.price * quantity).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="text-error font-medium mb-1">Sold Out</div>
                      <div className="text-xs text-text-secondary">Check back later</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {Object.values(selectedTickets).some(qty => qty > 0) && (
        <div className="mt-6 p-4 bg-primary-light border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={16} className="text-primary" />
              <span className="font-medium text-text-primary">
                {Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0)} ticket(s) selected
              </span>
            </div>
            <button
              onClick={() => Object.keys(selectedTickets).forEach(id => onTicketChange(id, 0))}
              className="text-sm text-text-secondary hover:text-primary nav-transition"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSelector;