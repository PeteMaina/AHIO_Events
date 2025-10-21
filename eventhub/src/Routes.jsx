import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import Header from "components/ui/Header";
import EventDiscoveryDashboard from "pages/event-discovery-dashboard";
import EventDetailsPage from "pages/event-details-page";
import TicketBookingInterface from "pages/ticket-booking-interface";
import UserDashboard from "pages/user-dashboard";
import AdminEventManagement from "pages/admin-event-management";
import Login from "pages/auth/Login";
import Signup from "pages/auth/Signup";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Header />
      <RouterRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<EventDiscoveryDashboard />} />
        <Route path="/event-discovery-dashboard" element={<EventDiscoveryDashboard />} />
        <Route path="/event-details-page" element={<EventDetailsPage />} />
        <Route path="/ticket-booking-interface" element={
          <ProtectedRoute>
            <TicketBookingInterface />
          </ProtectedRoute>
        } />
        <Route path="/user-dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-event-management" element={
          <ProtectedRoute allowedRoles={['admin', 'organizer']}>
            <AdminEventManagement />
          </ProtectedRoute>
        } />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
