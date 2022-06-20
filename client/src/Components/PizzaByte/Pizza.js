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
      console.log("id", id);
      let dispatchDelete = await dispatch(deletePizza(id)).unwrap();
      console.log("succefully dispatching the delete service", dispatchDelete);
    } catch (err) {
      console.log("error while dispatching the delete serv=ice", err);
    }
  };

  const handleAddtoCart = async (e) => {
    const dispatchAddPizzaTocart = await dispatch(
      AddPizzatoCart(pizza)
    ).unwrap();
    console.log("successfully added pizza to cart", dispatchAddPizzaTocart);
    dispatch(totalItemInCart());
    e.target.disabled = true;

    console.log("dispatchAddPizzaTocart", dispatchAddPizzaTocart);
  };
  return (
    <div className="singlePizza col-lg-4 mb-4" key={pizza._id}>
      <div className="pizzaimg">
        <img src={pizza.image} className="h-100 w-100" alt="image" />
      </div>
      <div className="d-flex bg-secondary p-3 justify-content-between ">
        <p className="pizzaname   text-light">{pizza.pizzaName}</p>
        <p>${pizza.price}</p>
        {role && (
          <button className="px-3 py-2 bg-danger" onClick={handleAddtoCart}>
            Add to Cart
          </button>
        )}

        {!role && (
          <div className="edit&delete">
            <i
              className="bi bi-pencil-square mx-3"
              onClick={() =>
                navigate(`/pizzaByte/update/${pizza._id}`, { state: pizza })
              }
            ></i>
            <i
              className="bi bi-archive-fill"
              onClick={() => {
                handleDelete(pizza._id);
              }}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pizza;
