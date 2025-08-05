import React, { useState, useEffect, useRef } from 'react';

import Icon from 'components/AppIcon';

import HeroBanner from './components/HeroBanner';
import EventCard from './components/EventCard';
import FilterChips from './components/FilterChips';
import AdvancedFilters from './components/AdvancedFilters';
import LoadingSkeleton from './components/LoadingSkeleton';

const EventDiscoveryDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    location: [],
    dateRange: '',
    eventType: [],
    sponsorLevel: [],
    priceRange: ''
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Join industry leaders for cutting-edge technology discussions and networking opportunities.",
      bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      startDate: "2024-03-15T09:00:00Z",
      endDate: "2024-03-17T18:00:00Z",
      venue: {
        name: "Convention Center",
        address: "123 Tech Street, San Francisco, CA",
        city: "San Francisco",
        state: "CA"
      },
      ticketTypes: [
        { type: "Early Bird", price: 299, available: 50 },
        { type: "Regular", price: 399, available: 200 },
        { type: "VIP", price: 599, available: 25 }
      ],
      category: "Technology",
      sponsorLevel: "platinum",
      featured: true,
      rating: 4.8,
      attendeeCount: 1250,
      tags: ["AI", "Machine Learning", "Innovation"]
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      description: "Learn advanced digital marketing strategies from industry experts and grow your business.",
      bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      startDate: "2024-03-20T10:00:00Z",
      endDate: "2024-03-20T17:00:00Z",
      venue: {
        name: "Business Hub",
        address: "456 Marketing Ave, New York, NY",
        city: "New York",
        state: "NY"
      },
      ticketTypes: [
        { type: "Standard", price: 199, available: 100 },
        { type: "Premium", price: 299, available: 50 }
      ],
      category: "Marketing",
      sponsorLevel: "gold",
      featured: false,
      rating: 4.6,
      attendeeCount: 350,
      tags: ["SEO", "Social Media", "Analytics"]
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Watch innovative startups pitch their ideas to top investors and industry leaders.",
      bannerImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      startDate: "2024-03-25T14:00:00Z",
      endDate: "2024-03-25T20:00:00Z",
      venue: {
        name: "Innovation Center",
        address: "789 Startup Blvd, Austin, TX",
        city: "Austin",
        state: "TX"
      },
      ticketTypes: [
        { type: "General", price: 49, available: 300 },
        { type: "Investor", price: 149, available: 50 }
      ],
      category: "Business",
      sponsorLevel: "silver",
      featured: true,
      rating: 4.7,
      attendeeCount: 500,
      tags: ["Startups", "Investment", "Networking"]
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Intensive hands-on workshop covering modern web development technologies and best practices.",
      bannerImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      startDate: "2024-04-01T09:00:00Z",
      endDate: "2024-04-03T17:00:00Z",
      venue: {
        name: "Tech Academy",
        address: "321 Code Street, Seattle, WA",
        city: "Seattle",
        state: "WA"
      },
      ticketTypes: [
        { type: "Student", price: 399, available: 80 },
        { type: "Professional", price: 599, available: 120 }
      ],
      category: "Technology",
      sponsorLevel: "bronze",
      featured: false,
      rating: 4.9,
      attendeeCount: 200,
      tags: ["React", "JavaScript", "Full Stack"]
    },
    {
      id: 5,
      title: "Healthcare Innovation Forum",
      description: "Exploring the future of healthcare through technology, research, and collaborative innovation.",
      bannerImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      startDate: "2024-04-10T08:30:00Z",
      endDate: "2024-04-12T16:00:00Z",
      venue: {
        name: "Medical Center",
        address: "555 Health Plaza, Boston, MA",
        city: "Boston",
        state: "MA"
      },
      ticketTypes: [
        { type: "Healthcare Professional", price: 449, available: 150 },
        { type: "Researcher", price: 349, available: 100 },
        { type: "Student", price: 199, available: 50 }
      ],
      category: "Healthcare",
      sponsorLevel: "platinum",
      featured: true,
      rating: 4.8,
      attendeeCount: 800,
      tags: ["Medical Tech", "Research", "Innovation"]
    },
    {
      id: 6,
      title: "Sustainable Business Summit",
      description: "Learn how to build sustainable business practices and contribute to environmental conservation.",
      bannerImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      startDate: "2024-04-18T09:00:00Z",
      endDate: "2024-04-19T17:00:00Z",
      venue: {
        name: "Green Convention Hall",
        address: "888 Eco Drive, Portland, OR",
        city: "Portland",
        state: "OR"
      },
      ticketTypes: [
        { type: "Individual", price: 249, available: 200 },
        { type: "Corporate", price: 499, available: 75 }
      ],
      category: "Sustainability",
      sponsorLevel: "gold",
      featured: false,
      rating: 4.5,
      attendeeCount: 450,
      tags: ["Sustainability", "Environment", "Business"]
    }
  ];

  // Featured events for hero banner
  const featuredEvents = mockEvents.filter(event => event.featured);

  // Filter options
  const filterOptions = {
    locations: [...new Set(mockEvents.map(event => event.venue.city))],
    eventTypes: [...new Set(mockEvents.map(event => event.category))],
    sponsorLevels: ['platinum', 'gold', 'silver', 'bronze', 'standard']
  };

  // Initialize events
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents.slice(0, 6));
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...mockEvents];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        event.venue.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (activeFilters.location.length > 0) {
      filtered = filtered.filter(event =>
        activeFilters.location.includes(event.venue.city)
      );
    }

    if (activeFilters.eventType.length > 0) {
      filtered = filtered.filter(event =>
        activeFilters.eventType.includes(event.category)
      );
    }

    if (activeFilters.sponsorLevel.length > 0) {
      filtered = filtered.filter(event =>
        activeFilters.sponsorLevel.includes(event.sponsorLevel)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'popularity':
          return b.attendeeCount - a.attendeeCount;
        case 'price':
          return Math.min(...a.ticketTypes.map(t => t.price)) - Math.min(...b.ticketTypes.map(t => t.price));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered.slice(0, page * 6));
    setHasMore(filtered.length > page * 6);
  }, [searchQuery, activeFilters, sortBy, page, mockEvents]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setPage(prev => prev + 1);
            setLoadingMore(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
        : value
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setActiveFilters({
      location: [],
      dateRange: '',
      eventType: [],
      sponsorLevel: [],
      priceRange: ''
    });
    setPage(1);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      }
      return count + (filter ? 1 : 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Banner */}
      <HeroBanner events={featuredEvents} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Chips */}
        <FilterChips
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          activeFilterCount={getActiveFilterCount()}
          onShowAdvanced={() => setShowAdvancedFilters(true)}
        />

        {/* Sort and Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Discover Events
            </h2>
            <span className="text-sm text-text-secondary">
              {filteredEvents.length} events found
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm text-text-secondary">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Loading More */}
        {loadingMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-surface rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        )}

        {/* Infinite Scroll Observer */}
        {hasMore && <div ref={observerRef} className="h-4"></div>}

        {/* No Results */}
        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Search" size={32} className="text-text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No events found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search criteria or filters to find more events.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Advanced Filters Sidebar */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default EventDiscoveryDashboard;