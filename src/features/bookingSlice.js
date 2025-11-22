import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  lastUpdate: null, // Store the last update message
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push({ ...action.payload, status: "Pending" }); // Default Pending
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking) {
        booking.status = status;
        // Set notification message
        state.lastUpdate = {
          id: Date.now(), // Unique ID for trigger
          message: `Your booking for ${booking.roomName} has been ${status}!`,
          type: status === "Approved" ? "success" : "error"
        };
      }
    },
    // Clear notification after showing
    clearNotification: (state) => {
      state.lastUpdate = null;
    }
  },
});

export const { addBooking, updateBookingStatus, clearNotification } = bookingSlice.actions;
export default bookingSlice.reducer;