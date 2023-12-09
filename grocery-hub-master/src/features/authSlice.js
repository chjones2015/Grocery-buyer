import { createSlice } from "@reduxjs/toolkit";

// initial state of the auth slice
const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      // store the user and token in the the local storage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      // update the state
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    onLogout: (state) => {
      // remove the user and token from the local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // update the state
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
