import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "../sevices/userServices";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const userToken = Cookies.get("userToken");
console.log("USER TOKEN", userToken);

if (userToken) {
  var userPayload = jwtDecode(userToken);
  console.log("userPayload", userPayload);
}
let initialState = {
  user: userPayload || {},
  userError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.user = action.payload;
      state.userError = "";
    },
    [register.rejected]: (state, action) => {
      console.log("coming in rejected", action.payload);
      state.userError = action.payload.message;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.userError = "";
    },
    [login.rejected]: (state, action) => {
      state.userError = action.payload.message;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = {};
      state.userError = "";
    },
    [logout.rejected]: (state, action) => {
      state.userError = action.payload;
    },
  },
});

export default userSlice.reducer;
