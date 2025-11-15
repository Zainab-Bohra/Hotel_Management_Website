import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: sessionStorage.getItem("isAdmin") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      sessionStorage.setItem("isAdmin", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      sessionStorage.removeItem("isAdmin");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;