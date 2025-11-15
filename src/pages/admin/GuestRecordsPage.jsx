import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Button from "../../components/Button";

const ITEMS_PER_PAGE = 10;

const GuestRecordsPage = () => {
const { bookings } = useSelector((state) => state.bookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });

  // Create a unique guest list from bookings
  const guests = useMemo(() => {
    const guestMap = new Map();
    bookings.forEach((booking) => {
      if (!guestMap.has(booking.email)) {
        guestMap.set(booking.email, {
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
        });
      }
    });
    return Array.from(guestMap.values());
  }, [bookings]);

  // Sorting logic
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

  // Pagination logic
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
        <table className="w-full min-w-max font-body">
          <thead>
            <tr className="border-b border-gray-200">
              <SortableHeader name="name">Name</SortableHeader>
              <SortableHeader name="email">Email</SortableHeader>
              <SortableHeader name="phone">Phone</SortableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedGuests.map((guest) => (
              <tr
                key={guest.email}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3">{guest.name}</td>
                <td className="p-3">{guest.email}</td>
                <td className="p-3">{guest.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6 font-body">
        <p className="text-sm text-gray-700">
          Showing {paginatedGuests.length} of {guests.length} guests
        </p>
        <div className="space-x-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            variant="secondary"
            className="disabled:opacity-50"
          >
            Previous
          </Button>
          <span className="p-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="secondary"
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestRecordsPage;