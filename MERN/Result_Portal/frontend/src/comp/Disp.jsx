import React, { useContext, useEffect, useState } from "react";
import Ct from "./Ct";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"

const Disp = () => {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [f, setf] = useState(true);
  let [f1, setf1] = useState(true);
  useEffect(() => {
    if (obj.state.token == "") {
      navigate("/");
    } else {
      axios.get("http://localhost:5000/getdata").then((res) => {
        setData(res.data);
        setf(false);
      });
    }
  }, [f1]);
  let del = (uid) => {
    axios.delete(`http://localhost:5000/del/${uid}`).then(() => {
      setf1(!f1);
    });
  };
  return (
    <div className="table-container">
      {f && <h2>Plz wait data loading....</h2>}

      {!f && (
        <table border={1}>
          <tr>
            <th>Sno</th>
            <th>HNO</th>
            <th>Name</th>
            <th>Phno</th>
            <th>E-mail</th>
            <th>Marks</th>
            <th></th>
          </tr>
          {data.map((row, ind) => {
            return (
              <tr>
                <td>{ind + 1}</td>
                <td>{row.hno}</td>
                <td>{row.name}</td>
                <td>{row.phno}</td>
                <td>{row._id}</td>
                <td>{row.marks}</td>
                <td>
                  <button onClick={() => del(row._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Disp;
