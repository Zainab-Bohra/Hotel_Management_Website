import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRoom, updateRoom } from "../../features/roomSlice";
import Modal from "../Modal";
import Button from "../Button";

const allAmenitiesList = ["Wi-Fi", "Pool", "AC", "Breakfast", "Parking"];

const RoomFormModal = ({ isOpen, onClose, room }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const isEditing = !!room;

  useEffect(() => {
   
    if (room) {
      setFormData(room);
    } else {
      // if we add any room then reset default 
      setFormData({
        name: "",
        description: "",
        price: 0,
        type: "Single",
        amenities: [],
        images: ["", "", ""],
      });
    }
  }, [room, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const amenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((a) => a !== value);
      return { ...prev, amenities };
    });
  };

  const handleImageChange = (index, value) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateRoom(formData));
    } else {
      dispatch(
        addRoom({
          ...formData,
          id: `room-${Date.now()}`, // simple unique ID
          rating: 4.5, // default rating
        })
      );
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Room" : "Add New Room"}
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-body">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
            rows="3"
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              value={formData.type || "Single"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="Single">Single</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amenities
          </label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {allAmenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={amenity}
                  checked={formData.amenities?.includes(amenity)}
                  onChange={handleAmenityChange}
                  className="h-4 w-4 text-gold focus:ring-gold "
                />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URLs (Paste links)
          </label>
          <input
            type="text"
            placeholder="Image 1 URL"
            value={formData.images?.[0] || ""}
            onChange={(e) => handleImageChange(0, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            placeholder="Image 2 URL"
            value={formData.images?.[1] || ""}
            onChange={(e) => handleImageChange(1, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            placeholder="Image 3 URL"
            value={formData.images?.[2] || ""}
            onChange={(e) => handleImageChange(2, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Room" : "Save Room"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomFormModal;