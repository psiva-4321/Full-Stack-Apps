import "./App.css"
import axios from "axios";
import { useState } from "react";
let App = () => {
  let [place, setplace] = useState("");
  let [data, setdata] = useState("");
  let [err, seterr] = useState("");
  let getdata = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=2dda8373467547fd82990050252511&q=${place}&aqi=no`
      )
      .then((res) => {
        setdata(res.data);
        seterr("");
        setplace("");
      })
      .catch(() => {
        seterr("check place name");
        setdata("");
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="enter place"
        onChange={(e) => setplace(e.target.value)}
        value={place}
      />
      <button onClick={getdata}>get temp details</button>
      {data != "" && (
        <div className="tempcard">
          <p>Name:{data.location.name}</p>
          <p>Region:{data.location.region}</p>
          <p>Condition:{data.current.condition.text}</p>
          <p>Temp:{data.current.temp_c}</p>
          <p>Feelslike:{data.current.feelslike_c}</p>
        </div>
      )}
      {err != "" && <div>{err}</div>}
    </div>
  );
};
export default App;


