import React from 'react';
import Icon from '../AppIcon';

const BookingProgress = ({ currentStep = 1, totalSteps = 4, onStepChange }) => {
  const steps = [
    {
      id: 1,
      label: 'Selection',
      description: 'Choose your tickets',
      icon: 'Ticket'
    },
    {
      id: 2,
      label: 'Details',
      description: 'Enter information',
      icon: 'User'
    },
    {
      id: 3,
      label: 'Payment',
      description: 'Complete purchase',
      icon: 'CreditCard'
    },
    {
      id: 4,
      label: 'Confirmation',
      description: 'Booking complete',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (stepId) => {
    // Only allow navigation to previous steps or current step
    if (stepId <= currentStep && onStepChange) {
      onStepChange(stepId);
    }
  };

  return (
    <div className="bg-background border-b border-border sticky top-16 z-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Progress */}
        <div className="hidden md:block">
          <nav aria-label="Booking progress">
            <ol className="flex items-center justify-between">
              {steps.slice(0, totalSteps).map((step, index) => {
                const status = getStepStatus(step.id);
                const isClickable = step.id <= currentStep;
                
                return (
                  <li key={step.id} className="flex-1 relative">
                    <div className="flex items-center">
                      {/* Step Circle */}
                      <button
                        onClick={() => handleStepClick(step.id)}
                        disabled={!isClickable}
                        className={`
                          relative flex items-center justify-center w-10 h-10 rounded-full border-2 nav-transition
                          ${status === 'completed' 
                            ? 'bg-success border-success text-white hover:bg-emerald-700' 
                            : status === 'current' ?'bg-primary border-primary text-white' :'bg-background border-border text-text-secondary'
                          }
                          ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                        `}
                      >
                        {status === 'completed' ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <Icon name={step.icon} size={16} />
                        )}
                      </button>

                      {/* Step Content */}
                      <div className="ml-4 min-w-0 flex-1">
                        <p className={`text-sm font-medium ${
                          status === 'current' ? 'text-primary' : 
                          status === 'completed'? 'text-success' : 'text-text-secondary'
                        }`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {step.description}
                        </p>
                      </div>

                      {/* Connector Line */}
                      {index < totalSteps - 1 && (
                        <div className="absolute top-5 left-10 w-full h-0.5 -z-10">
                          <div className={`h-full ${
                            step.id < currentStep ? 'bg-success' : 'bg-border'
                          }`} />
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-text-secondary">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-border rounded-full h-2 mb-3">
            <div 
              className="bg-primary h-2 rounded-full nav-transition"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Current Step Info */}
          <div className="flex items-center space-x-3">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full
              ${currentStep <= totalSteps ? 'bg-primary text-white' : 'bg-success text-white'}
            `}>
              {currentStep > totalSteps ? (
                <Icon name="Check" size={14} />
              ) : (
                <Icon name={steps[currentStep - 1]?.icon} size={14} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {steps[currentStep - 1]?.label || 'Complete'}
              </p>
              <p className="text-xs text-text-secondary">
                {steps[currentStep - 1]?.description || 'Booking confirmed'}
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation (Mobile) */}
        <div className="md:hidden mt-4 flex justify-between">
          <button
            onClick={() => handleStepClick(Math.max(1, currentStep - 1))}
            disabled={currentStep <= 1}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
          >
            <Icon name="ChevronLeft" size={14} />
            <span>Previous</span>
          </button>
          
          <div className="flex space-x-1">
            {steps.slice(0, totalSteps).map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                disabled={step.id > currentStep}
                className={`w-2 h-2 rounded-full nav-transition ${
                  step.id <= currentStep ? 'bg-primary' : 'bg-border'
                } ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleStepClick(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep >= totalSteps}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;