import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedNavigation = ({ currentUser, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(currentUser?.role || 'attendee');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Available roles with their configurations
  const roleConfigs = {
    attendee: {
      label: 'Attendee',
      description: 'Browse and book events',
      icon: 'User',
      color: 'text-primary',
      defaultRoute: '/event-discovery-dashboard'
    },
    organizer: {
      label: 'Event Organizer',
      description: 'Create and manage events',
      icon: 'Calendar',
      color: 'text-warning',
      defaultRoute: '/admin-event-management'
    },
    admin: {
      label: 'Administrator',
      description: 'Platform management',
      icon: 'Shield',
      color: 'text-error',
      defaultRoute: '/admin-event-management'
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update current role when user prop changes
  useEffect(() => {
    if (currentUser?.role) {
      setCurrentRole(currentUser.role);
    }
  }, [currentUser?.role]);

  const handleRoleSwitch = (newRole) => {
    if (newRole === currentRole) {
      setIsOpen(false);
      return;
    }

    setCurrentRole(newRole);
    setIsOpen(false);

    // Call the role change callback
    if (onRoleChange) {
      onRoleChange(newRole);
    }

    // Navigate to the appropriate dashboard
    const roleConfig = roleConfigs[newRole];
    if (roleConfig?.defaultRoute) {
      navigate(roleConfig.defaultRoute);
    }
  };

  // Don't render if user doesn't have multiple roles
  if (!currentUser?.roles || currentUser.roles.length <= 1) {
    return null;
  }

  const currentRoleConfig = roleConfigs[currentRole];
  const availableRoles = currentUser.roles.filter(role => role !== currentRole);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Role Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary-light nav-transition"
      >
        <div className={`p-1.5 rounded-md bg-surface ${currentRoleConfig?.color}`}>
          <Icon name={currentRoleConfig?.icon || 'User'} size={14} />
        </div>
        <div className="text-left min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {currentRoleConfig?.label}
          </p>
          <p className="text-xs text-text-secondary truncate">
            {currentRoleConfig?.description}
          </p>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-text-secondary flex-shrink-0" 
        />
      </button>

      {/* Role Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-lg shadow-modal border border-border animate-scale-in z-1010">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-border mb-2">
              <p className="text-xs font-medium text-text-secondary">Switch Role</p>
            </div>
            
            {/* Current Role (for reference) */}
            <div className="px-3 py-2 rounded-md bg-primary-light border border-primary/20 mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-md bg-primary/10 ${currentRoleConfig?.color}`}>
                  <Icon name={currentRoleConfig?.icon || 'User'} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    {currentRoleConfig?.label}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Current role
                  </p>
                </div>
                <Icon name="Check" size={14} className="text-primary flex-shrink-0" />
              </div>
            </div>

            {/* Available Roles */}
            {availableRoles.map((role) => {
              const roleConfig = roleConfigs[role];
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  className="w-full px-3 py-2 rounded-md hover:bg-surface nav-transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-md bg-surface ${roleConfig?.color}`}>
                      <Icon name={roleConfig?.icon || 'User'} size={14} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        {roleConfig?.label}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {roleConfig?.description}
                      </p>
                    </div>
                    <Icon name="ArrowRight" size={14} className="text-text-secondary flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border p-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/user-dashboard');
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-surface rounded-md nav-transition"
            >
              <Icon name="Settings" size={14} />
              <span>Account Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Role Context Indicator */}
      <div className="mt-2">
        <div className="flex items-center space-x-2 px-2 py-1 bg-surface rounded-md">
          <div className={`w-2 h-2 rounded-full ${
            currentRole === 'admin' ? 'bg-error' :
            currentRole === 'organizer'? 'bg-warning' : 'bg-primary'
          }`} />
          <span className="text-xs text-text-secondary">
            Viewing as {currentRoleConfig?.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNavigation;