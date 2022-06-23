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
    <div className=" container customerpage ">
      <div className="row justify-content-center ">
        <div
          className="col-9 col-lg-7 ownpizza  mb-4  ps-5"
          onClick={() =>
            navigate("/pizzaByte/createnew", { state: "customer" })
          }
        >
          <p className="p-0 m-0 mt-3">Its not just a food </p>
          <p className="p-0 m-0 ms-5">its an experience...</p>
          <button className="createButton">Create ur Own</button>
        </div>
      </div>
      <div className="row justify-content-center ">
        {pizzas.length > 0 &&
          pizzas.map((pizza) => {
            return <Pizza pizza={pizza} role={"customer"} key={pizza._id} />;
          })}
      </div>
    </div>
  );
}

export default CustomerMainPage;
