import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./pizza.css";
import { meats, veg, crust, size } from "./utils";

function PizzaForm(props) {
  const { title, handleSubmit, oldPizza, customer } = props;
  const { pizzaErrors } = useSelector((state) => state.pizzas);
  const initialState = {
    size: "",
    crust: "",
    toppings: {
      meats: [],
      veg: [],
    },
    price: 16.99,
    pizzaName: "",
    image:
      "https://bakerpedia.com/wp-content/uploads/2017/07/41635397_m-e1501008956328-400x400.jpg",
  };

  const [pizza, setPizza] = useState(oldPizza || initialState);

  const handleMeatToppings = (e, item) => {
    const { meats } = pizza.toppings;
    if (meats.includes(item)) {
      setPizza({
        ...pizza,
        toppings: { ...pizza.toppings, meats: meats.filter((i) => i != item) },
      });
    } else {
      setPizza({
        ...pizza,
        toppings: { ...pizza.toppings, meats: [...meats, item] },
      });
    }
  };
  const handleVegToppings = (e, item) => {
    const { veg } = pizza.toppings;
    if (veg.includes(item)) {
      setPizza({
        ...pizza,
        toppings: { ...pizza.toppings, veg: veg.filter((i) => i != item) },
      });
    } else {
      setPizza({
        ...pizza,
        toppings: { ...pizza.toppings, veg: [...veg, item] },
      });
    }
  };

  return (
    <div className="container createPizza mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-4g-9 bg-light ">
          <h2 className="text-center p-3">Pizza Byte {title} Pizza </h2>
          <div className="sizencrust">
            <div className="head p-2">
              <h4>1. Size & Crust</h4>
            </div>
            <div className="size d-flex align-items-center justify-content-around">
              {size.map((pizzasize, index) => {
                return (
                  <div className="sizeradio" key={index}>
                    <input
                      type="radio"
                      name="size"
                      value={pizzasize}
                      id={pizzasize}
                      checked={pizza.size == pizzasize}
                      onChange={(e) => {
                        setPizza({ ...pizza, size: e.target.value });
                      }}
                    />
                    <label htmlFor={pizzasize} className={pizzasize}>
                      {pizzasize}
                    </label>
                  </div>
                );
              })}
            </div>
            <hr />
            <div className="crust">
              {crust.map((crustName, index) => {
                return (
                  <div className="crustradio" key={index}>
                    <input
                      type="radio"
                      name="crust"
                      id={crustName}
                      value={crustName}
                      checked={crustName == pizza.crust}
                      onChange={(e) => {
                        setPizza({ ...pizza, crust: e.target.value });
                      }}
                    />
                    <label htmlFor={crustName}>{crustName}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="topping ">
            <div className="head  p-2">
              <h4> 2. Toppings</h4>
            </div>
            <div className="row meats justify-content-start">
              <h4 className="pb-2">Choose Meats</h4>
              {meats.map((item, index) => {
                return (
                  <div className="col-4" key={index}>
                    <input
                      type="checkbox"
                      name="meats"
                      value={item}
                      id={item}
                      checked={pizza.toppings.meats.includes(item)}
                      onChange={(e) => {
                        handleMeatToppings(e, item);
                      }}
                    />
                    <label htmlFor={item}> {item} </label>
                  </div>
                );
              })}
            </div>

            <div className="veg row">
              <h4 className="pb-2">Choose veggies</h4>
              {veg.map((item, index) => {
                return (
                  <div className="col-4" key={index}>
                    <input
                      type="checkbox"
                      name="veg"
                      value={item}
                      id={item}
                      checked={pizza.toppings.veg.includes(item)}
                      onChange={(e) => {
                        handleVegToppings(e, item);
                      }}
                    />
                    <label htmlFor={item}> {item} </label>
                  </div>
                );
              })}
            </div>
          </div>
          {!customer && (
            <div>
              <div className="head p-2">
                <h4> 3. Name , Image & Price</h4>
              </div>
              <div className="name my-4">
                <label htmlFor="pizzaName" className="px-3">
                  <h5>Pizza name</h5>
                </label>
                <input
                  type="text"
                  name="pizzaName"
                  className="px-3"
                  id="pizzaName"
                  value={pizza.pizzaName}
                  onChange={(e) =>
                    setPizza({ ...pizza, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="name my-4">
                <label htmlFor="pizzaPrice" className="px-3">
                  <h5>Set Pizza Price </h5>
                </label>
                <input
                  type="number"
                  name="price"
                  className="px-3"
                  id="pizzaPrice"
                  value={pizza.price}
                  onChange={(e) =>
                    setPizza({ ...pizza, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="image my-4">
                <label htmlFor="image" className="px-3">
                  <h5>Pizza image url</h5>
                </label>
                <input
                  type="text"
                  name="image"
                  className="px-3"
                  id="pizzaName"
                  value={pizza.image}
                  onChange={(e) =>
                    setPizza({ ...pizza, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </div>
        {pizzaErrors &&
          pizzaErrors.map((err, index) => {
            return (
              <p className="text-center text-danger" key={index}>
                {err}
              </p>
            );
          })}

        {customer ? (
          <button className="col-3 m-3 p-3" onClick={() => handleSubmit(pizza)}>
            Add pizza to Cart
          </button>
        ) : (
          <button className="col-3 m-3 p-3" onClick={() => handleSubmit(pizza)}>
            {title} Pizza
          </button>
        )}
      </div>
    </div>
  );
}

export default PizzaForm;
