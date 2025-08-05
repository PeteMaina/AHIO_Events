import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import BookingProgress from 'components/ui/BookingProgress';
import TicketSelector from './components/TicketSelector';
import BookingSummary from './components/BookingSummary';
import UserDetailsForm from './components/UserDetailsForm';
import PaymentSection from './components/PaymentSection';
import BookingConfirmation from './components/BookingConfirmation';

const TicketBookingInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [bookingReference, setBookingReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Mock event data (would come from route params or API)
  const eventData = {
    id: 'evt-001',
    title: 'Tech Innovation Summit 2024',
    date: '2024-03-15',
    time: '09:00 AM',
    venue: 'Convention Center, San Francisco',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    organizer: 'TechEvents Inc.',
    description: 'Join industry leaders for a day of innovation, networking, and insights into the future of technology.'
  };

  // Mock ticket types
  const ticketTypes = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 299,
      originalPrice: 399,
      available: 45,
      maxPerOrder: 5,
      benefits: [
        'Full conference access',
        'Welcome breakfast',
        'Networking lunch',
        'Conference materials',
        'Certificate of attendance'
      ],
      popular: true
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 399,
      available: 120,
      maxPerOrder: 5,
      benefits: [
        'Full conference access',
        'Networking lunch',
        'Conference materials',
        'Certificate of attendance'
      ]
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: 799,
      available: 25,
      maxPerOrder: 2,
      benefits: [
        'Premium seating',
        'VIP lounge access',
        'Meet & greet with speakers',
        'Welcome breakfast',
        'Networking lunch',
        'Conference materials',
        'Certificate of attendance',
        'Exclusive networking dinner'
      ]
    },
    {
      id: 'student',
      name: 'Student',
      price: 99,
      available: 50,
      maxPerOrder: 1,
      benefits: [
        'Full conference access',
        'Conference materials',
        'Certificate of attendance'
      ],
      note: 'Valid student ID required at entry'
    }
  ];

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    let totalTickets = 0;

    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      if (quantity > 0) {
        const ticket = ticketTypes.find(t => t.id === ticketId);
        if (ticket) {
          subtotal += ticket.price * quantity;
          totalTickets += quantity;
        }
      }
    });

    const tax = subtotal * 0.08; // 8% tax
    const processingFee = totalTickets * 2.50;
    const total = subtotal + tax + processingFee;

    return { subtotal, tax, processingFee, total, totalTickets };
  };

  const totals = calculateTotals();

  // Handle ticket quantity changes
  const handleTicketChange = (ticketId, quantity) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: quantity
    }));
  };

  // Handle step navigation
  const handleStepChange = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = () => {
    setError('');
    
    if (currentStep === 1) {
      // Validate ticket selection
      if (totals.totalTickets === 0) {
        setError('Please select at least one ticket to continue.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate user details
      if (!userDetails.firstName || !userDetails.lastName || !userDetails.email) {
        setError('Please fill in all required fields.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Process payment
      handlePayment();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate booking reference
      const reference = `EVT${Date.now().toString().slice(-6)}`;
      setBookingReference(reference);
      setCurrentStep(4);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToEvents = () => {
    navigate('/event-discovery-dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TicketSelector
            ticketTypes={ticketTypes}
            selectedTickets={selectedTickets}
            onTicketChange={handleTicketChange}
          />
        );
      case 2:
        return (
          <UserDetailsForm
            userDetails={userDetails}
            onDetailsChange={setUserDetails}
          />
        );
      case 3:
        return (
          <PaymentSection
            paymentDetails={paymentDetails}
            onPaymentChange={setPaymentDetails}
            totals={totals}
            isProcessing={isProcessing}
          />
        );
      case 4:
        return (
          <BookingConfirmation
            bookingReference={bookingReference}
            eventData={eventData}
            selectedTickets={selectedTickets}
            ticketTypes={ticketTypes}
            userDetails={userDetails}
            totals={totals}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-16">
      {/* Booking Progress */}
      <BookingProgress
        currentStep={currentStep}
        totalSteps={4}
        onStepChange={handleStepChange}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="w-full lg:w-32 h-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={eventData.image}
                alt={eventData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-text-primary mb-2">
                {eventData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>{new Date(eventData.date).toLocaleDateString()} at {eventData.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{eventData.venue}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={16} />
                  <span>{eventData.organizer}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleBackToEvents}
              className="lg:self-start flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary border border-border rounded-lg hover:border-primary nav-transition"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Back to Events</span>
            </button>
          </div>
        </div>

        {/* Main Booking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg shadow-sm border border-border p-6">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <span className="text-sm text-error font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Step Content */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mt-8 pt-6 border-t border-border">
                  <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 border border-border text-text-secondary rounded-lg hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
                  >
                    <Icon name="ChevronLeft" size={16} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-4">
                    {totals.totalTickets > 0 && (
                      <div className="text-sm text-text-secondary">
                        {totals.totalTickets} ticket{totals.totalTickets !== 1 ? 's' : ''} • ${totals.total.toFixed(2)}
                      </div>
                    )}
                    <button
                      onClick={handleNextStep}
                      disabled={isProcessing || (currentStep === 1 && totals.totalTickets === 0)}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed nav-transition min-w-[140px]"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {currentStep === 1 ? 'Continue' : 
                             currentStep === 2 ? 'Continue': 'Complete Payment'}
                          </span>
                          <Icon name="ChevronRight" size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <BookingSummary
                eventData={eventData}
                selectedTickets={selectedTickets}
                ticketTypes={ticketTypes}
                totals={totals}
                currentStep={currentStep}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketBookingInterface;