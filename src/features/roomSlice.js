import { createSlice } from "@reduxjs/toolkit";
import { mockRooms } from "../data/mockRoomData";

const initialState = {
  allRooms: mockRooms,
  filteredRooms: mockRooms,
  status: "idle",
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    filterRooms: (state, action) => {
      const { price, type, amenities, search } = action.payload;
      let tempRooms = [...state.allRooms];

      if (search) {
        tempRooms = tempRooms.filter((room) =>
          room.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (type) {
        tempRooms = tempRooms.filter((room) => room.type === type);
      }
      if (price) {
        tempRooms = tempRooms.filter((room) => room.price <= parseInt(price));
      }
      if (amenities.length > 0) {
        tempRooms = tempRooms.filter((room) =>
          amenities.every((amenity) => room.amenities.includes(amenity))
        );
      }
      state.filteredRooms = tempRooms;
    },
    // CRUD operations for admin
    addRoom: (state, action) => {
      state.allRooms.push(action.payload);
      state.filteredRooms = state.allRooms;
    },
    updateRoom: (state, action) => {
      const index = state.allRooms.findIndex(
        (room) => room.id === action.payload.id
      );
      if (index !== -1) {
        state.allRooms[index] = action.payload;
        state.filteredRooms = state.allRooms;
      }
    },
    deleteRoom: (state, action) => {
      state.allRooms = state.allRooms.filter(
        (room) => room.id !== action.payload
      );
      state.filteredRooms = state.allRooms;
    },
  },
});

export const { filterRooms, addRoom, updateRoom, deleteRoom } =
  roomSlice.actions;
export default roomSlice.reducer;