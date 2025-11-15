/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03 }}
      layout
      className="bg-soft-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <img
        src={room.images[0]}
        alt={room.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-heading text-deep-brown">{room.name}</h3>
          <div className="flex items-center text-gold">
            <FaStar className="mr-1" />
            <span>{room.rating}</span>
          </div>
        </div>
        <p className="font-body text-gray-600 text-sm mb-4">
          {room.description.substring(0, 100)}...
        </p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl font-heading text-gold">
            ₹{room.price}
            <span className="text-sm font-body text-gray-500">/night</span>
          </span>
          <Link
            to={`/rooms/${room.id}`}
            className="py-2 px-5 rounded-full font-body font-semibold transition-all duration-300 bg-gold text-soft-white hover:bg-opacity-90 text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;