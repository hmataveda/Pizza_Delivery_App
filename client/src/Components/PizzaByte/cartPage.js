import React from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const { cartPizzas } = useSelector((state) => state.cart);
  console.log("cartPizza", cartPizzas);
  return (
    <div className="container cart">
      <div className="row justify-content-center">
        <div className="col-6 m-4">
          <h1 className="text-center pb-4">Cart </h1>
          <table>
            <thead>
              <tr>
                <th>ItemName</th>
                <th>Count</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartPizzas.map((pizza) => {
                return (
                  <tr>
                    <td>{pizza.pizzaId.pizzaName}</td>
                    <td>{pizza.count}</td>
                    <td>$0</td>
                  </tr>
                );
              })}
              <tr>
                <td>Total </td>
                <td>Count</td>
                <td>price</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
