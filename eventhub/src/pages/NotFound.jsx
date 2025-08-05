import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertCircle" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/event-discovery-dashboard"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark nav-transition font-medium"
          >
            <Icon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition font-medium"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;