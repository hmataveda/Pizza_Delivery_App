import React, { useEffect } from "react";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reduxStore/sevices/userServices";
import { getAllCartPizzas } from "../../reduxStore/sevices/cartServices";
import { Link, useNavigate } from "react-router-dom";
import { totalItemInCart } from "../../reduxStore/slices/cartSlice";

function Navbar() {
  let { user } = useSelector((state) => state.user);
  let { totalCount, cartPizzas } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id) {
      async function dispatchGetallPizzas() {
        try {
          const dispatchTogetCartItems = await dispatch(
            getAllCartPizzas()
          ).unwrap();
          dispatch(totalItemInCart());
        } catch (err) {
          console.log("error ", err);
        }
      }
      dispatchGetallPizzas();
    }
  }, [user]);

  const handleLogout = async () => {
    const dispatchLogout = await dispatch(logout()).unwrap();
    console.log("successfully loggedout", dispatchLogout);
    navigate("/login");
  };

  return (
    <div className="row navbar m-0">
      <div className="col-lg-6 d-flex justify-content-center">
        <div className="logo p-3">PizzaByte</div>
        <div className="menu p-3" onClick={() => navigate("/pizzaByte")}>
          {" "}
          Menu
        </div>
      </div>
      <div className="col-lg-6 d-flex justify-content-center">
        <div className="location py-3 pe-3">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        {user._id ? (
          <>
            <div className="signIn py-3 pe-4" onClick={handleLogout}>
              {user.userName + "!!"}
              <span className="px-3 logout">Logout</span>
            </div>
            {user.userRole == "Customer" && (
              <div
                className="cart py-3"
                onClick={() => navigate("/pizzaByte/cart")}
              >
                <i className="bi bi-cart-fill pe-1"></i>
                <span>{totalCount}</span>
              </div>
            )}
          </>
        ) : (
          <div className="signin p-3 ">
            <Link to="/login">Login</Link>/<Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
