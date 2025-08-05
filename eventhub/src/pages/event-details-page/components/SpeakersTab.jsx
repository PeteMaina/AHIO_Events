import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SpeakersTab = ({ speakers }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const openSpeakerModal = (speaker) => {
    setSelectedSpeaker(speaker);
  };

  const closeSpeakerModal = () => {
    setSelectedSpeaker(null);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Featured Speakers
        </h2>
        <p className="text-text-secondary">
          Learn from industry experts and thought leaders who are shaping the future of technology.
        </p>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <div 
            key={speaker.id}
            className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-md nav-transition cursor-pointer"
            onClick={() => openSpeakerModal(speaker)}
          >
            {/* Speaker Image */}
            <div className="aspect-square overflow-hidden">
              <Image
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover hover:scale-105 nav-transition"
              />
            </div>

            {/* Speaker Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {speaker.name}
              </h3>
              <p className="text-primary font-medium mb-1">
                {speaker.title}
              </p>
              <p className="text-text-secondary text-sm mb-4">
                {speaker.company}
              </p>

              {/* Bio Preview */}
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                {speaker.bio.substring(0, 120)}...
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3 mb-4">
                {speaker.social.linkedin && (
                  <a
                    href={speaker.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background rounded-lg hover:bg-primary-light nav-transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="Linkedin" size={16} className="text-text-secondary hover:text-primary" />
                  </a>
                )}
                {speaker.social.twitter && (
                  <a
                    href={speaker.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background rounded-lg hover:bg-primary-light nav-transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="Twitter" size={16} className="text-text-secondary hover:text-primary" />
                  </a>
                )}
                {speaker.social.website && (
                  <a
                    href={speaker.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background rounded-lg hover:bg-primary-light nav-transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="Globe" size={16} className="text-text-secondary hover:text-primary" />
                  </a>
                )}
              </div>

              {/* Sessions */}
              <div>
                <p className="text-xs font-medium text-text-secondary mb-2">
                  SPEAKING AT:
                </p>
                <div className="space-y-1">
                  {speaker.sessions.slice(0, 2).map((session, index) => (
                    <p key={index} className="text-sm text-text-primary">
                      {session}
                    </p>
                  ))}
                  {speaker.sessions.length > 2 && (
                    <p className="text-sm text-primary">
                      +{speaker.sessions.length - 2} more sessions
                    </p>
                  )}
                </div>
              </div>

              {/* View Details Button */}
              <button className="mt-4 w-full text-center text-primary hover:text-primary-dark font-medium text-sm nav-transition">
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1000 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-text-primary">
                Speaker Profile
              </h3>
              <button
                onClick={closeSpeakerModal}
                className="p-2 hover:bg-surface rounded-lg nav-transition"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Speaker Image */}
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-32 h-32 mx-auto md:mx-0 rounded-lg overflow-hidden">
                    <Image
                      src={selectedSpeaker.image}
                      alt={selectedSpeaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Speaker Details */}
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-text-primary mb-2">
                    {selectedSpeaker.name}
                  </h4>
                  <p className="text-primary font-semibold mb-1">
                    {selectedSpeaker.title}
                  </p>
                  <p className="text-text-secondary mb-4">
                    {selectedSpeaker.company}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center space-x-3 mb-6">
                    {selectedSpeaker.social.linkedin && (
                      <a
                        href={selectedSpeaker.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-surface rounded-lg hover:bg-primary-light nav-transition"
                      >
                        <Icon name="Linkedin" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">LinkedIn</span>
                      </a>
                    )}
                    {selectedSpeaker.social.twitter && (
                      <a
                        href={selectedSpeaker.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-surface rounded-lg hover:bg-primary-light nav-transition"
                      >
                        <Icon name="Twitter" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">Twitter</span>
                      </a>
                    )}
                    {selectedSpeaker.social.website && (
                      <a
                        href={selectedSpeaker.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-surface rounded-lg hover:bg-primary-light nav-transition"
                      >
                        <Icon name="Globe" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div className="mt-6">
                <h5 className="text-lg font-semibold text-text-primary mb-3">
                  Biography
                </h5>
                <div className="prose prose-sm max-w-none text-text-secondary">
                  <p className="mb-4">{selectedSpeaker.bio}</p>
                </div>
              </div>

              {/* Sessions */}
              <div className="mt-6">
                <h5 className="text-lg font-semibold text-text-primary mb-3">
                  Speaking Sessions
                </h5>
                <div className="space-y-3">
                  {selectedSpeaker.sessions.map((session, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-surface rounded-lg"
                    >
                      <div className="p-2 bg-primary-light rounded-lg">
                        <Icon name="Calendar" size={16} className="text-primary" />
                      </div>
                      <span className="text-text-primary font-medium">
                        {session}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakersTab;