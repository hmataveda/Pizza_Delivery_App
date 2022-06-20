import React, { useEffect, useState } from "react";
import { register } from "../../reduxStore/sevices/userServices";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Register() {
  const { userError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: role } = useLocation();

  let [user, setUser] = useState({
    userName: "",
    emailId: "",
    userRole: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (role) {
      setUser({ ...user, userRole: "Owner" });
    } else {
      setUser({ ...user, userRole: "Customer" });
    }
  }, []);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dispatchregister = await dispatch(register(user)).unwrap();
      console.log("Suuceesful dispatched register", dispatchregister);
      if (role) {
        navigate("/owner/pizzaByte");
      } else {
        navigate("/pizzaByte");
      }
    } catch (err) {
      console.log("error while dispatching", err);
    }
  };

  return (
    <div>
      {role ? <h3> Bussiness Account Register</h3> : <h3>Register</h3>}

      <div className="container">
        {userError &&
          userError.map((err, index) => {
            return (
              <p className="text-center text-danger" key={index}>
                {err}
              </p>
            );
          })}
        <div className="row register justify-content-center">
          <div className="col-9 text-center">
            <form onSubmit={handleSubmit}>
              <div className="eachrow">
                <label htmlFor="Name">UserName</label>
                <input
                  type="text"
                  value={user.userName}
                  placeholder="Uername"
                  required
                  name="userName"
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </div>
              <div className="eachrow">
                <label htmlFor="Name">EmailId</label>
                <input
                  type="email"
                  value={user.emailId}
                  placeholder="Emaild"
                  name="emailId"
                  required
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </div>
              <div className="eachrow">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={user.password}
                  placeholder="password"
                  name="password"
                  required
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </div>
              <div className="eachrow">
                <label htmlFor="ConfirmPassword">ConfirmPassword</label>
                <input
                  type="password"
                  value={user.confirmPassword}
                  placeholder="ConfirmPassword"
                  name="confirmPassword"
                  required
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </div>
              <div className="eachrow">
                <button>Register</button>
              </div>
            </form>
            <p>
              Have an account? <Link to="/login">Login</Link>
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

export default Register;
