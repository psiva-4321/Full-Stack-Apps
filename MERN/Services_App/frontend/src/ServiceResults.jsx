import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";

import "./App.css";

const ServiceResults = () => {
  const { type } = useParams(); // get :type from URL
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/category?type=${type}`).then((res) => {
  //     setData(res.data)

  //   }).catch((err) => {
  //     console.error("Error fetching services:", err);
  //   })
  // }, [type]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/category/${type}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [type]);

  const handleBooking = async (person) => {
    try {
      const bookingData = {
        serviceManId: person._id,
        name: person.name,
        phone: person.phone,
        type: person.type,
        price: person.price,
      };

      const res = await axios.post("http://localhost:5000/book", bookingData);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Booking failed!");
    }
  };

  return (
    <div className="results-container">
      {data.length === 0 ? (
        <h2>No data found for {type}</h2>
      ) : (

        <div className="results-grid">
          {data.map((person) => (
            <div className="result-card" key={person._id}>
              <h3>{person.name}</h3>
              <p>
                <b>Experience : </b> {person.experience} years
              </p>
              <p>
                <b>Phone : </b> {person.phone}
              </p>
              <p><b>Place : {person.place}</b></p>
              <p><b>Type : {person.type}</b></p>
              <p><b>Price : {person.price}/-  per hour</b></p>

              <Rating
                name="half-rating-read"
                defaultValue={person.rating}
                precision={0.5}
                readOnly
              />
              <p>{person.rating}</p>
              {/* BOOK BUTTON */}
              <button
                className="book-btn"
                onClick={() => handleBooking(person)}
              >
                Book Service Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceResults;
