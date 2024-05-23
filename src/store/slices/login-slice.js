import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    token: null,
    email : null,
    usertype : null
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      console.log(action.payload)
      state.token = action.payload.data.token;
      state.email = action.payload.data.email;
      state.usertype = action.payload.data.usertype;
      console.log(state.isLoggedIn)
      console.log(state.token)
      console.log(state.email)
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      state.usertype = null
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer;
