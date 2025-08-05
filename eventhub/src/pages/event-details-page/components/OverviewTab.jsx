import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const OverviewTab = ({ eventData, sponsors }) => {
  return (
    <div className="space-y-8">
      {/* Event Description */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          About This Event
        </h2>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="mb-4">{eventData.description}</p>
        </div>
      </div>

      {/* Key Highlights */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Event Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventData.highlights.map((highlight, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border"
            >
              <div className="p-2 bg-primary-light rounded-lg">
                <Icon name="Check" size={16} className="text-primary" />
              </div>
              <span className="font-medium text-text-primary">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What You'll Learn */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          What You'll Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary-light rounded-lg mt-1">
                <Icon name="Lightbulb" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">
                  Cutting-Edge Insights
                </h4>
                <p className="text-text-secondary text-sm">
                  Learn about the latest technological breakthroughs and industry trends from leading experts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary-light rounded-lg mt-1">
                <Icon name="Users" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">
                  Networking Opportunities
                </h4>
                <p className="text-text-secondary text-sm">
                  Connect with like-minded professionals, potential collaborators, and industry leaders.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary-light rounded-lg mt-1">
                <Icon name="Zap" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">
                  Hands-On Workshops
                </h4>
                <p className="text-text-secondary text-sm">
                  Participate in interactive sessions and gain practical experience with new technologies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary-light rounded-lg mt-1">
                <Icon name="Award" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">
                  Startup Showcase
                </h4>
                <p className="text-text-secondary text-sm">
                  Discover innovative startups and emerging companies shaping the future of technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          Our Sponsors & Partners
        </h3>
        
        {/* Platinum Sponsors */}
        {sponsors.platinum && sponsors.platinum.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-medium text-text-primary mb-4 flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full"></div>
              <span>Platinum Partners</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sponsors.platinum.map((sponsor, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-8 bg-surface rounded-lg border border-border hover:shadow-md nav-transition"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gold Sponsors */}
        {sponsors.gold && sponsors.gold.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-medium text-text-primary mb-4 flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div>
              <span>Gold Partners</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sponsors.gold.map((sponsor, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-6 bg-surface rounded-lg border border-border hover:shadow-md nav-transition"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Silver Sponsors */}
        {sponsors.silver && sponsors.silver.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-text-primary mb-4 flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
              <span>Silver Partners</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sponsors.silver.map((sponsor, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-4 bg-surface rounded-lg border border-border hover:shadow-md nav-transition"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-primary-light rounded-lg p-6 border border-primary/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary rounded-lg">
            <Icon name="Clock" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-text-primary mb-1">
              Early Bird Pricing Ends Soon!
            </h4>
            <p className="text-text-secondary">
              Save up to $100 on your ticket. Limited time offer.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ${eventData.ticketTypes[0].price}
            </p>
            {eventData.ticketTypes[0].originalPrice && (
              <p className="text-text-secondary line-through">
                ${eventData.ticketTypes[0].originalPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;