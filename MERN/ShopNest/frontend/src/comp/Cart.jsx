import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ct from "./Ct";
import "../styles/Cart.css";
import Cookies from "js-cookie";
import axios from "axios";

const Cart = () => {
  let [cart, setCart] = useState([]);
  let navigate = useNavigate();
  let obj = useContext(Ct);
  let [f, setF] = useState(false);

  useEffect(() => {
    let x = Cookies.get("logininfo");

    if (x !== undefined) {
      let y = JSON.parse(x);

      axios
        .get(`http://localhost:5000/getcartitems/${y.uid}`)
        .then((res) => {
          setCart(res.data);
          obj.updstate({ ...y, count: res.data.length });

          Cookies.set(
            "logininfo",
            JSON.stringify({ ...y, count: res.data.length })
          );
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, [f]);

  let incqty = (cid) => {
    axios
      .put(`http://localhost:5000/incqty/${cid}`, {
        headers: { Authorization: obj.state.token },
      })
      .then(() => setF(!f))
      .catch((err) => console.log(err));
  };

  let deletecartitem = (cid) => {
    axios
      .delete(`http://localhost:5000/deletecartitem/${cid}`, {
        headers: { Authorization: obj.state.token },
      })
      .then(() => setF(!f))
      .catch((err) => console.log(err));
  };

  let decqty = (cid, qty) => {
    if (qty > 1) {
      axios
        .put(`http://localhost:5000/decqty/${cid}`, {
          headers: { Authorization: obj.state.token },
        })
        .then(() => setF(!f))
        .catch((err) => console.log(err));
    } else {
      deletecartitem(cid);
    }
  };

  return (
    <div>
      {cart.length === 0 && (
        <h2 style={{ color: "orangered" }}>Your Cart is Empty</h2>
      )}

      {cart.length > 0 && (
        <div className="cartcon">
          {cart.map((item) => (
            <div className="cartitem" key={item._id}>
              <img
                src={`http://localhost:5000/pimgs/${item.img}`}
                alt={item.title}
              />

              <div className="info">
                <h3>{item.title}</h3>
                <p>Price: {item.price}</p>

                <p>
                  <button onClick={() => decqty(item._id, item.qty)}>
                    -
                  </button>
                  {item.qty}
                  <button onClick={() => incqty(item._id)}>+</button>
                </p>

                <p>Total: {item.price * item.qty}</p>
              </div>

              <button onClick={() => deletecartitem(item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="carttotal">
          <h2>
            Cart Total:{" "}
            {cart.reduce(
              (prev, item) => prev + item.price * item.qty,
              0
            )}
          </h2>
     
        </div>
      )}
    </div>
  );
};

export default Cart;