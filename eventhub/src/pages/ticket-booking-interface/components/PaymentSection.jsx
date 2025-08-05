import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PaymentSection = ({ paymentDetails, onPaymentChange, totals, isProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    saveCard: false,
    ...paymentDetails
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    onPaymentChange(formData);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6/.test(num)) return 'discover';
    return 'card';
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Touch ID or Face ID'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: 'Smartphone',
      description: 'Pay with Google'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Payment Information</h2>
        <p className="text-text-secondary">Choose your preferred payment method and complete your purchase.</p>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">Secure Payment</span>
        </div>
        <p className="text-sm text-green-700 mt-1">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 border rounded-lg text-left nav-transition ${
                paymentMethod === method.id
                  ? 'border-primary bg-primary-light' :'border-border hover:border-primary hover:bg-surface'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={method.icon} 
                  size={20} 
                  className={paymentMethod === method.id ? 'text-primary' : 'text-text-secondary'} 
                />
                <div>
                  <div className={`font-medium ${
                    paymentMethod === method.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {method.name}
                  </div>
                  <div className="text-xs text-text-secondary">{method.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Forms */}
      {paymentMethod === 'card' && (
        <div className="space-y-6">
          {/* Card Information */}
          <div className="bg-surface rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Card Information</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Icon 
                      name={getCardType(formData.cardNumber) === 'visa' ? 'CreditCard' : 'CreditCard'} 
                      size={20} 
                      className="text-text-secondary" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                  placeholder="Name as it appears on card"
                />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-surface rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Billing Address</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.billingAddress.street}
                  onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.city}
                    onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                    placeholder="San Francisco"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    State *
                  </label>
                  <select
                    value={formData.billingAddress.state}
                    onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.zipCode}
                    onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                    placeholder="94102"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Card Option */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="saveCard"
              checked={formData.saveCard}
              onChange={(e) => handleInputChange('saveCard', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="saveCard" className="text-sm text-text-secondary">
              Save this card for future purchases
            </label>
          </div>
        </div>
      )}

      {/* Alternative Payment Methods */}
      {paymentMethod !== 'card' && (
        <div className="bg-surface rounded-lg p-8 text-center">
          <Icon name="ExternalLink" size={48} className="text-text-secondary mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-text-primary mb-2">
            Continue with {paymentMethods.find(m => m.id === paymentMethod)?.name}
          </h4>
          <p className="text-text-secondary mb-6">
            You'll be redirected to complete your payment securely.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Secured by SSL encryption</span>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-primary-light border border-primary/20 rounded-lg p-6 mt-6">
        <h4 className="text-lg font-semibold text-text-primary mb-4">Final Order Summary</h4>
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
          <div className="border-t border-primary/20 pt-2 mt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-text-primary">Total Amount</span>
              <span className="font-bold text-xl text-primary">${totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
          <div className="bg-background rounded-lg p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Processing Payment</h3>
            <p className="text-text-secondary">Please don't close this window...</p>
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-text-secondary">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Secure transaction in progress</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;