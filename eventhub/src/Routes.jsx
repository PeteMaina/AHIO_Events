import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import EventDiscoveryDashboard from "pages/event-discovery-dashboard";
import EventDetailsPage from "pages/event-details-page";
import TicketBookingInterface from "pages/ticket-booking-interface";
import UserDashboard from "pages/user-dashboard";
import AdminEventManagement from "pages/admin-event-management";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<EventDiscoveryDashboard />} />
          <Route path="/event-discovery-dashboard" element={<EventDiscoveryDashboard />} />
          <Route path="/event-details-page" element={<EventDetailsPage />} />
          <Route path="/ticket-booking-interface" element={<TicketBookingInterface />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-event-management" element={<AdminEventManagement />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;