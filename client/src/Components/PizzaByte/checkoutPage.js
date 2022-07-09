import React from "react";
import "./checkoutpage.css";
import Stripe from "react-stripe-checkout";
import axios from "axios";

function CheckoutPage() {
  const handleToken = async (amount, token) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment",
        {
          token: token.id,
          amount: amount,
        },
        { withCredentials: true }
      );
      console.log("response", response);
    } catch (err) {
      console.log("client paylemnt error", err);
    }
  };
  const tokenHandler = (token) => {
    console.log(
      "tokenllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
      token
    );
    handleToken(100, token);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8000/api/payment",
        {},
        { withCredentials: true }
      );
      console.log("response", response);
      const body = await response.data;
      window.location.href = body.url;
    } catch (err) {
      console.log("client paylemnt error", err);
    }
  };
  return (
    <div className="mt-5 pt-5 container checkoutpage">
      <div className="row">
        <div className="col-75 ">
          <div className="container left">
            <form onSubmit={handleSubmit}>
              <div className="row ">
                <div className="col-50 ">
                  <h3>Billing Address</h3>
                  <label for="fname">
                    <i className="fa fa-user"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                  />
                  <label for="email">
                    <i className="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                  <label for="adr">
                    <i className="fa fa-address-card-o"></i> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                  />
                  <label for="city">
                    <i className="fa fa-institution"></i> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                  />

                  <div className="row">
                    <div className="col-50">
                      <label for="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                      />
                    </div>
                    <div className="col-50">
                      <label for="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label for="cname">Name on Card</label>
                  <input
                    type="text"
                    id="cname"
                    name="cardname"
                    placeholder="John More Doe"
                  />
                  <label for="ccnum">Credit card number</label>
                  <input
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    placeholder="1111-2222-3333-4444"
                  />
                  <label for="expmonth">Exp Month</label>
                  <input
                    type="text"
                    id="expmonth"
                    name="expmonth"
                    placeholder="September"
                  />

                  <div className="row">
                    <div className="col-50">
                      <label for="expyear">Exp Year</label>
                      <input
                        type="text"
                        id="expyear"
                        name="expyear"
                        placeholder="2018"
                      />
                    </div>
                    <div className="col-50">
                      <label for="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="352"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label>
                <input type="checkbox" checked={"checked"} name="sameadr" />{" "}
                Shipping address same as billing
              </label>
              <input
                type="submit"
                value="Continue to checkout"
                className="btn"
              />
              {/* <Stripe
                stripeKey="pk_test_51LJHxIFU8i3UPRgdsMjYyox7pthC3biDFc0VYieTMbpO6urlpxaYRJjxtwAx0ALfIkW6OGG3Kv5AOfLzpiRpQw3e0057eKdtc1"
                token={tokenHandler}
             
              ></Stripe> */}
            </form>
          </div>
        </div>

        <div className="col-25 ">
          <div className="container right">
            <h4>
              Cart
              <span className="price">
                <i className="fa fa-shopping-cart"></i>
                <b>4</b>
              </span>
            </h4>
            <p>
              <a href="#">Product 1</a> <span className="price">$15</span>
            </p>
            <p>
              <a href="#">Product 2</a> <span className="price">$5</span>
            </p>
            <p>
              <a href="#">Product 3</a> <span className="price">$8</span>
            </p>
            <p>
              <a href="#">Product 4</a> <span className="price">$2</span>
            </p>
            <hr />
            <p>
              Total{" "}
              <span className="price">
                <b>$30</b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
