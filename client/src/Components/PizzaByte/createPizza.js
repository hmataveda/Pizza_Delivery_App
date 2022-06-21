import React from "react";
import { createPizza } from "../../reduxStore/sevices/pizzaServices";
import { AddPizzatoCart } from "../../reduxStore/sevices/cartServices";
import { totalItemInCart } from "../../reduxStore/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PizzaForm from "./form";

function CreatePizza() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: customer } = useLocation();

  const handleClick = async (pizza) => {
    try {
      const dispatchCreate = await dispatch(createPizza(pizza)).unwrap();
      if (customer) {
        const dispatchToCart = await dispatch(
          AddPizzatoCart(dispatchCreate)
        ).unwrap();
        dispatch(totalItemInCart());
        navigate("/pizzaByte/cart");
      } else {
        navigate("/owner/pizzaByte");
      }
    } catch (err) {
      console.log(
        "error while dispatch the creting pizza/ adding pizza to cart ",
        err
      );
    }
  };

  return (
    <>
      <PizzaForm
        title="Create"
        handleSubmit={handleClick}
        customer={customer}
      ></PizzaForm>
    </>
  );
}

export default CreatePizza;
