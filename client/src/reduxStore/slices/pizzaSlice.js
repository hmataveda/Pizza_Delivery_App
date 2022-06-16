import { createSlice, isFulfilled } from "@reduxjs/toolkit";
import { createPizza, getAllOwnerPizzas } from "../sevices/pizzaServices";

let initialState = {
  pizzas: [],
};

const PizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    getallUser() {},
  },
  extraReducers: {
    [getAllOwnerPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      console.log("state", action.payload);
    },
    [getAllOwnerPizzas.rejected]: (state, action) => {
      console.log("error while getting all Owners pizza", action);
    },

    [createPizza.fulfilled]: (state, action) => {
      state.pizzas.push(action.payload);
    },
    [createPizza.rejected]: (state, action) => {
      console.log("error while creating the new pizza", action.payload);
    },
  },
});

export default PizzaSlice.reducer;
