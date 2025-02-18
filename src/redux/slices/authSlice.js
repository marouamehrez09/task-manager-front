import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";

const initialState = {
  user: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,

  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token); // Stocke le token 
    },
    logout: (state, action) => {
      state.user = null;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("token");
      
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
