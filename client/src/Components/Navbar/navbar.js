import React, { useEffect } from "react";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reduxStore/sevices/userServices";
import { getAllOwnerPizzas } from "../../reduxStore/sevices/pizzaServices";
import { getAllCartPizzas } from "../../reduxStore/sevices/cartServices";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  let { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("usersss", user);

  useEffect(() => {
    if (user._id) {
      async function dispatchGetallPizzas() {
        try {
          const dispatchTogetAllOwnersPizza = await dispatch(
            getAllOwnerPizzas()
          ).unwrap();
          const dispatchTogetCartItems = await dispatch(
            getAllCartPizzas()
          ).unwrap();

          console.log("allOwnersPizza", dispatchTogetAllOwnersPizza);
          console.log("allPizzasinCart", dispatchTogetCartItems);
        } catch (err) {
          console.log("error ", err);
        }
      }
      dispatchGetallPizzas();
    }
  }, [user]);

  useEffect(() => {}, []);
  const handleLogout = async () => {
    const dispatchLogout = await dispatch(logout()).unwrap();
    console.log("successfully loggedout", dispatchLogout);
    navigate("/login");
  };

  return (
    <nav>
      <div className="row navbar text-light ">
        <div className="col-lg-6 d-flex justify-content-center">
          <div className="logo p-3">PizzaByte</div>
          <div className="menu p-3"> Menu</div>
        </div>
        <div className="col-lg-6 d-flex justify-content-center">
          <div className="location p-3">Location logo </div>
          {user._id ? (
            <div className="signIn p-3" onClick={handleLogout}>
              {user.userName + "!!"}Logout
            </div>
          ) : (
            <div className="signIn p-3 ">
              <Link to="/login">Login</Link>/
              <Link to="/register">Register</Link>
            </div>
          )}

          <div className="cart p-3" onClick={() => navigate("/pizzaByte/cart")}>
            Cart
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
