import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "../sevices/userServices";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const userToken = Cookies.get("userToken");

if (userToken) {
  var userPayload = jwtDecode(userToken);
}
let initialState = {
  user: userPayload || {},
  location: { lng: null, lat: null },
  userError: [],
};

const handleErrors = (state, action) => {
  state.userError = [];
  let error = action.payload.response;
  for (let key of Object.keys(error.data.errors)) {
    state.userError.push(error.data.errors[key].message);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.userError = [];
    },
    [register.rejected]: (state, action) => {
      handleErrors(state, action);
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.userError = [];
    },
    [login.rejected]: (state, action) => {
      state.userError = [];
      state.userError.push(action.payload.response.data.Error);
    },
    [logout.fulfilled]: (state, action) => {
      state.user = {};
      state.userError = [];
    },
    [logout.rejected]: (state, action) => {
      state.userError = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserLocation } = userSlice.actions;
