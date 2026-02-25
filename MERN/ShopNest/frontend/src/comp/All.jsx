import axios from "axios";
import "../styles/All.css";
import { useEffect } from "react";
import Ct from "./Ct.jsx";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const All = () => {
  let [prod, setprod] = useState([]);
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let [msg, setmsg] = useState("");
  let [f, setf] = useState(false);
  let [del, setdel] = useState(false);

  let dele = (id) => {
    axios.delete(`http://localhost:5000/deleteprod/${id}`).then((res) => {
      setdel(!del);
    });
  };

  useEffect(() => {
    let x = Cookies.get("logininfo");
    if (x != undefined) {
      let y = JSON.parse(x);
      obj.updstate(y);
    }
    axios.get("http://localhost:5000/getproducts").then((res) => {
      setprod(res.data);
    });
  }, [del]);

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
        if (res.data.count != undefined) {
          obj.updstate({ count: res.data.count });
          let x = Cookies.get("logininfo");
          let y = JSON.parse(x);
          Cookies.set(
            "logininfo",
            JSON.stringify({ ...y, count: res.data.count }),
          );
        }
        setf(true);
        setTimeout(() => {
          setf(false);
        }, 2000);
      });
    }
  };

  let edit = (id) => {
    navigate(`/updateproduct/${id}`);
  };
  
  return (
    <div className="prodcon">
      {prod.map((item) => {
        return (
          <div className="prod" key={item._id}>
            <img src={`http://localhost:5000/pimgs/${item.img}`} alt="" />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => add(item)}>Add to Cart</button>
            {obj.state.role == "admin" && (
              <button onClick={() => edit(item._id)}>Edit</button>

              
            )}
 

            {obj.state.role=="admin"&&(<button onClick={() => dele(item._id)}>Delete</button>)}
            
            
          </div>
        );
      })}
      {f && <div className="msgpop">{msg}</div>}
    
    </div>
  );
};

export default All;
