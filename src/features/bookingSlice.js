import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push({ ...action.payload, status: "Approved" });
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking) {
        booking.status = status;
      }
    },
  },
});

export const { addBooking, updateBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;