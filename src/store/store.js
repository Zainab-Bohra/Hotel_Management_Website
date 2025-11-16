import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/roomSlice";
import bookingReducer from "../features/bookingSlice";
import authReducer from "../features/authSlice";
import userAuthReducer from "../features/userAuthSlice"; // 1. Import new slice

// Function to load the state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("hotelState");
    if (serializedState === null) {
      return undefined;
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
    // 2. Add userAuth to the state we save
    const stateToSave = {
      bookings: state.bookings,
      rooms: state.rooms,
      userAuth: state.userAuth, // Added this
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("hotelState", serializedState);
  } catch (err) {
    console.warn("Could not save state to localStorage", err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userAuth: userAuthReducer, // 3. Add new reducer
    rooms: roomReducer,
    bookings: bookingReducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});