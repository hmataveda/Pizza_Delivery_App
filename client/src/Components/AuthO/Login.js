import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reduxStore/sevices/userServices";
import "./auth.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: role } = useLocation();

  const { userError } = useSelector((state) => state.user);
  let [user, setUser] = useState({
    userName: "",
    emailId: "",
    userRole: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("user", user);
      const dispatchLogin = await dispatch(login(user)).unwrap();
      console.log("LoggedIn user", dispatchLogin);
      if (role && dispatchLogin.userRole == "Owner") {
        navigate("/owner/pizzaByte");
      } else {
        navigate("/pizzaByte");
      }
    } catch (err) {
      console.log("error while dispatching the login user", err);
    }
  };

  return (
    <div>
      {role ? <h3> Bussiness Account Login</h3> : <h3>Login</h3>}
      <div className="container">
        <div className="row login justify-content-center">
          {userError &&
            userError.map((err) => {
              return <p className="text-center text-danger">{err}!!</p>;
            })}
          <div className="col-8 text-center">
            <form onSubmit={handleSubmit}>
              <div className="eachrow">
                <label htmlFor="Email">EmailId</label>
                <input
                  type="text"
                  value={user.emailId}
                  placeholder="Emaild"
                  name="emailId"
                  onChange={handleInputChange}
                />
              </div>
              <div className="eachrow">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={user.password}
                  placeholder="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="eachrow">
                <input type="submit" value="login" />
              </div>
            </form>
            <p>
              New customer ? <Link to="/register">Register</Link>
            </p>
            <p>
              Buissness Account??{" "}
              <Link to="/login" state="Owner">
                Login
              </Link>
              |{" "}
              <Link to="/Register" state="Owner">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
