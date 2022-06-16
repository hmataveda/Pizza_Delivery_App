import React from "react";
import { useSelector } from "react-redux";

function Pizza(props) {
  const { user } = useSelector((state) => state.user);
  const { pizza, role } = props;
  console.log("userrr", role);
  const handleCart = () => {};
  return (
    <div className="singlePizza col-lg-4 mb-4" key={pizza._id}>
      <div className="pizzaimg">
        <img src={pizza.image} className="h-100 w-100" alt="image" />
      </div>

      <p className="pizzaname p-3 bg-secondary text-light">
        {pizza.pizzaName} hii
      </p>
      {role && (
        <button className="px-3 py-2 bg-danger" onClick={handleCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default Pizza;
