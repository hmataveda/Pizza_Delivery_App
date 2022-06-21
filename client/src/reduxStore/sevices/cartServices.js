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

const deleteCartItem = createAsyncThunk(
  "pizza/cart/deletecartItem",
  async (cartItemId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteCartItem/${cartItemId}`,
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

const decreaseCartItemCount = createAsyncThunk(
  "pizza/cart/decreaseCartItemCount",
  async (cartItemId, thunkAPI) => {
    try {
      console.log("decreaing count", cartItemId);
      const response = await axios.put(
        `http://localhost:8000/api/decreaseCartCount/${cartItemId}`,
        {},
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

export {
  AddPizzatoCart,
  getAllCartPizzas,
  deleteCartItem,
  decreaseCartItemCount,
};
