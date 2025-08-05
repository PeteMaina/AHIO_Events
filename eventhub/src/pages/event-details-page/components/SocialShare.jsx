import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SocialShare = ({ eventTitle, eventUrl }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out this amazing event: ${eventTitle}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${eventUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(`${shareText} ${eventUrl}`)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform) => {
    if (platform === 'copy') {
      handleCopyLink();
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Share This Event
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg nav-transition"
        >
          <Icon name="Facebook" size={16} />
          <span className="text-sm font-medium">Facebook</span>
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center space-x-2 p-3 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-lg nav-transition"
        >
          <Icon name="Twitter" size={16} />
          <span className="text-sm font-medium">Twitter</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg nav-transition"
        >
          <Icon name="Linkedin" size={16} />
          <span className="text-sm font-medium">LinkedIn</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg nav-transition"
        >
          <Icon name="MessageCircle" size={16} />
          <span className="text-sm font-medium">WhatsApp</span>
        </button>

        {/* Email */}
        <button
          onClick={() => handleShare('email')}
          className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg nav-transition"
        >
          <Icon name="Mail" size={16} />
          <span className="text-sm font-medium">Email</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={() => handleShare('copy')}
          className={`flex items-center space-x-2 p-3 rounded-lg nav-transition ${
            copied 
              ? 'bg-success text-white' :'bg-surface hover:bg-primary-light text-text-secondary hover:text-primary'
          }`}
        >
          <Icon name={copied ? "Check" : "Copy"} size={16} />
          <span className="text-sm font-medium">
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>

      {/* QR Code Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="w-24 h-24 bg-surface border border-border rounded-lg mx-auto mb-3 flex items-center justify-center">
            <Icon name="QrCode" size={32} className="text-text-secondary" />
          </div>
          <p className="text-sm text-text-secondary mb-2">
            Scan QR code to share
          </p>
          <button className="text-primary hover:text-primary-dark text-sm font-medium nav-transition">
            Generate QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;