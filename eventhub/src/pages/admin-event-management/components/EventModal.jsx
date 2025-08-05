import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const EventModal = ({ event, onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Technology',
    status: 'draft',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    venue: {
      name: '',
      address: '',
      capacity: 100,
      mapUrl: ''
    },
    organizer: {
      name: '',
      email: '',
      phone: ''
    },
    speakers: [],
    tickets: [
      {
        type: 'General',
        price: 99,
        total: 100,
        description: 'Standard event access'
      }
    ],
    image: '',
    logo: ''
  });
  const [errors, setErrors] = useState({});

  // Initialize form data
  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'venue', label: 'Venue & Schedule', icon: 'MapPin' },
    { id: 'speakers', label: 'Speakers', icon: 'Users' },
    { id: 'tickets', label: 'Tickets & Pricing', icon: 'Ticket' },
    { id: 'media', label: 'Media & Branding', icon: 'Image' }
  ];

  const categories = [
    'Technology', 'Marketing', 'Business', 'Healthcare', 
    'Environment', 'Education', 'Finance', 'Entertainment'
  ];

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
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...formData.tickets];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setFormData(prev => ({ ...prev, tickets: updatedTickets }));
  };

  const addTicket = () => {
    setFormData(prev => ({
      ...prev,
      tickets: [
        ...prev.tickets,
        {
          type: 'New Ticket',
          price: 0,
          total: 100,
          description: 'Ticket description'
        }
      ]
    }));
  };

  const removeTicket = (index) => {
    setFormData(prev => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Event name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.venue.name.trim()) newErrors['venue.name'] = 'Venue name is required';
    if (!formData.venue.address.trim()) newErrors['venue.address'] = 'Venue address is required';
    if (!formData.organizer.name.trim()) newErrors['organizer.name'] = 'Organizer name is required';
    if (!formData.organizer.email.trim()) newErrors['organizer.email'] = 'Organizer email is required';

    // Validate dates
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    // Validate tickets
    if (formData.tickets.length === 0) {
      newErrors.tickets = 'At least one ticket type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Event Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.name ? 'border-error' : 'border-border'
          }`}
          placeholder="Enter event name"
        />
        {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.description ? 'border-error' : 'border-border'
          }`}
          placeholder="Describe your event"
        />
        {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderVenueSchedule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Start Date *
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.startDate ? 'border-error' : 'border-border'
            }`}
          />
          {errors.startDate && <p className="mt-1 text-sm text-error">{errors.startDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            End Date *
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.endDate ? 'border-error' : 'border-border'
            }`}
          />
          {errors.endDate && <p className="mt-1 text-sm text-error">{errors.endDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            End Time
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Venue Name *
        </label>
        <input
          type="text"
          value={formData.venue.name}
          onChange={(e) => handleInputChange('venue.name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors['venue.name'] ? 'border-error' : 'border-border'
          }`}
          placeholder="Enter venue name"
        />
        {errors['venue.name'] && <p className="mt-1 text-sm text-error">{errors['venue.name']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Venue Address *
        </label>
        <input
          type="text"
          value={formData.venue.address}
          onChange={(e) => handleInputChange('venue.address', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors['venue.address'] ? 'border-error' : 'border-border'
          }`}
          placeholder="Enter venue address"
        />
        {errors['venue.address'] && <p className="mt-1 text-sm text-error">{errors['venue.address']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Venue Capacity
        </label>
        <input
          type="number"
          value={formData.venue.capacity}
          onChange={(e) => handleInputChange('venue.capacity', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter venue capacity"
          min="1"
        />
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Ticket Types</h3>
        <button
          type="button"
          onClick={addTicket}
          className="inline-flex items-center px-3 py-2 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-lg nav-transition text-sm"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Ticket
        </button>
      </div>

      {formData.tickets.map((ticket, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">Ticket {index + 1}</h4>
            {formData.tickets.length > 1 && (
              <button
                type="button"
                onClick={() => removeTicket(index)}
                className="text-error hover:text-red-700 nav-transition"
              >
                <Icon name="Trash2" size={16} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Ticket Type
              </label>
              <input
                type="text"
                value={ticket.type}
                onChange={(e) => handleTicketChange(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., General, VIP, Early Bird"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Price ($)
              </label>
              <input
                type="number"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, 'price', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Total Available
              </label>
              <input
                type="number"
                value={ticket.total}
                onChange={(e) => handleTicketChange(index, 'total', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="100"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <input
                type="text"
                value={ticket.description}
                onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ticket description"
              />
            </div>
          </div>
        </div>
      ))}

      {errors.tickets && <p className="text-sm text-error">{errors.tickets}</p>}
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Event Banner Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://example.com/banner.jpg"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Recommended size: 800x400px
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Event Logo URL
        </label>
        <input
          type="url"
          value={formData.logo}
          onChange={(e) => handleInputChange('logo', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://example.com/logo.jpg"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Recommended size: 100x100px
        </p>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-text-primary mb-4">Organizer Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Organizer Name *
            </label>
            <input
              type="text"
              value={formData.organizer.name}
              onChange={(e) => handleInputChange('organizer.name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors['organizer.name'] ? 'border-error' : 'border-border'
              }`}
              placeholder="Enter organizer name"
            />
            {errors['organizer.name'] && <p className="mt-1 text-sm text-error">{errors['organizer.name']}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              value={formData.organizer.email}
              onChange={(e) => handleInputChange('organizer.email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors['organizer.email'] ? 'border-error' : 'border-border'
              }`}
              placeholder="contact@example.com"
            />
            {errors['organizer.email'] && <p className="mt-1 text-sm text-error">{errors['organizer.email']}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              value={formData.organizer.phone}
              onChange={(e) => handleInputChange('organizer.phone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="+1-555-0123"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpeakers = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">Speaker Management</h3>
        <p className="text-text-secondary mb-4">
          Speaker management functionality will be available in the full implementation.
        </p>
        <p className="text-sm text-text-secondary">
          This would include adding speakers, managing their profiles, and assigning them to sessions.
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1050 p-4">
      <div className="bg-background rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-primary nav-transition"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex h-[calc(90vh-8rem)]">
          {/* Tabs Sidebar */}
          <div className="w-64 border-r border-border bg-surface">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg nav-transition ${
                    activeTab === tab.id
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-light'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'venue' && renderVenueSchedule()}
              {activeTab === 'speakers' && renderSpeakers()}
              {activeTab === 'tickets' && renderTickets()}
              {activeTab === 'media' && renderMedia()}
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-lg nav-transition"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, status: 'draft' }));
                handleSubmit({ preventDefault: () => {} });
              }}
              className="px-4 py-2 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-lg nav-transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition font-medium"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;