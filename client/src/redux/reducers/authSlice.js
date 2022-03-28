import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = async (token) => {
  const res = await axios.get("/user/info", {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const initialState = {
  user: "",
  isLogged: false,
  isAdmin: false,
  isEmployer: false,
  isEmployee: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    getUserAuth: (state, action) => {
      state.user = action.payload;
      const user = action.payload.role;
      const admin = user === 1 ? true : false;
      const seller = user === 2 ? true : false;
      const employee = user === 0 ? true : false;
      state.isAdmin = admin;
      state.isEmployer = seller;
      state.isEmployee = employee;
    },
  },
});

export const { login, logout, getUserAuth } = authSlice.actions;
export default authSlice.reducer;
