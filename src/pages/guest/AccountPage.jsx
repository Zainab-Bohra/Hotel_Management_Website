import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import BookingHistoryCard from "../../components/BookingHistoryCard";

const AccountPage = () => {
  const { userName, userEmail } = useSelector((state) => state.userAuth);
  const { bookings } = useSelector((state) => state.bookings);


  const userBookings = bookings.filter(
    (booking) => booking.email === userEmail
  );


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-12">
        My Account
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <aside className="lg:col-span-1">
          <div className="bg-soft-white rounded-xl shadow-lg p-8 sticky top-28">
            <h2 className="text-3xl font-heading text-gold mb-4">
              My Profile
            </h2>
            <div className="space-y-3 font-body">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="text-lg text-deep-brown">{userName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-lg text-deep-brown">{userEmail}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-heading text-deep-brown">
            My Bookings
          </h2>
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <BookingHistoryCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="bg-soft-white rounded-xl shadow-lg p-8 text-center">
              <p className="font-body text-gray-600">
                You haven't made any bookings yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default AccountPage;