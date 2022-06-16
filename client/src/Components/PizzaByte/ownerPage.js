import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOwnerPizzas } from "../../reduxStore/sevices/pizzaServices";
import Pizza from "./Pizza";

function OwnerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.user;
  });
  const { pizzas } = useSelector((state) => state.pizzas);

  useEffect(() => {
    if (!user._id) {
      navigate("/register");
    }
    // if (user._id) {
    //   async function dispatchGetallPizzas() {
    //     try {
    //       const response = await dispatch(getAllOwnerPizzas()).unwrap();
    //     } catch (err) {
    //       console.log("error ", err);
    //     }
    //   }
    //   dispatchGetallPizzas();
    // }
  }, []);

  return (
    <div className="container">
      <h3 className="text-center">Buisness owner Page</h3>
      <div className="m-5">
        Create New Pizza for PizzaByte Shop{" "}
        <button onClick={() => navigate("/pizzaByte/createnew")}>
          Create Pizza
        </button>
      </div>
      <h4 className="text-center">Pizza's Created By Owner</h4>
      <div className="row">
        {pizzas.map((pizza) => {
          return <Pizza pizza={pizza} />;
        })}
      </div>
    </div>
  );
}

export default OwnerPage;
