import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ScheduleTab = ({ schedule }) => {
  const [expandedSession, setExpandedSession] = useState(null);

  const toggleSession = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case 'keynote':
        return 'Mic';
      case 'presentation':
        return 'Monitor';
      case 'panel':
        return 'Users';
      case 'workshop':
        return 'Wrench';
      case 'break':
        return 'Coffee';
      case 'registration':
        return 'UserCheck';
      default:
        return 'Calendar';
    }
  };

  const getSessionTypeColor = (type) => {
    switch (type) {
      case 'keynote':
        return 'bg-primary text-white';
      case 'presentation':
        return 'bg-blue-100 text-blue-800';
      case 'panel':
        return 'bg-green-100 text-green-800';
      case 'workshop':
        return 'bg-purple-100 text-purple-800';
      case 'break':
        return 'bg-gray-100 text-gray-800';
      case 'registration':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Event Schedule
        </h2>
        <p className="text-text-secondary">
          Detailed agenda with session timings, speakers, and locations.
        </p>
      </div>

      {/* Schedule Days */}
      <div className="space-y-8">
        {schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-surface rounded-lg border border-border overflow-hidden">
            {/* Day Header */}
            <div className="bg-primary text-white p-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Icon name="Calendar" size={20} />
                <span>{day.day}</span>
              </h3>
            </div>

            {/* Sessions */}
            <div className="divide-y divide-border">
              {day.sessions.map((session) => (
                <div key={session.id} className="p-4 hover:bg-background nav-transition">
                  <div className="flex items-start space-x-4">
                    {/* Time */}
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-background rounded-lg p-2 border border-border">
                        <p className="text-sm font-medium text-text-primary">
                          {session.time.split(' - ')[0]}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {session.time.split(' - ')[1]}
                        </p>
                      </div>
                    </div>

                    {/* Session Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Session Type Badge */}
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(session.type)}`}>
                              <Icon name={getSessionTypeIcon(session.type)} size={12} />
                              <span className="capitalize">{session.type}</span>
                            </span>
                            {session.location && (
                              <span className="inline-flex items-center space-x-1 text-xs text-text-secondary">
                                <Icon name="MapPin" size={12} />
                                <span>{session.location}</span>
                              </span>
                            )}
                          </div>

                          {/* Session Title */}
                          <h4 className="text-lg font-semibold text-text-primary mb-1">
                            {session.title}
                          </h4>

                          {/* Speaker */}
                          {session.speaker && (
                            <p className="text-primary font-medium mb-2">
                              {session.speaker}
                            </p>
                          )}

                          {/* Description Preview */}
                          {session.description && (
                            <p className="text-text-secondary text-sm mb-3">
                              {expandedSession === session.id 
                                ? session.description
                                : `${session.description.substring(0, 100)}${session.description.length > 100 ? '...' : ''}`
                              }
                            </p>
                          )}
                        </div>

                        {/* Expand Button */}
                        {session.description && session.description.length > 100 && (
                          <button
                            onClick={() => toggleSession(session.id)}
                            className="flex-shrink-0 ml-4 p-2 hover:bg-surface rounded-lg nav-transition"
                          >
                            <Icon 
                              name={expandedSession === session.id ? "ChevronUp" : "ChevronDown"} 
                              size={16} 
                              className="text-text-secondary" 
                            />
                          </button>
                        )}
                      </div>

                      {/* Expanded Content */}
                      {expandedSession === session.id && session.description && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="bg-background rounded-lg p-4">
                            <h5 className="font-medium text-text-primary mb-2">
                              Session Details
                            </h5>
                            <p className="text-text-secondary text-sm mb-3">
                              {session.description}
                            </p>
                            
                            {/* Additional Session Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              {session.location && (
                                <div className="flex items-center space-x-2">
                                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                                  <span className="text-text-secondary">Location:</span>
                                  <span className="text-text-primary font-medium">{session.location}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-2">
                                <Icon name="Clock" size={14} className="text-text-secondary" />
                                <span className="text-text-secondary">Duration:</span>
                                <span className="text-text-primary font-medium">{session.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Legend */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Session Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { type: 'keynote', label: 'Keynote' },
            { type: 'presentation', label: 'Presentation' },
            { type: 'panel', label: 'Panel Discussion' },
            { type: 'workshop', label: 'Workshop' },
            { type: 'break', label: 'Break' },
            { type: 'registration', label: 'Registration' }
          ].map((item) => (
            <div key={item.type} className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(item.type)}`}>
                <Icon name={getSessionTypeIcon(item.type)} size={12} />
                <span>{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Schedule */}
      <div className="text-center">
        <button className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition font-medium">
          <Icon name="Download" size={16} />
          <span>Download Full Schedule</span>
        </button>
      </div>
    </div>
  );
};

export default ScheduleTab;