import React from 'react';
import { Link } from 'react-router-dom';

import Image from 'components/AppImage';

const RecentBookings = ({ bookings = [] }) => {
  const mockBookings = [
    {
      id: 1,
      eventName: "Tech Conference 2024",
      bookingDate: "2024-01-20",
      status: "confirmed",
      amount: 299,
      ticketType: "VIP Pass",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      eventName: "Digital Marketing Summit",
      bookingDate: "2024-01-18",
      status: "pending",
      amount: 199,
      ticketType: "Standard",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      eventName: "AI Workshop",
      bookingDate: "2024-01-15",
      status: "confirmed",
      amount: 149,
      ticketType: "Workshop Pass",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
    }
  ];

  const displayBookings = bookings.length > 0 ? bookings : mockBookings;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-green-50 border-green-200';
      case 'pending':
        return 'text-warning bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-error bg-red-50 border-red-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Recent Bookings</h2>
        <Link
          to="/user-dashboard"
          className="text-sm text-primary hover:text-primary-dark nav-transition"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {displayBookings.slice(0, 3).map((booking) => (
          <div key={booking.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:shadow-sm nav-transition">
            <div className="flex-shrink-0">
              <Image
                src={booking.image}
                alt={booking.eventName}
                className="w-12 h-12 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-text-primary mb-1 truncate">
                {booking.eventName}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <span>{booking.ticketType}</span>
                <span>•</span>
                <span>${booking.amount}</span>
                <span>•</span>
                <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;