import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pizza from "./Pizza";

function CustomerMainPage() {
  const { user } = useSelector((state) => state.user);
  const { pizzas } = useSelector((state) => state.pizzas);
  const navigate = useNavigate();
  console.log("pizzas", pizzas);

  useEffect(() => {
    console.log("in main");
    if (!user._id) {
      navigate("/register");
    }
    if (user.userRole == "Owner") {
      navigate("/owner/pizzaByte");
    }
  }, []);
  return (
    <div className="container">
      CustomerMainPage <div className="carousel">Carousel</div>
      <div className="row ">
        {pizzas.map((pizza) => {
          return <Pizza pizza={pizza} role={"customer"} key={pizza._id} />;
        })}
      </div>
    </div>
  );
}

export default CustomerMainPage;
