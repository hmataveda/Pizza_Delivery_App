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
const updatePizza = createAsyncThunk(
  "pizza/updatePizza",
  async (pizza, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/updatepizza/${pizza._id}`,
        pizza,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const deletePizza = createAsyncThunk(
  "pizza/deletePizza",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deletepizza/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export { createPizza, getAllOwnerPizzas, updatePizza, deletePizza };
