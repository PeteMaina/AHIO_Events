import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const GalleryTab = ({ gallery }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const allMedia = [...gallery.images, ...gallery.videos];
  
  const filteredMedia = activeFilter === 'all' 
    ? allMedia 
    : allMedia.filter(item => item.type === activeFilter);

  const openLightbox = (media) => {
    setSelectedMedia(media);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedMedia.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredMedia.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredMedia.length - 1 : currentIndex - 1;
    }
    
    setSelectedMedia(filteredMedia[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateMedia('next');
    } else if (e.key === 'ArrowLeft') {
      navigateMedia('prev');
    }
  };

  React.useEffect(() => {
    if (selectedMedia) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Event Gallery
        </h2>
        <p className="text-text-secondary">
          Photos and videos from previous events and venue highlights.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 bg-surface rounded-lg p-1 w-fit">
        {[
          { id: 'all', label: 'All Media', icon: 'Grid3x3' },
          { id: 'image', label: 'Photos', icon: 'Image' },
          { id: 'video', label: 'Videos', icon: 'Play' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium nav-transition ${
              activeFilter === filter.id
                ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-background'
            }`}
          >
            <Icon name={filter.icon} size={16} />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            className="group relative aspect-square bg-surface rounded-lg overflow-hidden border border-border cursor-pointer hover:shadow-md nav-transition"
            onClick={() => openLightbox(media)}
          >
            {media.type === 'image' ? (
              <Image
                src={media.url}
                alt={media.caption}
                className="w-full h-full object-cover group-hover:scale-105 nav-transition"
              />
            ) : (
              <div className="relative w-full h-full bg-black">
                <iframe
                  src={media.url}
                  title={media.caption}
                  className="w-full h-full object-cover pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-text-primary ml-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 nav-transition flex items-end">
              <div className="p-4 text-white opacity-0 group-hover:opacity-100 nav-transition">
                <p className="text-sm font-medium line-clamp-2">
                  {media.caption}
                </p>
              </div>
            </div>

            {/* Media Type Badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 nav-transition">
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
                <Icon name={media.type === 'image' ? 'Image' : 'Play'} size={12} />
                <span className="capitalize">{media.type}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Image" size={24} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No media found
          </h3>
          <p className="text-text-secondary">
            Try selecting a different filter or check back later for updates.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-1000 flex items-center justify-center p-4">
          {/* Navigation Controls */}
          <button
            onClick={() => navigateMedia('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center nav-transition z-10"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>

          <button
            onClick={() => navigateMedia('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center nav-transition z-10"
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center nav-transition z-10"
          >
            <Icon name="X" size={24} className="text-white" />
          </button>

          {/* Media Content */}
          <div className="max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.caption}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="w-full h-full max-w-4xl max-h-[80vh]">
                <iframe
                  src={selectedMedia.url}
                  title={selectedMedia.caption}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="bg-black bg-opacity-50 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-white text-sm">
                {selectedMedia.caption}
              </p>
              <p className="text-gray-300 text-xs mt-1">
                {filteredMedia.findIndex(item => item.id === selectedMedia.id) + 1} of {filteredMedia.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Stats */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Image" size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{gallery.images.length}</p>
            <p className="text-text-secondary text-sm">Photos</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Play" size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{gallery.videos.length}</p>
            <p className="text-text-secondary text-sm">Videos</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{allMedia.length}</p>
            <p className="text-text-secondary text-sm">Total Media</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryTab;