import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reduxStore/sevices/userServices";
import { getAllCartPizzas } from "../../reduxStore/sevices/cartServices";
import { Link, useNavigate } from "react-router-dom";
import { totalItemInCart } from "../../reduxStore/slices/cartSlice";
import { setUserLocation } from "../../reduxStore/slices/userSlice";
function Navbar() {
  let { user } = useSelector((state) => state.user);
  let { totalCount, cartPizzas } = useSelector((state) => state.cart);
  let [location, setlocation] = useState({ lat: null, lng: null });

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
      async function getCurrentLocation() {
        function success(position) {
          setlocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
        function error() {
          console.log("unable to retrieve error");
        }
        console.log("comin in here");
        await navigator.geolocation.getCurrentPosition(success, error);
      }
      getCurrentLocation();
      dispatch(setUserLocation(location));
      console.log("sssss", location);
    }
  }, [user]);

  const handleLogout = async () => {
    const dispatchLogout = await dispatch(logout()).unwrap();
    console.log("successfully loggedout", dispatchLogout);
    navigate("/login");
  };

  const handleLocation = (e) => {
    console.log("coming in loca", e.target);
    navigate("/googlemap");
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
        <div className="location py-3 pe-3" onClick={handleLocation}>
          <i className="bi bi-geo-alt-fill"></i>
          <div className=" place ">
            {location.lat}
            {location.lng}
          </div>
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
