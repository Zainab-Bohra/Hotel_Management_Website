import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRoom } from "../../features/roomSlice";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import RoomFormModal from "../../components/admin/RoomFormModal"; 
const ManageRoomsPage = () => {
  const { allRooms } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null); // null for new, room object for edit

  const handleAddNew = () => {
    setCurrentRoom(null);
    setIsModalOpen(true);
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      dispatch(deleteRoom(id));
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading text-deep-brown">
            Manage Rooms
          </h1>
          <Button onClick={handleAddNew} className="flex items-center">
            <FaPlus className="mr-2" />
            Add New Room
          </Button>
        </div>

        <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full min-w-max font-body">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-16 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-semibold">{room.name}</td>
                  <td className="p-3">{room.type}</td>
                  <td className="p-3">₹{room.price}</td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => handleEdit(room)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <RoomFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={currentRoom}
      />
    </>
  );
};

export default ManageRoomsPage;