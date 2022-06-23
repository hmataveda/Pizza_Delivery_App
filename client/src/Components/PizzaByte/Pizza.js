import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddPizzatoCart } from "../../reduxStore/sevices/cartServices";
import { useNavigate } from "react-router-dom";
import { totalItemInCart } from "../../reduxStore/slices/cartSlice";
import { deletePizza } from "../../reduxStore/sevices/pizzaServices";

function Pizza(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { pizza, role } = props;

  const handleDelete = async (id) => {
    try {
      let dispatchDelete = await dispatch(deletePizza(id)).unwrap();
    } catch (err) {
      console.log("error while dispatching the delete serv=ice", err);
    }
  };

  const handleAddtoCart = async (e) => {
    const dispatchAddPizzaTocart = await dispatch(
      AddPizzatoCart(pizza)
    ).unwrap();
    dispatch(totalItemInCart());
    console.log("sdsdsd", e.target);
    e.target.disabled = true;
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-12  mb-4 " key={pizza._id}>
      <div className="singlePizza ">
        <div className="pizzaimg">
          <img src={pizza.image} className="h-100 w-100 image" alt="image" />
        </div>
        <div className="d-flex flex-column justify-content-end h-100 align-items-center ">
          <p className="pizzaname p-0 m-0">{pizza.pizzaName}</p>
          <p className="p-2 m-0">${pizza.price}</p>
          {role && (
            <button className="cartbutton" onClick={handleAddtoCart}>
              Add to Cart
            </button>
          )}

          {!role && (
            <div className="edit&delete d-flex justify-content-between  w-100">
              <i
                className="bi bi-pencil-square "
                onClick={() =>
                  navigate(`/pizzaByte/update/${pizza._id}`, { state: pizza })
                }
              ></i>

              <i
                className="bi bi-archive-fill "
                onClick={() => {
                  handleDelete(pizza._id);
                }}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pizza;
