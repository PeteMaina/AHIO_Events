import React, { useState, useRef, useEffect } from 'react';

import Icon from 'components/AppIcon';

import EventFilters from './components/EventFilters';
import EventTable from './components/EventTable';
import EventModal from './components/EventModal';
import DashboardMetrics from './components/DashboardMetrics';
import BulkActions from './components/BulkActions';

const AdminEventManagement = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dateRange: 'all',
    venue: 'all'
  });
  const [viewMode, setViewMode] = useState('table'); // table or cards
  const [isLoading, setIsLoading] = useState(true);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      name: "Tech Innovation Summit 2024",
      description: `Join industry leaders and innovators for a comprehensive exploration of emerging technologies shaping our future. This summit brings together thought leaders, entrepreneurs, and tech enthusiasts to discuss breakthrough innovations in AI, blockchain, IoT, and sustainable technology solutions.

The event features keynote presentations from Fortune 500 CTOs, interactive workshops on cutting-edge development frameworks, and networking sessions designed to foster collaboration between startups and established enterprises.`,
      category: "Technology",
      status: "active",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      startTime: "09:00",
      endTime: "18:00",
      venue: {
        id: 1,
        name: "Convention Center Downtown",
        address: "123 Main Street, Downtown, NY 10001",
        capacity: 500,
        mapUrl: "https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
      },
      organizer: {
        name: "TechEvents Inc.",
        email: "contact@techevents.com",
        phone: "+1-555-0123"
      },
      speakers: [
        {
          id: 1,
          name: "Dr. Sarah Chen",
          title: "Chief Technology Officer",
          company: "InnovateTech Corp",
          bio: "Leading AI researcher with 15+ years in machine learning",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Michael Rodriguez",
          title: "Blockchain Architect",
          company: "CryptoSolutions",
          bio: "Pioneer in decentralized finance and smart contract development",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
      ],
      tickets: [
        {
          id: 1,
          type: "Early Bird",
          price: 299,
          available: 45,
          total: 100,
          description: "Limited time offer with full access"
        },
        {
          id: 2,
          type: "Regular",
          price: 399,
          available: 180,
          total: 300,
          description: "Standard conference access"
        },
        {
          id: 3,
          type: "VIP",
          price: 699,
          available: 25,
          total: 50,
          description: "Premium access with exclusive networking"
        }
      ],
      totalAttendees: 325,
      revenue: 142750,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      createdAt: "2024-01-15",
      updatedAt: "2024-02-20"
    },
    {
      id: 2,
      name: "Digital Marketing Masterclass",
      description: `Master the art and science of digital marketing in this intensive masterclass designed for marketing professionals, business owners, and entrepreneurs looking to accelerate their online presence and drive measurable results.

Learn proven strategies for social media marketing, content creation, SEO optimization, and conversion rate optimization from industry experts who have generated millions in revenue for leading brands.`,
      category: "Marketing",
      status: "draft",
      startDate: "2024-04-10",
      endDate: "2024-04-12",
      startTime: "10:00",
      endTime: "17:00",
      venue: {
        id: 2,
        name: "Business Hub Conference Room",
        address: "456 Business Ave, Midtown, NY 10002",
        capacity: 150,
        mapUrl: "https://www.google.com/maps?q=40.7589,-73.9851&z=14&output=embed"
      },
      organizer: {
        name: "Marketing Pros Academy",
        email: "info@marketingpros.com",
        phone: "+1-555-0456"
      },
      speakers: [
        {
          id: 3,
          name: "Jennifer Walsh",
          title: "Digital Marketing Director",
          company: "Growth Strategies LLC",
          bio: "Award-winning marketer specializing in growth hacking",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
      ],
      tickets: [
        {
          id: 4,
          type: "Standard",
          price: 199,
          available: 120,
          total: 120,
          description: "Full workshop access with materials"
        },
        {
          id: 5,
          type: "Premium",
          price: 349,
          available: 30,
          total: 30,
          description: "Includes 1-on-1 consultation session"
        }
      ],
      totalAttendees: 0,
      revenue: 0,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      createdAt: "2024-02-01",
      updatedAt: "2024-02-25"
    },
    {
      id: 3,
      name: "Startup Pitch Competition",
      description: `The ultimate platform for emerging startups to showcase their innovative solutions to a panel of seasoned investors, industry experts, and potential partners. This high-energy competition provides entrepreneurs with the opportunity to secure funding, gain valuable feedback, and connect with key stakeholders in the startup ecosystem.

Participating startups will present their business models, demonstrate their products, and compete for cash prizes, mentorship opportunities, and potential investment deals worth up to $500,000.`,
      category: "Business",
      status: "completed",
      startDate: "2024-01-20",
      endDate: "2024-01-20",
      startTime: "14:00",
      endTime: "20:00",
      venue: {
        id: 3,
        name: "Innovation Hub Auditorium",
        address: "789 Startup Blvd, Tech District, NY 10003",
        capacity: 300,
        mapUrl: "https://www.google.com/maps?q=40.7505,-73.9934&z=14&output=embed"
      },
      organizer: {
        name: "Startup Accelerator Network",
        email: "events@startupaccel.com",
        phone: "+1-555-0789"
      },
      speakers: [
        {
          id: 4,
          name: "David Kim",
          title: "Managing Partner",
          company: "Venture Capital Partners",
          bio: "Serial entrepreneur and investor with 20+ successful exits",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "Lisa Thompson",
          title: "Startup Mentor",
          company: "Innovation Labs",
          bio: "Former Fortune 500 executive turned startup advisor",
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
        }
      ],
      tickets: [
        {
          id: 6,
          type: "Attendee",
          price: 49,
          available: 0,
          total: 250,
          description: "General admission to watch presentations"
        },
        {
          id: 7,
          type: "Networking",
          price: 99,
          available: 0,
          total: 50,
          description: "Includes post-event networking reception"
        }
      ],
      totalAttendees: 300,
      revenue: 17250,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      createdAt: "2023-12-01",
      updatedAt: "2024-01-25"
    },
    {
      id: 4,
      name: "Healthcare Innovation Forum",
      description: `Explore the future of healthcare through cutting-edge innovations, breakthrough research, and transformative technologies that are revolutionizing patient care and medical practice. This forum brings together healthcare professionals, researchers, technology innovators, and policy makers to discuss the latest advancements in medical technology, telemedicine, AI-driven diagnostics, and personalized medicine.

Attendees will gain insights into emerging trends, regulatory challenges, and implementation strategies for next-generation healthcare solutions.`,
      category: "Healthcare",
      status: "cancelled",
      startDate: "2024-02-28",
      endDate: "2024-03-01",
      startTime: "08:30",
      endTime: "17:30",
      venue: {
        id: 4,
        name: "Medical Center Conference Hall",
        address: "321 Health Plaza, Medical District, NY 10004",
        capacity: 400,
        mapUrl: "https://www.google.com/maps?q=40.7282,-73.9942&z=14&output=embed"
      },
      organizer: {
        name: "Healthcare Innovation Society",
        email: "contact@healthinnovation.org",
        phone: "+1-555-0321"
      },
      speakers: [
        {
          id: 6,
          name: "Dr. Amanda Foster",
          title: "Chief Medical Officer",
          company: "MedTech Solutions",
          bio: "Leading physician-scientist in digital health innovation",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
        }
      ],
      tickets: [
        {
          id: 8,
          type: "Professional",
          price: 449,
          available: 200,
          total: 200,
          description: "For healthcare professionals and researchers"
        },
        {
          id: 9,
          type: "Student",
          price: 99,
          available: 100,
          total: 100,
          description: "Discounted rate for students and residents"
        }
      ],
      totalAttendees: 0,
      revenue: 0,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      createdAt: "2023-11-15",
      updatedAt: "2024-02-15"
    },
    {
      id: 5,
      name: "Sustainable Energy Conference",
      description: `Join the global conversation on sustainable energy solutions and environmental innovation at this premier conference dedicated to advancing clean energy technologies and sustainable business practices. Industry leaders, researchers, policymakers, and environmental advocates will share insights on renewable energy, energy storage, smart grid technologies, and the transition to a carbon-neutral economy.

The conference features case studies from successful sustainability implementations, policy discussions on environmental regulations, and networking opportunities with green technology innovators and investors.`,
      category: "Environment",
      status: "active",
      startDate: "2024-05-08",
      endDate: "2024-05-10",
      startTime: "09:00",
      endTime: "18:00",
      venue: {
        id: 5,
        name: "Green Energy Center",
        address: "555 Eco Way, Sustainability Park, NY 10005",
        capacity: 600,
        mapUrl: "https://www.google.com/maps?q=40.7614,-73.9776&z=14&output=embed"
      },
      organizer: {
        name: "Sustainable Future Foundation",
        email: "events@sustainablefuture.org",
        phone: "+1-555-0555"
      },
      speakers: [
        {
          id: 7,
          name: "Dr. Robert Green",
          title: "Environmental Scientist",
          company: "Clean Energy Institute",
          bio: "Renewable energy researcher and sustainability consultant",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 8,
          name: "Maria Santos",
          title: "Policy Director",
          company: "Environmental Action Group",
          bio: "Environmental policy expert and climate change advocate",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
      ],
      tickets: [
        {
          id: 10,
          type: "General",
          price: 349,
          available: 280,
          total: 400,
          description: "Full conference access with materials"
        },
        {
          id: 11,
          type: "Corporate",
          price: 599,
          available: 95,
          total: 150,
          description: "Includes exhibition space and branding"
        },
        {
          id: 12,
          type: "Student",
          price: 99,
          available: 45,
          total: 50,
          description: "Special rate for students and academics"
        }
      ],
      totalAttendees: 180,
      revenue: 89520,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      createdAt: "2024-01-10",
      updatedAt: "2024-02-28"
    }
  ];

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search events
  useEffect(() => {
    let filtered = events;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(event => event.status === filters.status);
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter(event => event.category === filters.category);
    }
    if (filters.venue !== 'all') {
      filtered = filtered.filter(event => event.venue.name === filters.venue);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.startDate);
        switch (filters.dateRange) {
          case 'upcoming':
            return eventDate > now;
          case 'past':
            return eventDate < now;
          case 'this-month':
            return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        aValue = new Date(a.startDate);
        bValue = new Date(b.startDate);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredEvents(filtered);
  }, [events, searchQuery, filters, sortConfig]);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
  };

  const handleDuplicateEvent = (event) => {
    const newEvent = {
      ...event,
      id: Math.max(...events.map(e => e.id)) + 1,
      name: `${event.name} (Copy)`,
      status: 'draft',
      totalAttendees: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...eventData, id: editingEvent.id, updatedAt: new Date().toISOString().split('T')[0] }
          : event
      ));
    } else {
      // Create new event
      const newEvent = {
        ...eventData,
        id: Math.max(...events.map(e => e.id)) + 1,
        totalAttendees: 0,
        revenue: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setEvents([...events, newEvent]);
    }
    setIsEventModalOpen(false);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedEvents.length} events?`)) {
          setEvents(events.filter(event => !selectedEvents.includes(event.id)));
          setSelectedEvents([]);
        }
        break;
      case 'activate':
        setEvents(events.map(event =>
          selectedEvents.includes(event.id) ? { ...event, status: 'active' } : event
        ));
        setSelectedEvents([]);
        break;
      case 'deactivate':
        setEvents(events.map(event =>
          selectedEvents.includes(event.id) ? { ...event, status: 'draft' } : event
        ));
        setSelectedEvents([]);
        break;
      default:
        break;
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Category', 'Status', 'Start Date', 'Venue', 'Attendees', 'Revenue'],
      ...filteredEvents.map(event => [
        event.name,
        event.category,
        event.status,
        event.startDate,
        event.venue.name,
        event.totalAttendees,
        event.revenue
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Event Management</h1>
              <p className="mt-2 text-text-secondary">
                Create, manage, and monitor your events from a centralized dashboard
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-lg nav-transition"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </button>
              <button
                onClick={handleCreateEvent}
                className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition font-medium"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Create Event
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <DashboardMetrics events={events} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <EventFilters
              filters={filters}
              onFiltersChange={setFilters}
              events={events}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-background border border-border rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-text-secondary">
                    {filteredEvents.length} of {events.length} events
                  </span>
                  {selectedEvents.length > 0 && (
                    <BulkActions
                      selectedCount={selectedEvents.length}
                      onBulkAction={handleBulkAction}
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md nav-transition ${
                      viewMode === 'table' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    <Icon name="Table" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-2 rounded-md nav-transition ${
                      viewMode === 'cards' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Events Table/Cards */}
            <EventTable
              events={filteredEvents}
              selectedEvents={selectedEvents}
              onSelectedEventsChange={setSelectedEvents}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onDuplicateEvent={handleDuplicateEvent}
              sortConfig={sortConfig}
              onSortChange={setSortConfig}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {isEventModalOpen && (
        <EventModal
          event={editingEvent}
          onSave={handleSaveEvent}
          onClose={() => setIsEventModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminEventManagement;