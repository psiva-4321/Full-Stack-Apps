import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">Books</Link>
      <Link to="/add">AddBooks</Link>
    </div>
  );
};

export default Nav;
