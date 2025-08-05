import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const UserDetailsForm = ({ userDetails, onDetailsChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    dietaryRestrictions: '',
    specialRequests: '',
    marketingConsent: false,
    termsAccepted: false,
    ...userDetails
  });

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  // Mock user data for auto-completion (simulating logged-in user)
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    jobTitle: 'Senior Developer'
  };

  useEffect(() => {
    onDetailsChange(formData);
  }, [formData, onDetailsChange]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutoFill = () => {
    setFormData(prev => ({
      ...prev,
      ...mockUserData
    }));
  };

  const handleBlur = (field) => {
    setIsValidating(true);
    setTimeout(() => {
      if (field === 'email' && formData.email && !validateEmail(formData.email)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      }
      if (field === 'phone' && formData.phone && !validatePhone(formData.phone)) {
        setErrors(prev => ({
          ...prev,
          phone: 'Please enter a valid phone number'
        }));
      }
      setIsValidating(false);
    }, 500);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-text-primary">Attendee Information</h2>
          <button
            onClick={handleAutoFill}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary-dark nav-transition"
          >
            <Icon name="User" size={14} />
            <span>Use my details</span>
          </button>
        </div>
        <p className="text-text-secondary">Please provide the information for the primary attendee.</p>
      </div>

      <form className="space-y-6">
        {/* Personal Information */}
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onBlur={() => handleBlur('firstName')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition ${
                  errors.firstName ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.firstName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onBlur={() => handleBlur('lastName')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition ${
                  errors.lastName ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.lastName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition ${
                  errors.email ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition ${
                  errors.phone ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                placeholder="Enter your job title"
              />
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Special Requirements</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Dietary Restrictions
              </label>
              <input
                type="text"
                value={formData.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition"
                placeholder="e.g., Vegetarian, Vegan, Gluten-free, Allergies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent nav-transition resize-none"
                placeholder="Any accessibility needs or special requests..."
              />
            </div>
          </div>
        </div>

        {/* Consent and Terms */}
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Consent & Terms</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="marketingConsent"
                checked={formData.marketingConsent}
                onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="marketingConsent" className="text-sm text-text-secondary">
                I would like to receive updates about future events and promotions via email.
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="termsAccepted" className="text-sm text-text-secondary">
                I accept the{' '}
                <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                {' '}*
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{errors.termsAccepted}</span>
              </p>
            )}
          </div>
        </div>

        {/* Form Validation Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Please fix the following errors:</span>
            </div>
            <ul className="text-sm text-error space-y-1 ml-6">
              {Object.values(errors).map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserDetailsForm;