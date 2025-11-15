import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/roomSlice";
import bookingReducer from "../features/bookingSlice";
import authReducer from "../features/authSlice";


// Function to load the state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("hotelState");
    if (serializedState === null) {
      return undefined; // No state in localStorage, use reducers' default
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Could not load state from localStorage", err);
    return undefined;
  }
};

// Function to save the state to localStorage
const saveState = (state) => {
  try {
    // We only want to save the bookings and rooms data
    const stateToSave = {
      bookings: state.bookings,
      rooms: state.rooms,
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("hotelState", serializedState);
  } catch (err) {
    console.warn("Could not save state to localStorage", err);
  }
};

// --- END OF NEW CODE ---

// Load the state from localStorage when the app starts
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
  },
  preloadedState: preloadedState, // 1. Pass the loaded state here
});

// 2. Save the state to localStorage every time it changes
store.subscribe(() => {
  saveState(store.getState());
});