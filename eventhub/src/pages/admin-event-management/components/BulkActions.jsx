import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const BulkActions = ({ selectedCount, onBulkAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    {
      id: 'activate',
      label: 'Activate Events',
      icon: 'Play',
      color: 'text-success',
      description: 'Make selected events active'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Events',
      icon: 'Pause',
      color: 'text-warning',
      description: 'Set selected events to draft'
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      color: 'text-primary',
      description: 'Export selected events data'
    },
    {
      id: 'duplicate',
      label: 'Duplicate Events',
      icon: 'Copy',
      color: 'text-primary',
      description: 'Create copies of selected events'
    },
    {
      id: 'delete',
      label: 'Delete Events',
      icon: 'Trash2',
      color: 'text-error',
      description: 'Permanently delete selected events'
    }
  ];

  const handleAction = (actionId) => {
    onBulkAction(actionId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-lg nav-transition text-sm"
      >
        <Icon name="MoreHorizontal" size={16} className="mr-2" />
        Bulk Actions ({selectedCount})
        <Icon name="ChevronDown" size={14} className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-background rounded-lg shadow-modal border border-border animate-scale-in z-1010">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-border mb-2">
              <p className="text-xs font-medium text-text-secondary">
                {selectedCount} event{selectedCount !== 1 ? 's' : ''} selected
              </p>
            </div>
            
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md nav-transition hover:bg-surface ${
                  action.id === 'delete' ? 'hover:bg-red-50' : ''
                }`}
              >
                <Icon name={action.icon} size={16} className={action.color} />
                <div className="flex-1 text-left">
                  <p className="font-medium text-text-primary">{action.label}</p>
                  <p className="text-xs text-text-secondary">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;