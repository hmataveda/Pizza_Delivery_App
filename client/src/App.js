import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/AuthO/Login";
import Register from "./Components/AuthO/Register";
import Navbar from "./Components/Navbar/navbar";
import CustomerMainPage from "./Components/PizzaByte/customerMainPage";
import OwnerPage from "./Components/PizzaByte/ownerPage";
import CreatePizza from "./Components/PizzaByte/createPizza";
import CartPage from "./Components/PizzaByte/cartPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/pizzaByte" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/owner/pizzaByte" element={<OwnerPage />}></Route>
        <Route path="/pizzaByte" element={<CustomerMainPage />}></Route>
        <Route path="/pizzaByte/createnew" element={<CreatePizza />}></Route>
        <Route path="/pizzaByte/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
