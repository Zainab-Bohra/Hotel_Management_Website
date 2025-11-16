import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const BookingHistoryCard = ({ booking }) => {
  const { roomName, roomImage, checkIn, checkOut, totalPrice, status } = booking;

  return (
    <div className="bg-soft-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img
        src={roomImage}
        alt={roomName}
        className="w-full md:w-1/3 h-48 md:h-full object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-heading text-gold mb-2">{roomName}</h3>
        <span
          className={`px-3 py-1 mb-4 rounded-full text-xs font-semibold self-start ${
            status === "Approved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
        <div className="flex items-center text-gray-700 font-body mb-2">
          <FaCalendarAlt className="text-gold mr-2" />
          <span>
            <strong>Check-in:</strong> {checkIn}
          </span>
        </div>
        <div className="flex items-center text-gray-700 font-body mb-4">
          <FaCalendarAlt className="text-gold mr-2" />
          <span>
            <strong>Check-out:</strong> {checkOut}
          </span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-heading text-deep-brown">
            Total: ₹{totalPrice}
          </span>
          <Link
            to={`/rooms/${booking.roomId}`}
            className="font-body text-gold hover:underline"
          >
            View Room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;