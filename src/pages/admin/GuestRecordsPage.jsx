import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaEye } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

const GuestRecordsPage = () => {
  const { bookings } = useSelector((state) => state.bookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });

  // 1. Create a unique guest list from bookings, now with more data
  const guests = useMemo(() => {
    const guestMap = new Map();
    bookings.forEach((booking) => {
      if (!guestMap.has(booking.email)) {
        guestMap.set(booking.email, {
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          address: booking.address, // Added address
          aadhaar: booking.aadhaar,
          aadhaarFrontImg: booking.aadhaarFrontImg, // Added front img
          aadhaarBackImg: booking.aadhaarBackImg, // Added back img
        });
      }
    });
    return Array.from(guestMap.values());
  }, [bookings]);

  // ... (sorting and pagination logic is unchanged) ...
  const sortedGuests = useMemo(() => {
    let sortableGuests = [...guests];
    if (sortConfig.key) {
      sortableGuests.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableGuests;
  }, [guests, sortConfig]);

  const paginatedGuests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedGuests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedGuests, currentPage]);

  const totalPages = Math.ceil(sortedGuests.length / ITEMS_PER_PAGE);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ children, name }) => {
    const isSorted = sortConfig.key === name;
    return (
      <th
        className="text-left p-3 cursor-pointer"
        onClick={() => requestSort(name)}
      >
        <div className="flex items-center space-x-1">
          <span>{children}</span>
          {isSorted &&
            (sortConfig.direction === "ascending" ? (
              <FaArrowUp size={12} />
            ) : (
              <FaArrowDown size={12} />
            ))}
        </div>
      </th>
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-heading text-deep-brown mb-6">
        Guest Records
      </h1>
      <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-x-auto">
        {/* 2. Made table wider for new columns */}
        <table className="w-full min-w-[1000px] font-body">
          <thead>
            <tr className="border-b border-gray-200">
              <SortableHeader name="name">Name</SortableHeader>
              <SortableHeader name="phone">Phone</SortableHeader>
              <SortableHeader name="address">Address</SortableHeader>
              <SortableHeader name="aadhaar">Aadhaar #</SortableHeader>
              <th className="text-left p-3">Aadhaar Docs</th>
            </tr>
          </thead>
          <tbody>
            {paginatedGuests.map((guest) => (
              <tr
                key={guest.email}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {/* 3. Added new cells for address, aadhaar, and docs */}
                <td className="p-3">
                  <div className="font-semibold">{guest.name}</div>
                  <div className="text-sm text-gray-500">{guest.email}</div>
                </td>
                <td className="p-3">{guest.phone}</td>
                <td className="p-3 text-sm">{guest.address}</td>
                <td className="p-3">{guest.aadhaar}</td>
                <td className="p-3">
                  <button className="flex items-center space-x-1 text-blue-500 hover:underline"
                    title={`Front: ${guest.aadhaarFrontImg}, Back: ${guest.aadhaarBackImg}`}
                  >
                    <FaEye size={16} />
                    <span>View Docs</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls (unchanged) */}
    </motion.div>
  );
};

export default GuestRecordsPage;