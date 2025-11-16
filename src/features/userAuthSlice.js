import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  userName: null,
  userEmail: null, 
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isUserLoggedIn = true;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail; // 2. Save email on login
    },
    userLogout: (state) => {
      state.isUserLoggedIn = false;
      state.userName = null;
      state.userEmail = null; // 3. Clear email on logout
    },
  },
});

export const { userLogin, userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;