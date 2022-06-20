import { createSlice } from "@reduxjs/toolkit";
import {
  AddPizzatoCart,
  getAllCartPizzas,
  decreaseCartItemCount,
  deleteCartItem,
} from "../sevices/cartServices";

const initialState = {
  cartPizzas: [],
  totalCount: 0,
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    totalItemInCart: (state, action) => {
      let totalCount = 0;
      let totalPrice = 0;

      state.cartPizzas.forEach((pizza) => {
        totalCount += pizza.count;
        totalPrice = pizza.count * pizza.pizzaId.price;
      });
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
    },
  },

  extraReducers: {
    [AddPizzatoCart.fulfilled]: (state, action) => {
      const index = state.cartPizzas.findIndex(
        (pizza) => pizza.pizzaId._id == action.payload.pizzaId
      );
      if (index == -1) {
        state.cartPizzas.push(action.payload);
      } else {
        state.cartPizzas[index].count = action.payload.count;
      }
    },
    [AddPizzatoCart.rejected]: (state, action) => {
      console.log("Error while AddingPizza to cart", action.payload);
    },

    [getAllCartPizzas.fulfilled]: (state, action) => {
      state.cartPizzas = action.payload;
    },
    [getAllCartPizzas.rejected]: (state, action) => {
      console.log("Error while Getting all pizzas from server", action.payload);
    },

    [deleteCartItem.fulfilled]: (state, action) => {
      state.cartPizzas = state.cartPizzas.filter(
        (cartItems) => cartItems._id != action.payload._id
      );
    },

    [deleteCartItem.rejected]: (state, action) => {
      console.log(
        "Error while deleting the cart item pizza from ",
        action.payload
      );
    },

    [decreaseCartItemCount.fulfilled]: (state, action) => {
      console.log("decreaseCartItemCount", action.payload);
      const cartItemIndex = state.cartPizzas.findIndex(
        (cartItem) => action.payload._id == cartItem._id
      );
      if (cartItemIndex > -1) {
        if (state.cartPizzas[cartItemIndex].count == 1) {
          state.cartPizzas = state.cartPizzas.filter(
            (cartItem) => cartItem._id != action.payload._id
          );
        } else {
          state.cartPizzas[cartItemIndex].count = action.payload.count;
        }
      }
    },
    [decreaseCartItemCount.rejected]: (state, action) => {
      console.log(
        "Error while deleting the cart item pizza from  cart",
        action.payload
      );
    },
  },
});

export default CartSlice.reducer;

export const { totalItemInCart } = CartSlice.actions;
