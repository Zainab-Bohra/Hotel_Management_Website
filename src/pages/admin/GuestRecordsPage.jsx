import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaEye, FaTimes } from "react-icons/fa";
import Modal from "../../components/Modal"; // Reuse your Modal component

const ITEMS_PER_PAGE = 10;

const GuestRecordsPage = () => {
  const { bookings } = useSelector((state) => state.bookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const guests = useMemo(() => {
    const guestMap = new Map();
    bookings.forEach((booking) => {
      if (!guestMap.has(booking.email)) {
        guestMap.set(booking.email, {
          ...booking,
        });
      }
    });
    return Array.from(guestMap.values());
  }, [bookings]);

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
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleViewDetails = (guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-heading text-deep-brown mb-6">
        Guest Records
      </h1>
      <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-[1000px] font-body">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">Aadhaar</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedGuests.map((guest) => (
              <tr
                key={guest.email}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3 font-semibold">{guest.name}</td>
                <td className="p-3">
                  <div>{guest.phone}</div>
                  <div className="text-xs text-gray-500">{guest.email}</div>
                </td>
                <td className="p-3">{guest.aadhaar}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleViewDetails(guest)}
                    className="flex items-center px-3 py-1 bg-gold text-white rounded hover:bg-opacity-90 text-sm"
                  >
                    <FaEye className="mr-1" /> View Full Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DETAILS MODAL --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guest Details"
      >
        {selectedGuest && (
          <div className="space-y-4 font-body text-deep-brown">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {selectedGuest.name}
              </div>
              <div>
                <strong>Phone:</strong> {selectedGuest.phone}
              </div>
              <div className="col-span-2">
                <strong>Email:</strong> {selectedGuest.email}
              </div>
              <div className="col-span-2">
                <strong>Address:</strong> {selectedGuest.address}
              </div>
              <div className="col-span-2">
                <strong>Aadhaar Number:</strong> {selectedGuest.aadhaar}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-heading text-lg mb-2">Documents</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-2 rounded text-center text-sm">
                  <p className="mb-1 font-bold">Front</p>
                  {selectedGuest.aadhaarFrontImg}
                </div>
                <div className="bg-gray-100 p-2 rounded text-center text-sm">
                  <p className="mb-1 font-bold">Back</p>
                  {selectedGuest.aadhaarBackImg}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default GuestRecordsPage;
