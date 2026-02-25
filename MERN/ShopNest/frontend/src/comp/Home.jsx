import { Link, Outlet } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="smenu">
        <div className="smenu-inner">
          <Link to="/">All Products</Link>
          <Link to="/mens">Mens</Link>
          <Link to="/womens">Womens</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/toys">Toys</Link>
          <Link to="/books">Books</Link>
        </div>
      </div>

      <div className="main">
        <h3>
          $hopNe$t “Glad you’re here! Explore the best deals at $hopNeSt.”
        </h3>
      
        <Outlet />
      </div>
    </div>
    
  );
};
export default Home;
