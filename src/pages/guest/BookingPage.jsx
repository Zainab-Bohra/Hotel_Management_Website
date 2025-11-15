import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = useSelector((state) =>
    state.rooms.allRooms.find((r) => r.id === id)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  // Auto-calculate nights and total price
  useEffect(() => {
    if (startDate && endDate && endDate > startDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setNights(diffDays);
      setTotalPrice(diffDays * room.price);
      setError("");
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, room.price]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all guest details.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    if (endDate <= startDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    if (nights === 0) {
      setError("Invalid date range.");
      return;
    }

    
    const bookingDetails = {
      id: `SER${Date.now()}`,
      roomId: room.id,
      roomName: room.name,
      roomImage: room.images[0],
      ...formData,
      checkIn: startDate.toISOString().split("T")[0],
      checkOut: endDate.toISOString().split("T")[0],
      nights,
      totalPrice,
    };

    // Navigate to the payment page, passing the data
    navigate("/payment", { state: { bookingDetails } });
  };

  if (!room) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-8">
        Book Your Stay
      </h1>
      <div className="bg-soft-white rounded-xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-heading text-deep-brown">
            Guest Details
          </h2>
           <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-beige rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-beige rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-beige rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <h2 className="text-2xl font-heading text-deep-brown pt-4">
              Select Dates
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  placeholderText="Select check-in"
                  className="w-full hover:outline-none hover:ring-1 hover:ring-gold"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-body font-medium text-gray-700 mb-1 ">
                  Check-out
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  placeholderText="Select check-out"
                  className="w-full hover:outline-none hover:ring-1 hover:ring-gold"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-body">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Proceed to Payment
            </Button>
        </form>

        {/* Booking Summary (No changes here) */}
        <div className="bg-beige/80 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-heading text-deep-brown mb-4">
            Booking Summary
          </h2>
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-heading text-gold">{room.name}</h3>
          <div className="font-body text-deep-brown space-y-2">
            <p className="flex justify-between">
              <span>Price per night:</span>
              <span className="font-semibold">₹{room.price}</span>
            </p>
            <p className="flex justify-between">
              <span>Nights:</span>
              <span className="font-semibold">{nights}</span>
            </p>
            <hr className="border-gold/30" />
            <p className="flex justify-between text-2xl font-heading">
              <span>Total Price:</span>
              <span className="text-gold">₹{totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage;