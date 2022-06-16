import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AddPizzatoCart = createAsyncThunk(
  "pizza/addtoCart",
  async (pizza, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/addToCart/${pizza._id}`,
        pizza,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const getAllCartPizzas = createAsyncThunk(
  "pizza/cart/getpizza",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getAllCartItems",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export { AddPizzatoCart, getAllCartPizzas };
