import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import HeroSection from './components/HeroSection';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import SpeakersTab from './components/SpeakersTab';
import ScheduleTab from './components/ScheduleTab';
import VenueTab from './components/VenueTab';
import GalleryTab from './components/GalleryTab';
import BookingWidget from './components/BookingWidget';
import SocialShare from './components/SocialShare';

const EventDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookingWidgetVisible, setIsBookingWidgetVisible] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id') || '1';

  // Mock event data
  const eventData = {
    id: eventId,
    title: "Tech Innovation Summit 2024",
    subtitle: "Shaping the Future of Technology",
    startDate: "2024-03-15T09:00:00Z",
    endDate: "2024-03-17T18:00:00Z",
    venue: {
      name: "Grand Convention Center",
      address: "123 Innovation Drive, Tech City, TC 12345",
      city: "Tech City",
      mapUrl: "https://www.google.com/maps?q=37.7749,-122.4194&z=14&output=embed",
      facilities: ["WiFi", "Parking", "Catering", "A/V Equipment", "Accessibility"]
    },
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    description: `Join us for the most anticipated technology conference of the year! The Tech Innovation Summit 2024 brings together industry leaders, innovators, and visionaries to explore the latest trends and breakthrough technologies that are reshaping our world.

This three-day event features keynote presentations from renowned tech executives, hands-on workshops, networking sessions, and exhibitions showcasing cutting-edge innovations. Whether you're a startup founder, enterprise leader, or technology enthusiast, this summit offers invaluable insights and connections.

Discover emerging technologies in AI, blockchain, IoT, and sustainable tech solutions. Connect with like-minded professionals and potential collaborators. Gain actionable insights from industry experts and thought leaders.`,
    highlights: [
      "50+ Expert Speakers",
      "3 Days of Innovation",
      "Networking Opportunities",
      "Hands-on Workshops",
      "Startup Showcase",
      "Technology Exhibitions"
    ],
    ticketTypes: [
      {
        id: 1,
        name: "Early Bird",
        price: 299,
        originalPrice: 399,
        description: "Limited time offer",
        available: 45,
        total: 100,
        features: ["All Sessions", "Networking Events", "Welcome Kit", "Lunch Included"]
      },
      {
        id: 2,
        name: "Standard",
        price: 399,
        description: "Regular admission",
        available: 156,
        total: 200,
        features: ["All Sessions", "Networking Events", "Welcome Kit", "Lunch Included"]
      },
      {
        id: 3,
        name: "VIP",
        price: 699,
        description: "Premium experience",
        available: 23,
        total: 50,
        features: ["All Sessions", "VIP Networking", "Premium Welcome Kit", "All Meals", "Speaker Meet & Greet", "Priority Seating"]
      }
    ],
    capacity: 500,
    registered: 267,
    category: "Technology",
    tags: ["AI", "Innovation", "Networking", "Startups", "Enterprise"]
  };

  const speakers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Chief Technology Officer",
      company: "InnovateTech Corp",
      bio: `Dr. Sarah Chen is a visionary technology leader with over 15 years of experience in artificial intelligence and machine learning. She has led groundbreaking research in neural networks and has been instrumental in developing AI solutions that have transformed industries.

As CTO of InnovateTech Corp, she oversees the development of next-generation AI platforms and has been recognized as one of the top 40 under 40 tech leaders. Her work focuses on ethical AI development and creating technology that benefits humanity.`,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen_ai",
        website: "https://sarahchen.tech"
      },
      sessions: ["Opening Keynote: The Future of AI", "Panel: Ethics in Technology"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Founder & CEO",
      company: "BlockChain Dynamics",
      bio: `Marcus Rodriguez is a serial entrepreneur and blockchain pioneer who has founded three successful tech companies. His latest venture, BlockChain Dynamics, is revolutionizing supply chain management through distributed ledger technology.

With a background in computer science and business strategy, Marcus has been featured in Forbes, TechCrunch, and Wired for his innovative approaches to solving complex business problems through technology.`,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        twitter: "https://twitter.com/marcus_blockchain"
      },
      sessions: ["Blockchain Revolution", "Startup Success Stories"]
    },
    {
      id: 3,
      name: "Emily Watson",
      title: "VP of Innovation",
      company: "Future Systems Inc",
      bio: `Emily Watson leads innovation initiatives at Future Systems Inc, where she drives the development of IoT solutions for smart cities. Her work has been instrumental in deploying connected infrastructure across major metropolitan areas.

She holds a PhD in Computer Engineering and has published numerous papers on distributed systems and edge computing. Emily is passionate about creating technology that improves urban living and sustainability.`,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/emilywatson",
        website: "https://emilywatson.dev"
      },
      sessions: ["IoT and Smart Cities", "Sustainable Technology Solutions"]
    }
  ];

  const schedule = [
    {
      day: "Day 1 - March 15, 2024",
      sessions: [
        {
          id: 1,
          time: "09:00 - 09:30",
          title: "Registration & Welcome Coffee",
          type: "registration",
          location: "Main Lobby",
          description: "Check-in, networking, and welcome refreshments"
        },
        {
          id: 2,
          time: "09:30 - 10:30",
          title: "Opening Keynote: The Future of AI",
          speaker: "Dr. Sarah Chen",
          type: "keynote",
          location: "Main Auditorium",
          description: "Explore the transformative potential of artificial intelligence and its impact on industries, society, and the future of work."
        },
        {
          id: 3,
          time: "10:45 - 11:45",
          title: "Blockchain Revolution",
          speaker: "Marcus Rodriguez",
          type: "presentation",
          location: "Conference Room A",
          description: "Deep dive into blockchain technology, its applications beyond cryptocurrency, and real-world implementation strategies."
        },
        {
          id: 4,
          time: "12:00 - 13:00",
          title: "Networking Lunch",
          type: "break",
          location: "Exhibition Hall",
          description: "Connect with fellow attendees while enjoying a curated lunch experience"
        }
      ]
    },
    {
      day: "Day 2 - March 16, 2024",
      sessions: [
        {
          id: 5,
          time: "09:00 - 10:00",
          title: "IoT and Smart Cities",
          speaker: "Emily Watson",
          type: "presentation",
          location: "Main Auditorium",
          description: "Discover how Internet of Things technology is transforming urban infrastructure and creating smarter, more sustainable cities."
        },
        {
          id: 6,
          time: "10:15 - 11:15",
          title: "Panel: Ethics in Technology",
          speaker: "Dr. Sarah Chen, Marcus Rodriguez, Emily Watson",
          type: "panel",
          location: "Conference Room B",
          description: "A thought-provoking discussion on the ethical implications of emerging technologies and responsible innovation."
        }
      ]
    }
  ];

  const sponsors = {
    platinum: [
      { name: "TechGiant Corp", logo: "https://via.placeholder.com/200x80/DC2626/FFFFFF?text=TechGiant" },
      { name: "Innovation Labs", logo: "https://via.placeholder.com/200x80/DC2626/FFFFFF?text=Innovation+Labs" }
    ],
    gold: [
      { name: "StartupHub", logo: "https://via.placeholder.com/150x60/D97706/FFFFFF?text=StartupHub" },
      { name: "CloudTech", logo: "https://via.placeholder.com/150x60/D97706/FFFFFF?text=CloudTech" },
      { name: "DataFlow", logo: "https://via.placeholder.com/150x60/D97706/FFFFFF?text=DataFlow" }
    ],
    silver: [
      { name: "DevTools", logo: "https://via.placeholder.com/120x50/6B7280/FFFFFF?text=DevTools" },
      { name: "CodeBase", logo: "https://via.placeholder.com/120x50/6B7280/FFFFFF?text=CodeBase" },
      { name: "TechFlow", logo: "https://via.placeholder.com/120x50/6B7280/FFFFFF?text=TechFlow" },
      { name: "AppForge", logo: "https://via.placeholder.com/120x50/6B7280/FFFFFF?text=AppForge" }
    ]
  };

  const gallery = {
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        caption: "Main conference hall setup",
        type: "image"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
        caption: "Networking session in progress",
        type: "image"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
        caption: "Exhibition area with latest tech demos",
        type: "image"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop",
        caption: "Workshop session with hands-on learning",
        type: "image"
      }
    ],
    videos: [
      {
        id: 1,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        caption: "Event highlights from last year",
        type: "video"
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'speakers', label: 'Speakers', icon: 'Users' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'venue', label: 'Venue', icon: 'MapPin' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' }
  ];

  // Handle scroll to show/hide booking widget
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = 600; // Approximate hero section height
      setIsBookingWidgetVisible(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookTickets = () => {
    navigate(`/ticket-booking-interface?eventId=${eventId}`);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Smooth scroll to content section
    const element = document.getElementById('content-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab eventData={eventData} sponsors={sponsors} />;
      case 'speakers':
        return <SpeakersTab speakers={speakers} />;
      case 'schedule':
        return <ScheduleTab schedule={schedule} />;
      case 'venue':
        return <VenueTab venue={eventData.venue} />;
      case 'gallery':
        return <GalleryTab gallery={gallery} />;
      default:
        return <OverviewTab eventData={eventData} sponsors={sponsors} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/event-discovery-dashboard" 
              className="text-text-secondary hover:text-primary nav-transition"
            >
              Events
            </Link>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            <span className="text-text-primary font-medium truncate">
              {eventData.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection 
        eventData={eventData}
        onBookTickets={handleBookTickets}
        onFavorite={handleFavorite}
        isFavorited={isFavorited}
      />

      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Content Area */}
          <div className="lg:col-span-8" id="content-section">
            {renderTabContent()}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Booking Widget */}
              <BookingWidget 
                eventData={eventData}
                onBookTickets={handleBookTickets}
              />

              {/* Social Share */}
              <SocialShare 
                eventTitle={eventData.title}
                eventUrl={window.location.href}
              />

              {/* Event Stats */}
              <div className="bg-surface rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Event Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Registered</span>
                    <span className="font-medium text-text-primary">
                      {eventData.registered}/{eventData.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(eventData.registered / eventData.capacity) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Category</span>
                    <span className="font-medium text-text-primary">
                      {eventData.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-surface rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={handleBookTickets}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark nav-transition flex items-center justify-center"
        >
          <Icon name="Ticket" size={24} />
        </button>
      </div>

      {/* Sticky Booking Widget - Desktop */}
      {isBookingWidgetVisible && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-50">
          <div className="bg-background border border-border rounded-lg shadow-modal p-4 w-80 animate-slide-in">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-text-primary">
                {eventData.title}
              </h4>
              <button
                onClick={() => setIsBookingWidgetVisible(false)}
                className="p-1 hover:bg-surface rounded nav-transition"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </button>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary">Starting from</span>
              <span className="text-xl font-bold text-primary">
                ${eventData.ticketTypes[0].price}
              </span>
            </div>
            <button
              onClick={handleBookTickets}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark nav-transition font-medium"
            >
              Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;