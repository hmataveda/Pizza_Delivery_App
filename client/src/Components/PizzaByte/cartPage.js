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
  }, []);

  const handleCount = async (cartpizza, todo) => {
    if (todo == "increase") {
      const dispatchIncreaseCount = await dispatch(
        AddPizzatoCart(cartpizza)
      ).unwrap();
      console.log("dispatchIncreaseCount", dispatchIncreaseCount);
    } else if (todo == "decrease") {
      console.log("decreaing count", cartpizza._id);
      const dispatchDecreaseCount = await dispatch(
        decreaseCartItemCount(cartpizza._id)
      ).unwrap();
      console.log("dispatchDecreaseCount", dispatchDecreaseCount);
    } else if (todo == "delete") {
      const dispatchDeleteIteminCart = await dispatch(
        deleteCartItem(cartpizza._id)
      ).unwrap();
      console.log("dispatchDeleteIteminCart", dispatchDeleteIteminCart);
    }
    dispatch(totalItemInCart());
  };
  return (
    <div className="container cart">
      <div className="row justify-content-center">
        <div className="col-6 m-4">
          <h1 className="text-center pb-4">Cart </h1>
          <table>
            <thead>
              <tr>
                <th>ItemName</th>
                <th>Price</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {cartPizzas.map((pizza) => {
                return (
                  <tr key={pizza._id}>
                    <td>{pizza.pizzaId.pizzaName || pizza.pizzaId.crust} </td>

                    <td>{pizza.pizzaId.price}</td>
                    <td>
                      <i
                        className="bi bi-caret-up-fill"
                        onClick={() =>
                          handleCount({ _id: pizza.pizzaId._id }, "increase")
                        }
                      ></i>
                      <span className="px-2">{pizza.count}</span>
                      <i
                        className="bi bi-caret-down-fill"
                        onClick={() => handleCount(pizza, "decrease")}
                      ></i>
                      <i
                        className="bi bi-archive-fill px-2"
                        onClick={() => handleCount(pizza, "delete")}
                      ></i>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <h4>Total</h4>{" "}
                </td>
                <td>
                  <h5>${totalPrice}</h5>
                </td>
                <td>
                  <h5>{totalCount}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
