import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createPizza = createAsyncThunk(
  "pizza/create",
  async (pizza, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/newpizza",
        pizza,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const getAllOwnerPizzas = createAsyncThunk(
  "pizza/owner/getall",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8000/api/ownerpizza", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export { createPizza, getAllOwnerPizzas };
