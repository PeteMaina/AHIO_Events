import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProfileQuickEdit = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      eventReminders: true,
      promotionalEmails: false
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (preference) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        eventReminders: true,
        promotionalEmails: false
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Profile</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-primary hover:text-primary-dark nav-transition"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Profile Avatar */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Image
            src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt={user?.name || "User"}
            className="w-16 h-16 rounded-full object-cover"
          />
          {isEditing && (
            <button className="absolute -bottom-1 -right-1 p-1.5 bg-primary text-white rounded-full hover:bg-primary-dark nav-transition">
              <Icon name="Camera" size={12} />
            </button>
          )}
        </div>
        <div>
          <h4 className="text-lg font-medium text-text-primary">{user?.name}</h4>
          <p className="text-sm text-text-secondary">Member since {new Date(user?.joinDate).getFullYear()}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="text-sm text-text-secondary">{formData.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="text-sm text-text-secondary">{formData.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="text-sm text-text-secondary">{formData.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Location
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="text-sm text-text-secondary">{formData.location}</p>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3">Notification Preferences</h4>
          <div className="space-y-3">
            {Object.entries(formData.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-text-secondary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <button
                  onClick={() => isEditing && handlePreferenceChange(key)}
                  disabled={!isEditing}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    value ? 'bg-primary' : 'bg-gray-200'
                  } ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface nav-transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileQuickEdit;