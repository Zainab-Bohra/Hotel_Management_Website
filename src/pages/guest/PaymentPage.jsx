import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "../../features/bookingSlice";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import { FaSpinner, FaLock } from "react-icons/fa";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingDetails } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      //  Add booking to Redux state
      dispatch(addBooking(bookingDetails));
      setIsLoading(false);
      
      // Navigate to confirmation page, passing ID
      navigate("/confirmation", {
        state: { bookingId: bookingDetails.id, name: bookingDetails.name },
      });
    }, 2000); 
  };

  if (!bookingDetails) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-heading">Invalid Booking Session</h1>
        <p className="font-body">Please start your booking again.</p>
        <Button onClick={() => navigate("/rooms")} className="mt-4">
          Back to Rooms
        </Button>
      </div>
    );
  }

  const { roomName, roomImage, checkIn, checkOut, nights, totalPrice, name } =
    bookingDetails;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-8">
        Complete Your Payment
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="bg-beige/80 rounded-lg p-6 space-y-4 shadow-lg">
          <h2 className="text-2xl font-heading text-deep-brown mb-4">
            Order Summary
          </h2>
          <img
            src={roomImage}
            alt={roomName}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-heading text-gold">{roomName}</h3>
          <p className="font-body text-deep-brown">
            <strong>Guest:</strong> {name}
          </p>
          <p className="font-body text-deep-brown">
            <strong>Check-in:</strong> {checkIn}
          </p>
          <p className="font-body text-deep-brown">
            <strong>Check-out:</strong> {checkOut}
          </p>
          <p className="font-body text-deep-brown">
            <strong>Total Nights:</strong> {nights}
          </p>
          <hr className="border-gold/30" />
          <p className="flex justify-between text-3xl font-heading">
            <span>Total:</span>
            <span className="text-gold">₹{totalPrice}</span>
          </p>
        </div>

        {/* Demo Payment Form */}
        <div className="bg-soft-white rounded-xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-heading text-deep-brown mb-6">
            Pay Securely
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full p-3 bg-white border border-beige rounded-lg"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  placeholder="12/28"
                  className="w-full p-3 bg-white border border-beige rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 bg-white border border-beige rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                defaultValue={name}
                className="w-full p-3 bg-white border border-beige rounded-lg"
              />
            </div>
            <p className="text-xs font-body text-gray-500 flex items-center">
              <FaLock className="mr-1" /> This is a demo payment. No real
              transaction will be processed.
            </p>
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${totalPrice}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;