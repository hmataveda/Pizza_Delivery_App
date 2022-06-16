import { createSlice } from "@reduxjs/toolkit";
import { AddPizzatoCart, getAllCartPizzas } from "../sevices/cartServices";

const initialState = {
  cartPizzas: [],
  totalCount: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [AddPizzatoCart.fulfilled]: (state, action) => {
      console.log("AddedPizza to cart", action.payload);
    },
    [AddPizzatoCart.rejected]: (state, action) => {
      console.log("Error while AddingPizza to cart", action);
    },

    [getAllCartPizzas.fulfilled]: (state, action) => {
      state.cartPizzas = action.payload;
      console.log("Got all pizzas from server", action.payload);
    },
    [getAllCartPizzas.rejected]: (state, action) => {
      console.log("Error while Getting all pizzas from server", action);
    },
  },
});

export default CartSlice.reducer;
