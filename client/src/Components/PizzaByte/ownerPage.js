import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
    dispatch(getAllOwnerPizzas());
  }, []);

  return (
    <div className=" owner">
      <div className="m-3 text-center heading p-3 pt-5 mt-5 ">
        <h1 className="p-4">Welcome PizzaByte Owner!!</h1>
        <button onClick={() => navigate("/pizzaByte/createnew")}>
          Create Pizza
        </button>
      </div>

      <div className="row justify-content-center">
        {pizzas.map((pizza) => {
          return <Pizza pizza={pizza} key={pizza._id} />;
        })}
      </div>
    </div>
  );
}

export default OwnerPage;
