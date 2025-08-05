import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState('attendee'); // attendee, organizer, admin
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user data
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar.jpg',
    roles: ['attendee', 'organizer', 'admin']
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === 'admin' || userRole === 'organizer') {
      return [
        { label: 'Events', path: '/admin-event-management', icon: 'Calendar', roles: ['admin', 'organizer'] },
        { label: 'Venues', path: '/venue-management-system', icon: 'MapPin', roles: ['admin', 'organizer'] },
      ];
    }
    return [
      { label: 'Discover', path: '/event-discovery-dashboard', icon: 'Search', roles: ['attendee'] },
      { label: 'My Events', path: '/user-dashboard', icon: 'User', roles: ['attendee'] },
    ];
  };

  const navigationItems = getNavigationItems();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/event-discovery-dashboard?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole);
    setIsUserMenuOpen(false);
    // Navigate to appropriate dashboard based on role
    if (newRole === 'admin' || newRole === 'organizer') {
      navigate('/admin-event-management');
    } else {
      navigate('/event-discovery-dashboard');
    }
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    // Handle logout logic here
    console.log('Logging out...');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-1000 nav-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/event-discovery-dashboard" 
              className="flex items-center space-x-2 nav-transition hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">AMREF EVENT MANAGER</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium nav-transition flex items-center space-x-2 ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-light'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          {(userRole === 'attendee') && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
              </form>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            {(userRole === 'attendee') && (
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-primary nav-transition"
              >
                <Icon name="Search" size={20} />
              </button>
            )}

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface nav-transition"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-text-primary">
                  {currentUser.name}
                </span>
                <Icon name="ChevronDown" size={16} className="text-text-secondary" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-modal border border-border animate-scale-in">
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">{currentUser.name}</p>
                    <p className="text-xs text-text-secondary">{currentUser.email}</p>
                  </div>
                  
                  {/* Role Switcher */}
                  {currentUser.roles.length > 1 && (
                    <div className="p-2 border-b border-border">
                      <p className="text-xs font-medium text-text-secondary mb-2 px-2">Switch Role</p>
                      {currentUser.roles.map((role) => (
                        <button
                          key={role}
                          onClick={() => handleRoleSwitch(role)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md nav-transition capitalize ${
                            userRole === role
                              ? 'bg-primary text-white' :'text-text-primary hover:bg-surface'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-2">
                    <Link
                      to="/user-dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface rounded-md nav-transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="Settings" size={16} />
                      <span>Profile Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-red-50 rounded-md nav-transition"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-primary nav-transition"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (userRole === 'attendee') && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-background border-t border-border animate-slide-in"
        >
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium nav-transition ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-light'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;