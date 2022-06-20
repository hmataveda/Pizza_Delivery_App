import React from "react";
import UpdateForm from "./form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePizza } from "../../reduxStore/sevices/pizzaServices";

function UpdatePizza() {
  const { state: pizza } = useLocation();
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatingPizza = async (pizza) => {
    try {
      let dispatchUpdate = await dispatch(updatePizza(pizza)).unwrap();
      navigate("/owner/pizzaByte");
    } catch (err) {
      console.log("error while dispatching update pizza", err);
    }
  };
  return (
    <div>
      Update Page
      <UpdateForm
        oldPizza={pizza}
        title={"Update"}
        handleSubmit={updatingPizza}
      />
    </div>
  );
}

export default UpdatePizza;
