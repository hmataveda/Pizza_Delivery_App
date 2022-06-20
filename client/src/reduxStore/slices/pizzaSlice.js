import { createSlice } from "@reduxjs/toolkit";
import {
  createPizza,
  getAllOwnerPizzas,
  updatePizza,
  deletePizza,
} from "../sevices/pizzaServices";

let initialState = {
  pizzas: [],
  pizzaErrors: [],
};

const handleErrors = function (state, action) {
  state.pizzaErrors = [];
  const errors = action.payload.response.data;
  for (let key of Object.keys(errors.errors)) {
    const message = errors.errors[key].message;
    state.pizzaErrors.push(message);
  }
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
    },
    [getAllOwnerPizzas.rejected]: (state, action) => {
      console.log("error while getting all Owners pizza", action);
    },

    [createPizza.fulfilled]: (state, action) => {
      state.pizzas.push(action.payload);
      state.pizzaErrors = [];
    },
    [createPizza.rejected]: (state, action) => {
      handleErrors(state, action);
    },

    [updatePizza.fulfilled]: (state, action) => {
      let updatedPizza = action.payload;
      state.pizzas = state.pizzas.map((pizza) => {
        if (pizza._id == updatedPizza._id) {
          return updatedPizza;
        } else {
          return pizza;
        }
      });
      state.pizzaErrors = [];
    },
    [updatePizza.rejected]: (state, action) => {
      console.log("error while updating the  pizza", action);
      handleErrors(state, action);
    },
    [deletePizza.fulfilled]: (state, action) => {
      let deletedPizza = action.payload;
      state.pizzas = state.pizzas.filter(
        (pizza) => pizza._id != deletedPizza._id
      );
    },
    [deletePizza.rejected]: (state, action) => {
      console.log("error while deleting the  pizza", action);
    },
  },
});

export default PizzaSlice.reducer;
