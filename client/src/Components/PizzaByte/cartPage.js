import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCartPizzas,
  AddPizzatoCart,
  deleteCartItem,
  decreaseCartItemCount,
} from "../../reduxStore/sevices/cartServices";
import { totalItemInCart } from "../../reduxStore/slices/cartSlice";

function CartPage() {
  const { cartPizzas, totalCount, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCartPizzas());
    dispatch(totalItemInCart());
  }, []);

  const handleCount = async (cartpizza, todo) => {
    if (todo == "increase") {
      const dispatchIncreaseCount = await dispatch(
        AddPizzatoCart(cartpizza)
      ).unwrap();
    } else if (todo == "decrease") {
      console.log("decreaing count", cartpizza._id);
      const dispatchDecreaseCount = await dispatch(
        decreaseCartItemCount(cartpizza._id)
      ).unwrap();
    } else if (todo == "delete") {
      const dispatchDeleteIteminCart = await dispatch(
        deleteCartItem(cartpizza._id)
      ).unwrap();
    }
    dispatch(totalItemInCart());
  };
  return (
    <div className="container cartpage ">
      <div className="row justify-content-center ">
        {cartPizzas.map((pizza) => {
          return (
            <>
              <div
                className="col-lg-6 d-flex  px-4 my-3 justify-content-start align-items-center"
                key={pizza._id}
              >
                <div className="img border">
                  <img
                    src={pizza.pizzaId.image}
                    alt="images"
                    height={100}
                    width={150}
                  />
                </div>
                <div className="name ps-4">
                  <h4>{pizza.pizzaId.pizzaName || pizza.pizzaId.crust} </h4>
                  <p>${pizza.pizzaId.price}</p>
                </div>
              </div>
              <div className="col-4  my-3 counts d-flex  align-items-center">
                <div className="plusminus">
                  <i
                    className="bi bi-caret-up-fill"
                    onClick={() =>
                      handleCount({ _id: pizza.pizzaId._id }, "increase")
                    }
                  ></i>
                  <span className="px-1">{pizza.count}</span>
                  <i
                    className="bi bi-caret-down-fill"
                    onClick={() => handleCount(pizza, "decrease")}
                  ></i>
                </div>
                <div className="delete">
                  <i
                    className="bi bi-archive-fill px-4 text-danger"
                    onClick={() => handleCount(pizza, "delete")}
                  ></i>
                </div>
              </div>
              <hr />
            </>
          );
        })}

        <div className="col-lg-6 px-5 my-4 subtotal pb-5">Subtotal</div>
        <div className="col-lg-4  my-3 pb-5">
          <span className="totalprice ">${totalPrice}</span>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
