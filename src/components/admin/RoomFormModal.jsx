import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRoom, updateRoom } from "../../features/roomSlice";
import Modal from "../Modal";
import Button from "../Button";

const allAmenitiesList = ["Wi-Fi", "Pool", "AC", "Breakfast", "Parking"];

const RoomFormModal = ({ isOpen, onClose, room }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (room) {
      setFormData(room);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        type: "Single",
        amenities: [],
        images: ["", "", ""], // Default empty images
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

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => {
          const newImages = [...prev.images];
          newImages[index] = reader.result;
          return { ...prev, images: newImages };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price <= 0) return alert("Price must be greater than 0");
    
    if (room) {
      dispatch(updateRoom(formData));
    } else {
      dispatch(addRoom({ ...formData, id: `room-${Date.now()}`, rating: 4.5 }));
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={room ? "Edit Room" : "Add New Room"}>
      <form onSubmit={handleSubmit} className="space-y-4 font-body">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" value={formData.name || ""} onChange={handleChange} className="w-full p-2 border rounded hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description || ""} onChange={handleChange} className="w-full p-2 border rounded hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
        </div>

        <div className="flex gap-4">
           <div className="w-1/2">
             <label className="block text-sm font-medium">Price (₹)</label>
             <input type="number" name="price" value={formData.price || 0} onChange={handleChange} className="w-full p-2 border rounded hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
           </div>
           <div className="w-1/2">
             <label className="block text-sm font-medium">Type</label>
             <select name="type" value={formData.type || "Single"} onChange={handleChange} className="w-full p-2 border rounded hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none">
               <option value="Single">Single</option>
               <option value="Deluxe">Deluxe</option>
               <option value="Suite">Suite</option>
               <option value="Family">Family</option>
             </select>
           </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Amenities</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {allAmenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input type="checkbox" value={amenity} checked={formData.amenities?.includes(amenity)} onChange={handleAmenityChange} className="h-4 w-4 text-gold hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Room Images (Upload)</label>
          <div className="space-y-2">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-white hover:file:bg-opacity-90 hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none"
                />
                {formData.images?.[index] && (
                  <img src={formData.images[index]} alt="Preview" className="h-10 w-10 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{room ? "Update" : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomFormModal;