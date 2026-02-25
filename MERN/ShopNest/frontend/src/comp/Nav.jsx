import React from "react";
import { Link } from "react-router-dom";
import Ct from "./Ct.jsx";
import "../styles/Nav.css";
import logo from "../assets/logo.png";
import { useContext } from "react";

const Nav = () => {
  let obj = useContext(Ct);

  return (
    <div className="nav">
      <Link to="/" className="logo-container">
        <img src={logo} alt="Shopsyyyy Logo" className="logo-img" />
        <span className="logo-text">$hopNeSt</span>
      </Link>
      <Link to="/">Home</Link>

      {obj.state.token == "" ? (
        <>
          <Link to="/reg">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/cart">
            Cart<button>{obj.state.count}</button>
          </Link>

          {obj.state.role == "admin" && (
            <Link to="/addproduct">Add Product</Link>
          )}
          <Link to="/logout">Logout</Link>
        </>
      )}
    </div>
  );
};

export default Nav;
