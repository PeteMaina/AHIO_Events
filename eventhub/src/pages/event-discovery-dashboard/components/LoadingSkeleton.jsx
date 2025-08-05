import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="h-96 md:h-[500px] bg-surface mb-8"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Chips Skeleton */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-8 bg-surface rounded-full w-20"></div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-8 bg-surface rounded-full w-16"></div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="h-10 bg-surface rounded-lg w-40"></div>
            <div className="h-8 bg-surface rounded-lg w-32"></div>
          </div>
        </div>

        {/* Sort Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="h-6 bg-surface rounded w-32"></div>
            <div className="h-4 bg-surface rounded w-24"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-surface rounded w-16"></div>
            <div className="h-8 bg-surface rounded w-24"></div>
          </div>
        </div>

        {/* Event Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-background rounded-lg shadow-nav border border-border overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-48 bg-surface"></div>
              
              {/* Content Skeleton */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-surface rounded-full w-16"></div>
                  <div className="h-4 bg-surface rounded w-12"></div>
                </div>
                
                <div className="h-6 bg-surface rounded mb-2"></div>
                <div className="h-4 bg-surface rounded mb-3 w-3/4"></div>
                
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-surface rounded w-20"></div>
                  <div className="h-4 bg-surface rounded w-32"></div>
                  <div className="h-4 bg-surface rounded w-24"></div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {[...Array(3)].map((_, tagIndex) => (
                    <div key={tagIndex} className="h-6 bg-surface rounded-full w-12"></div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-surface rounded w-16"></div>
                  <div className="h-8 bg-surface rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;