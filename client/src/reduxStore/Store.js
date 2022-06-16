import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import pizzaReducer from "./slices/pizzaSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    pizzas: pizzaReducer,
    cart: cartReducer,
  },
});

export default store;
