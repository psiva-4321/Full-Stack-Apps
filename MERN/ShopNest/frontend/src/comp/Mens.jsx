import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ct from "./Ct.jsx";
import Cookies from "js-cookie";
const Mens = () => {
  let [prods, setprod] = useState([]);
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let [msg, setmsg] = useState("");
  let [f, setf] = useState(false);
  useEffect(() => {
    let x = Cookies.get("logininfo");
    if (x != undefined) {
      let y = JSON.parse(x);
      obj.updstate(y);
    }
    axios.get("http://localhost:5000/getprodbycategory/mens").then((res) => {
      setprod(res.data);
    });
  }, []);
  let add = (item) => {
    if (obj.state.token == "") {
      navigate("/login");
    } else {
      let pdata = {
        uid: obj.state.uid,
        pid: item._id,
        price: item.price,
        title: item.title,
        img: item.img,
      };
      axios.post("http://localhost:5000/addcart", pdata).then((res) => {
        setmsg(res.data.msg);
        setf(true);
        setTimeout(() => {
          setf(false);
        }, 2000);
      });
    }
  };
  // return (
  //   <div className="prodcon">
  //     {f && <h2 style={{ color: "green" }}>{msg}</h2>}
  //     {prods.map((item) => {
  //       return (
  //         <div className="prod" key={item._id}>
  //           <img src={`http://localhost:5000/pimgs/${item.img}`} alt="" />
  //           <h3>{item.title}</h3>
  //           <p>Price: ${item.price}</p>
  //           <p>Cat: {item.category}</p>
  //           <button onClick={()=>add(item)}>Add to Cart</button>
  //           {obj.state.role=="admin" && <button onClick={()=>navigate(`/deleteproduct/${item._id}`)}>Delete</button>}
  //         </div>
  //       );
  //     })}
  //     {f && <h2 style={{ color: "green" }}>{msg}</h2>
  //       }
  //   </div>
  // );
  return (
    <div className="prodcon">
      {prods.map((item) => {
        return (
          <div className="prod" key={item._id}>
            <img src={`http://localhost:5000/pimgs/${item.img}`} alt="" />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => add(item)}>Add to Cart</button>
            {obj.state.role == "admin" && (
              <button onClick={() => edit(item._id)}>Edit</button>
            )}
            
          </div>
        );
      })}
      {f && <div className="msgpop">{msg}</div>}
    </div>
  );
};
export default Mens;
