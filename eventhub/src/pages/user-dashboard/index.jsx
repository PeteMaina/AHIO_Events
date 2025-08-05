import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import UpcomingEvents from './components/UpcomingEvents';

import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import ProfileQuickEdit from './components/ProfileQuickEdit';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('my-events');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const currentUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "2023-01-15",
    totalEvents: 12,
    upcomingEvents: 3,
    completedEvents: 9
  };

  // Mock events data
  const myEvents = [
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-02-15",
      time: "09:00 AM",
      venue: "Convention Center",
      location: "San Francisco, CA",
      ticketType: "VIP Pass",
      status: "confirmed",
      price: 299,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      bookingId: "TC2024-001",
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
    },
    {
      id: 2,
      name: "Digital Marketing Summit",
      date: "2024-03-20",
      time: "10:00 AM",
      venue: "Business Center",
      location: "New York, NY",
      ticketType: "Standard",
      status: "pending",
      price: 199,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      bookingId: "DMS2024-002"
    },
    {
      id: 3,
      name: "AI & Machine Learning Workshop",
      date: "2024-04-10",
      time: "02:00 PM",
      venue: "Tech Hub",
      location: "Austin, TX",
      ticketType: "Workshop Pass",
      status: "confirmed",
      price: 149,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
      bookingId: "AIML2024-003"
    }
  ];

  const favoriteEvents = [
    {
      id: 4,
      name: "Startup Pitch Competition",
      date: "2024-05-15",
      time: "06:00 PM",
      venue: "Innovation Center",
      location: "Seattle, WA",
      price: 75,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
      isFavorite: true
    },
    {
      id: 5,
      name: "UX Design Masterclass",
      date: "2024-06-08",
      time: "09:30 AM",
      venue: "Design Studio",
      location: "Los Angeles, CA",
      price: 225,
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop",
      isFavorite: true
    }
  ];

  const pastEvents = [
    {
      id: 6,
      name: "Web Development Bootcamp",
      date: "2023-12-10",
      time: "09:00 AM",
      venue: "Learning Center",
      location: "Chicago, IL",
      ticketType: "Full Access",
      status: "completed",
      price: 399,
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop",
      rating: 5,
      attended: true
    },
    {
      id: 7,
      name: "Product Management Conference",
      date: "2023-11-22",
      time: "08:30 AM",
      venue: "Business Plaza",
      location: "Boston, MA",
      ticketType: "Premium",
      status: "completed",
      price: 279,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
      rating: 4,
      attended: true
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-green-50 border-green-200';
      case 'pending':
        return 'text-warning bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-error bg-red-50 border-red-200';
      case 'completed':
        return 'text-text-secondary bg-gray-50 border-gray-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  const getFilteredEvents = () => {
    let events = [];
    
    switch (activeTab) {
      case 'my-events':
        events = myEvents;
        break;
      case 'favorites':
        events = favoriteEvents;
        break;
      case 'past-events':
        events = pastEvents;
        break;
      default:
        events = myEvents;
    }

    // Apply search filter
    if (searchQuery) {
      events = events.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all' && activeTab !== 'favorites') {
      events = events.filter(event => event.status === statusFilter);
    }

    return events;
  };

  const tabs = [
    { id: 'my-events', label: 'My Events', count: myEvents.length, icon: 'Calendar' },
    { id: 'favorites', label: 'Favorites', count: favoriteEvents.length, icon: 'Heart' },
    { id: 'past-events', label: 'Past Events', count: pastEvents.length, icon: 'Clock' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-border p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-border p-6">
                  <div className="flex space-x-4">
                    <div className="w-24 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-text-secondary">
                Manage your events and bookings from your personal dashboard
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/event-discovery-dashboard"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
              >
                <Icon name="Search" size={16} />
                <span>Discover Events</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Events</p>
                  <p className="text-2xl font-bold text-text-primary">{currentUser.totalEvents}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Icon name="Clock" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Upcoming</p>
                  <p className="text-2xl font-bold text-text-primary">{currentUser.upcomingEvents}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon name="CheckCircle" size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Completed</p>
                  <p className="text-2xl font-bold text-text-primary">{currentUser.completedEvents}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Priority Content - Above the fold */}
            <div className="mb-8">
              <UpcomingEvents events={myEvents.filter(e => e.status === 'confirmed').slice(0, 2)} />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-border">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm nav-transition flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Filters */}
              <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    </div>
                  </div>
                  {activeTab !== 'favorites' && (
                    <div className="flex space-x-4">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        {activeTab === 'past-events' && <option value="completed">Completed</option>}
                      </select>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">All Dates</option>
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                        <option value="next-month">Next Month</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Events List */}
              <div className="p-6">
                {getFilteredEvents().length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Calendar" size={24} className="text-text-secondary" />
                    </div>
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      {activeTab === 'favorites' ? 'No favorite events yet' : 
                       activeTab === 'past-events' ? 'No past events' : 'No events found'}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {activeTab === 'favorites' ? 'Start exploring events and save your favorites' :
                       activeTab === 'past-events' ? 'Your completed events will appear here' :
                       'Try adjusting your search or filters'}
                    </p>
                    {activeTab === 'favorites' && (
                      <Link
                        to="/event-discovery-dashboard"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition"
                      >
                        <Icon name="Search" size={16} />
                        <span>Discover Events</span>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getFilteredEvents().map((event) => (
                      <div key={event.id} className="border border-border rounded-lg p-4 hover:shadow-sm nav-transition">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              src={event.image}
                              alt={event.name}
                              className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-text-primary mb-1">
                                  {event.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-2">
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Calendar" size={14} />
                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Clock" size={14} />
                                    <span>{event.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="MapPin" size={14} />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                {event.ticketType && (
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-sm text-text-secondary">Ticket:</span>
                                    <span className="text-sm font-medium text-text-primary">{event.ticketType}</span>
                                    <span className="text-sm font-semibold text-primary">${event.price}</span>
                                  </div>
                                )}
                                {event.status && (
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                                {activeTab === 'favorites' ? (
                                  <>
                                    <button className="p-2 text-error hover:bg-red-50 rounded-lg nav-transition">
                                      <Icon name="Heart" size={16} />
                                    </button>
                                    <Link
                                      to="/event-details-page"
                                      className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark nav-transition"
                                    >
                                      View Details
                                    </Link>
                                  </>
                                ) : activeTab === 'past-events' ? (
                                  <>
                                    {event.rating && (
                                      <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Icon
                                            key={i}
                                            name="Star"
                                            size={14}
                                            className={i < event.rating ? 'text-yellow-400' : 'text-gray-300'}
                                          />
                                        ))}
                                      </div>
                                    )}
                                    <button className="px-3 py-1.5 border border-border text-text-secondary text-sm rounded-lg hover:bg-surface nav-transition">
                                      View Certificate
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {event.status === 'confirmed' && (
                                      <button className="p-2 text-text-secondary hover:bg-surface rounded-lg nav-transition">
                                        <Icon name="Download" size={16} />
                                      </button>
                                    )}
                                    <button className="p-2 text-text-secondary hover:bg-surface rounded-lg nav-transition">
                                      <Icon name="Share2" size={16} />
                                    </button>
                                    <Link
                                      to="/event-details-page"
                                      className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark nav-transition"
                                    >
                                      View Details
                                    </Link>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            <NotificationCenter />
            <ProfileQuickEdit user={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;