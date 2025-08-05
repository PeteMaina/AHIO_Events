import React from 'react';
import Icon from 'components/AppIcon';

const VenueTab = ({ venue }) => {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Venue Information
        </h2>
        <p className="text-text-secondary">
          Everything you need to know about the event location and facilities.
        </p>
      </div>

      {/* Venue Overview */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary-light rounded-lg">
            <Icon name="MapPin" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {venue.name}
            </h3>
            <p className="text-text-secondary mb-4">
              {venue.address}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition">
                <Icon name="Navigation" size={16} />
                <span>Get Directions</span>
              </button>
              <button className="inline-flex items-center space-x-2 px-4 py-2 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition">
                <Icon name="Phone" size={16} />
                <span>Contact Venue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-surface rounded-lg overflow-hidden border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">
            Location Map
          </h3>
        </div>
        <div className="h-64 md:h-80">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={venue.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={venue.mapUrl}
            className="border-0"
          />
        </div>
      </div>

      {/* Facilities & Amenities */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Facilities & Amenities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venue.facilities.map((facility, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border"
            >
              <div className="p-2 bg-primary-light rounded-lg">
                <Icon 
                  name={getFacilityIcon(facility)} 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <span className="font-medium text-text-primary">{facility}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Transportation & Parking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Transport */}
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Bus" size={16} className="text-primary" />
              <span>Public Transportation</span>
            </h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>• Metro Station: Tech City Central (5 min walk)</p>
              <p>• Bus Routes: 15, 23, 45, 67</p>
              <p>• Taxi/Rideshare pickup point available</p>
            </div>
          </div>

          {/* Parking */}
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Car" size={16} className="text-primary" />
              <span>Parking Information</span>
            </h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>• On-site parking: 200 spaces</p>
              <p>• Valet parking available</p>
              <p>• Street parking nearby</p>
              <p>• Electric vehicle charging stations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Hotels */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Recommended Hotels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Grand Tech Hotel",
              distance: "0.2 miles",
              rating: 4.5,
              price: "$180/night",
              features: ["Free WiFi", "Business Center", "Gym"]
            },
            {
              name: "Innovation Suites",
              distance: "0.5 miles",
              rating: 4.3,
              price: "$150/night",
              features: ["Free Breakfast", "Pool", "Parking"]
            },
            {
              name: "City Center Lodge",
              distance: "0.8 miles",
              rating: 4.1,
              price: "$120/night",
              features: ["Free WiFi", "Restaurant", "24/7 Front Desk"]
            },
            {
              name: "Budget Inn Tech",
              distance: "1.2 miles",
              rating: 3.8,
              price: "$85/night",
              features: ["Free WiFi", "Continental Breakfast"]
            }
          ].map((hotel, index) => (
            <div 
              key={index}
              className="bg-surface rounded-lg p-4 border border-border hover:shadow-md nav-transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-text-primary">{hotel.name}</h4>
                <span className="text-lg font-bold text-primary">{hotel.price}</span>
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{hotel.distance}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-yellow-500" />
                  <span className="text-sm text-text-secondary">{hotel.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {hotel.features.map((feature, featureIndex) => (
                  <span 
                    key={featureIndex}
                    className="px-2 py-1 bg-primary-light text-primary text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <button className="w-full text-center text-primary hover:text-primary-dark font-medium text-sm nav-transition">
                View Details & Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-primary-light rounded-lg p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Need Help Finding Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="Phone" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Venue Phone</p>
              <p className="font-medium text-text-primary">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="Mail" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Event Support</p>
              <p className="font-medium text-text-primary">support@eventhub.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate icon for facilities
const getFacilityIcon = (facility) => {
  const facilityIcons = {
    'WiFi': 'Wifi',
    'Parking': 'Car',
    'Catering': 'Coffee',
    'A/V Equipment': 'Monitor',
    'Accessibility': 'Accessibility',
    'Air Conditioning': 'Wind',
    'Security': 'Shield',
    'Reception': 'Phone'
  };
  
  return facilityIcons[facility] || 'Check';
};

export default VenueTab;