import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/guest/HomePage";
import RoomListingPage from "./pages/guest/RoomListingPage";
import RoomDetailsPage from "./pages/guest/RoomDetailsPage";
import BookingPage from "./pages/guest/BookingPage";
import FeedbackPage from "./pages/guest/FeedbackPage";

// --- NEW PAGES ---
import PaymentPage from "./pages/guest/PaymentPage";
import ConfirmationPage from "./pages/guest/ConfirmationPage";
// --- END NEW ---

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ManageRoomsPage from "./pages/admin/ManageRoomsPage";
import ManageBookingsPage from "./pages/admin/ManageBookingsPage";
import GuestRecordsPage from "./pages/admin/GuestRecordsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Guest Interface */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rooms" element={<RoomListingPage />} />
        <Route path="rooms/:id" element={<RoomDetailsPage />} />
        <Route path="book/:id" element={<BookingPage />} />
        <Route path="contact" element={<FeedbackPage />} />
        
        {/* --- NEW ROUTES --- */}
        <Route path="payment" element={<PaymentPage />} />
        <Route path="confirmation" element={<ConfirmationPage />} />
        {/* --- END NEW --- */}
      </Route>

      {/* Admin Interface (No Changes Here) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="rooms" element={<ManageRoomsPage />} />
        <Route path="bookings" element={<ManageBookingsPage />} />
        <Route path="guests" element={<GuestRecordsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}

export default App;