import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk("user/register", async (user, thunkAPI) => {
  try {
    console.log();
    const response = await axios.post(
      "http://localhost:8000/api/register",
      user,
      {
        withCredentials: true,
      }
    );
    console.log(" Suuccefully Registering in the user in client", response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const login = createAsyncThunk("use/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login", user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("use/logout", async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
});

export { register, login, logout };
