
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">Services</Link>
      <Link to="/add">Add Services</Link>
    </div>
  );
};

export default Nav;
