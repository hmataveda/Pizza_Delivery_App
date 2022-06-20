import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOwnerPizzas } from "../../reduxStore/sevices/pizzaServices";
import Pizza from "./Pizza";

function CustomerMainPage() {
  const { user } = useSelector((state) => state.user);
  const { pizzas } = useSelector((state) => state.pizzas);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user._id) {
      navigate("/register");
    }
    if (user.userRole == "Owner") {
      navigate("/owner/pizzaByte");
    }
    dispatch(getAllOwnerPizzas());
  }, []);
  return (
    <div className="container customerpage">
      <div className="row justify-content-center ">
        <div
          className="col-9 bg-secondary ownpizza mb-4 mt-1 "
          onClick={() =>
            navigate("/pizzaByte/createnew", { state: "customer" })
          }
        >
          <h4 className=" m-4">Create Your Own Pizza</h4>
        </div>
        {pizzas.map((pizza) => {
          return <Pizza pizza={pizza} role={"customer"} key={pizza._id} />;
        })}
      </div>
    </div>
  );
}

export default CustomerMainPage;
