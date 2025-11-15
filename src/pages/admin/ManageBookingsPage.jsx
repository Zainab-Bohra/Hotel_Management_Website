/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingStatus } from "../../features/bookingSlice";
import { motion } from "framer-motion";

const ManageBookingsPage = () => {
const { bookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  const handleStatusChange = (id, status) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-heading text-deep-brown mb-6">
        Manage Bookings
      </h1>
      <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-max font-body">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3">Guest Name</th>
              <th className="text-left p-3">Room</th>
              <th className="text-left p-3">Check-in</th>
              <th className="text-left p-3">Check-out</th>
              <th className="text-left p-3">Total Price</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">{booking.name}</td>
                  <td className="p-3">{booking.roomName}</td>
                  <td className="p-3">{booking.checkIn}</td>
                  <td className="p-3">{booking.checkOut}</td>
                  <td className="p-3">${booking.totalPrice.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {booking.status === "Approved" ? (
                      <button
                        onClick={() => handleStatusChange(booking.id, "Cancelled")}
                        className="text-xs bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(booking.id, "Approved")}
                        className="text-xs bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageBookingsPage;